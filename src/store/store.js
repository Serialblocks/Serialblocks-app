import { create } from "zustand";
import { combine } from "zustand/middleware";
import { produce } from "immer";
import { socket, initialAuth } from "@/api/socket";
const { sessionID, ...initialConfig } = initialAuth;
//  The initial state shapes what values we can have in our store.
const serialDataInitialState = {
  processorTemp: { value: null, timestamp: null, interval: null },
  humidity: { value: null, timestamp: null, interval: null },
  LED: { value: null, timestamp: null, interval: null },
  brightness: { interval: null, data: [{ x: Date.now(), y: 0 }] },
};
const initialState = {
  sessionID: sessionID,
  serialPorts: null,
  toastContent: {
    title: "",
    description: "",
  },
  // usually it's false
  isWsConnected: socket.connected,
  isPortOpen: false,
  serialOutput: [
    { value: "welcome to SerialBlocks v1.0", timestamp: Date.now() },
  ],
  serialData: serialDataInitialState,
  config: initialConfig,
  pathPreview: "",
};
// https://serialport.io/docs/api-bindings-cpp#list

/*
 Here we have access to functions tha let us mutate or get data from our state.
 This is where the magic happens, we can fully hide
 the WebSocket implementation here and then use our store anywhere in our app!
 */
const mutations = (setState, getState) => {
  // the reason why we didn't chain those events together because they don't return Socket Object instead they return Manager Object.
  // handles connection problems
  //Fired upon a successful reconnection.
  socket.io.on("reconnect", (attempt) => {
    const ordinalSuffix =
      attempt === 1
        ? "st"
        : attempt === 2
        ? "nd"
        : attempt === 3
        ? "rd"
        : attempt > 3 && "th";
    setState({
      isWsConnected: true,
      toastContent: {
        title: "Reconnected",
        description: `reconnected on the ${
          attempt.toString() + ordinalSuffix
        } attempt,
          we were so worried!`,
      },
    });
  }),
    // Fired upon an attempt to reconnect.
    socket.io.on("reconnect_attempt", (attempt) => {
      const reconnectionAttempts = socket.io.reconnectionAttempts();
      setState({
        isWsConnected: false,
        toastContent: {
          title: "Reconnecting",
          description: `Connection failed, trying to reconnect.. (${attempt}/${reconnectionAttempts})`,
        },
      });
    });

  // Fired when couldn't reconnect within reconnectionAttempts.
  socket.io.on("reconnect_failed", () => {
    setState({
      isWsConnected: false,
      toastContent: {
        title: "Failed",
        description: `Connection failed, Please try again later..`,
      },
    });
  });

  // this is enough to connect all our server events
  // to our state management system!
  socket
    .on("connect", () => {
      setState({
        isWsConnected: true,
      });
    })
    .on("disconnect", () => {
      setState({
        isWsConnected: false,
      });
    })
    .on("portError", (err, path) => {
      // errored but all of a sudden
      // aborted while reading from serialport most likely....
      setState({
        isPortOpen: false,
        isConnecting: false,
        toastContent: {
          title: "Error",
          description: `there was a problem with ${path}: ${err}`,
        },
      });
    })
    .on("suddenPortDisc", (err, path) => {
      // closed but all of a sudden..
      setState({
        isPortOpen: false,
        isConnecting: false,
        toastContent: {
          title: "Disconnected",
          description: `${path} was suddenly disconnected by YOU, ${err || ""}`,
        },
      });
    })
    .on("notifyClients", ({ path, sessionID, action, err }) => {
      let title, description;
      switch (action) {
        case "openPort":
          title = "Opened";
          description = `${path} has been opened successfully by ${sessionID}`;
          break;
        case "closePort":
          title = "Closed";
          description = `${path} has been closed successfully by ${sessionID}`;
          break;
        case "suddenPortDisc":
          title = "Disconnected";
          description = `${path} was suddenly disconnected by ${sessionID}, ${
            err || ""
          }`;
          break;
      }
      setState({
        toastContent: { title, description },
      });
    })

    .on("rawData", (data) => {
      setState((state) => ({
        serialOutput: [
          ...state.serialOutput,
          { value: data, timestamp: Date.now() },
        ],
      }));
    })
    .on("parsedData", (JSONparsed) => {
      const parsedData = JSON.parse(JSONparsed);
      setState(
        produce(({ serialData }) => {
          for (const key of Object.keys(serialData)) {
            if (
              Object.hasOwn(serialData[key], "data") &&
              Object.hasOwn(parsedData, key)
            ) {
              const [key1, key2] = Object.keys(serialData[key].data.at(0));
              if (serialData[key].data.length === 1)
                serialData[key].data[0].timestamp = Date.now();

              serialData[key].interval = parsedData[key]?.interval;
              serialData[key].data.push({
                [key1]: parsedData[key]?.timestamp,
                [key2]: parsedData[key]?.value,
              });
            } else {
              serialData[key] = parsedData[key] || serialData[key];
            }
          }
        }),
      );
    });

  return {
    stateActions: {
      updateConfig(props) {
        setState(
          produce((state) => {
            for (const [key, value] of Object.entries(props)) {
              state.config[key] = value;
            }
          }),
        );
        // alternatively you can use
        // setState({ config: { ...getState().config, ...prop } });
      },
      updatePathPreview(pathPreview) {
        setState({ pathPreview });
      },
      clearSerialDatum(...propsNames) {
        setState(
          produce((state) => {
            for (const propName of propsNames) {
              if (Object.hasOwn(getState().serialData, propName)) {
                state.serialData[propName] = serialDataInitialState[propName];
              }
            }
          }),
        );
      },
      clearSerialOutput() {
        setState({
          serialOutput: [
            { value: "Serial Output just got cleared!", timestamp: Date.now() },
          ],
        });
      },
    },
    serialActions: {
      disconnect() {
        socket.disconnect();
      },
      closePort() {
        // BROADCAST client disconnection
        socket.emit("closePort", (path) => {
          setState({
            isConnecting: false,
            isPortOpen: false,
            toastContent: {
              title: "Closed",
              description: `${path} has been closed successfully by YOU`,
            },
          });
        });
      },
      openPort() {
        setState({ isConnecting: true });
        socket.emit("openPort", (errorMsg, path) => {
          if (errorMsg === null) {
            setState({
              isConnecting: false,
              isPortOpen: true,
              toastContent: {
                title: "Opened",
                description: `${path} has been opened successfully by YOU`,
              },
            });
          } else {
            setState({
              isConnecting: false,
              isPortOpen: false,
              toastContent: {
                title: "Error",
                description: `${errorMsg}`,
              },
            });
          }
        });
      },
      listPorts() {
        socket.emit("listPorts", (serialPorts) => {
          let title, description;

          if (serialPorts.length > 0) {
            title = `Found ${serialPorts.length} port(s) available.`;
            description = "select the one you want from the dropdown!";
          } else {
            title = `No ports connected at the moment.`;
            description = "Don't fret!, give it another shot";
          }

          setState({
            serialPorts,
            toastContent: {
              title,
              description,
            },
          });
        });
      },
      writeToPort(command) {
        socket.emit("writeToPort", command);
      },
      updateAuth() {
        socket.auth = { sessionID: getState().sessionID, ...getState().config };
        // AFTER UPDATING AUTH THE USER NEEDS TO CLOSE AND REPOPEN THE SERIAL PORT
        // AND YOU SHOULDN'T RELAY ON SOCKET.ID AS IT'S GOING TO CHANGE
      },
      restart() {
        socket.disconnect().connect();
      },
    },
  };
};

export const useStore = create(combine(initialState, mutations));

// NOTES

/*
    the setState function is to update state in the store. Because the state is immutable, it should have been like this:
    {
      ...state,
      config: { ...state.config, ...prop },
    }
    as this is a common pattern, set actually merges state, and we can skip the ...state part
    To disable the merging behavior, you can specify a replace boolean value for set like so: set((state) => newState, true)
    for example, () => set({}, true) would delete the entire store and actions included.
    */

/*
    using immer's produce() would make the component the state used in not re-render if it has been updated to the same value.
      setState((state) => {
        produce((state) => {
          for (const [key, value] of Object.entries(props)) {
            state.config[key] = value;
          }
        });
      });
    */

/*
    this however re-renders without using immer
      setState((state) => {
        for (const [key, value] of Object.entries(props)) {
          state.config[key] = value;
        }
        return state.config;
      });
*/
