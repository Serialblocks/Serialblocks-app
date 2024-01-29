import { create } from "zustand";
import { combine } from "zustand/middleware";
import { produce } from "immer";
import { useUserStore } from "@/store/UserStore";
import { useSocketStore } from "@/store/SocketStore";
const initialSerialData = {
  processorTemp: { value: null, timestamp: null, interval: null },
  humidity: { value: null, timestamp: null, interval: null },
  LED: { value: null, timestamp: null, interval: null },
  brightness: { interval: null, data: [{ x: null, y: null }] },
};
const initialState = {
  isPortOpen: false,
  isPortOpening: false,
  isPortClosing: false,
  serialPorts: null,
  serialOutput: [],
  serialData: initialSerialData,
  pathPreview: "",
};
/*
 Here we have access to functions tha let us mutate or get data from our state.
 This is where the magic happens, we can fully hide
 the WebSocket implementation here and then use our store anywhere in our app!
 */
const pushNotification = useUserStore.getState().pushNotification;
const socket = useSocketStore.getState().socket;
const DisplayName = useUserStore.getState().DisplayName;

const mutations = (setState, getState) => {
  socket
    .on("portError", (err, path) => {
      // errored but all of a sudden
      // aborted while reading from serialport most likely....
      setState({
        isPortOpen: false,
        isPortOpening: false,
        isPortClosing: false,
      });
      pushNotification({
        title: "Error",
        description: `there was a problem with ${path}: ${err}`,
      });
    })
    .on("suddenPortDisc", (err, path) => {
      // closed but all of a sudden..
      setState({
        isPortOpen: false,
        isPortOpening: false,
        isPortClosing: false,
      });
      pushNotification({
        title: "Disconnected",
        description: `${path} was suddenly disconnected by ${DisplayName} (you), ${
          err || ""
        }`,
      });
    })
    .on("notifyClients", ({ path, DisplayName, action, err }) => {
      let title, description;
      switch (action) {
        case "openPort":
          title = "Opened";
          description = `${path} has been opened successfully by ${DisplayName}`;
          break;
        case "closePort":
          title = "Closed";
          description = `${path} has been closed successfully by ${DisplayName}`;
          break;
        case "suddenPortDisc":
          title = "Disconnected";
          description = `${path} was suddenly disconnected by ${DisplayName}, ${
            err || ""
          }`;
          break;
      }
      pushNotification({ title, description });
    })
    .on("rawData", (data) =>
      setState((state) => ({
        serialOutput: [
          ...state.serialOutput,
          { value: data, timestamp: Date.now() },
        ],
      })),
    )
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
              serialData[key].interval = parsedData[key]?.interval;
              serialData[key].data.push({
                [key1]: parsedData[key]?.timestamp,
                [key2]: parsedData[key]?.value,
              });
            } else {
              serialData[key] =
                parsedData[key] !== undefined
                  ? parsedData[key]
                  : serialData[key];
            }
          }
        }),
      );
    });

  return {
    serialActions: {
      async listPorts() {
        let title, description;
        const serialPorts = await socket.emitWithAck("listPorts");
        if (serialPorts.length > 0) {
          title = `Found ${serialPorts.length} port(s) available.`;
          description = "select the one you want from the dropdown!";
        } else {
          title = `No ports connected at the moment.`;
          description = "Don't fret!, give it another shot";
        }
        setState({
          serialPorts,
        });
        pushNotification({ title, description });
      },
      async openPort() {
        setState({ isPortOpening: true });
        const { errorMsg, path } = await socket.emitWithAck("openPort");
        if (errorMsg === null) {
          setState({
            isPortOpen: true,
            isPortOpening: false,
            isPortClosing: false,
          });
          pushNotification({
            title: "Opened",
            description: `${path} has been opened successfully by ${DisplayName} (you)`,
          });
        } else {
          setState({
            isPortOpening: false,
            isPortClosing: false,
            isPortOpen: false,
          });
          pushNotification({
            title: "Error",
            description: `${errorMsg}`,
          });
        }
      },
      writeToPort(command) {
        socket.emit("writeToPort", command);
      },
      async closePort() {
        setState({ isPortClosing: true });
        // emitWithAck Promised-based version of emitting and expecting an acknowledgement from the server
        // as it's needed to await the port disconnection then close socket connection.
        const path = await socket.emitWithAck("closePort");
        setState({
          isPortOpen: false,
          isPortOpening: false,
          isPortClosing: false,
        });
        pushNotification({
          title: "Closed",
          description: `${path} has been closed successfully by ${DisplayName} (you)`,
        });
      },
      writeMockData() {
        let timerId;
        function toggleWritingMockData() {
          if (timerId) {
            clearInterval(timerId);
            timerId = null;
            return false;
          } else {
            timerId = setInterval(
              () =>
                socket.emit(
                  "writeToPort",
                  JSON.stringify({
                    processorTemp: {
                      value: ~~(Math.random() * 33),
                      interval: 1000,
                    },
                    brightness: {
                      value: ~~(Math.random() * 200),
                      interval: 1000,
                    },
                    humidity: {
                      value: ~~(Math.random() * 40),
                      interval: 1000,
                    },
                  }),
                ),
              1000,
            );
            return true;
          }
        }
        return toggleWritingMockData;
      },
    },
    stateActions: {
      updatePathPreview(pathPreview) {
        setState({ pathPreview });
      },
      clearSerialOutput() {
        setState({
          serialOutput: [
            { value: "Serial Output just got cleared!", timestamp: Date.now() },
          ],
        });
      },
      clearSerialDatum(...propsNames) {
        setState(
          produce((state) => {
            for (const propName of propsNames) {
              if (Object.hasOwn(getState().serialData, propName)) {
                state.serialData[propName] = initialSerialData[propName];
              }
            }
          }),
        );
      },
    },
  };
};

export const useSerialStore = create(combine(initialState, mutations));

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
