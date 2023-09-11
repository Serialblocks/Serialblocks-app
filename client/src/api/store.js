import { create } from "zustand";
import { combine } from "zustand/middleware";
import { shallow } from "zustand/shallow";

import io from "socket.io-client";
import { produce } from "immer";
// import { useToast } from "@/components/ui/use-toast";

//  The initial state shapes what values we can have in our store.

const initialState = {
  connected: false,
  ham: "jam",
  serialOutput: [
    { value: "welcome to SerialBlocks v1.0", timestamp: Date.now() },
  ],
  serialData: {
    ProcessorTemp: { value: undefined, timestamp: 0 },
    Humidity: { value: undefined, timestamp: 0 },
    Brightness: [{ value: undefined, timestamp: 0 }],
    LED: { value: undefined, timestamp: 0 },
  },
  // serialPorts: undefined,
  config: {
    path: "COM1",
    baudRate: "115200",
    delimiter: "\r",
    EOL: "\r\n",
    /** Must be one of these: 5, 6, 7, or 8 defaults to 8 */
    dataBits: 8,
    /** Prevent other processes from opening the port. Windows does not currently support `false`. Defaults to true */
    lock: true,
    /** Must be 1, 1.5 or 2 defaults to 1 */
    stopBits: 1,
    parity: "",
    /** Flow control Setting. Defaults to false */
    rtscts: false,
    /** Flow control Setting. Defaults to false */
    xon: false,
    /** Flow control Setting. Defaults to false */
    xoff: false,
    /** Flow control Setting defaults to false*/
    xany: false,
    /** drop DTR on close. Defaults to true */
    hupcl: true,
  },
};

/*
 Here we have access to functions tha let us mutate or get data from our state.
 This is where the magic happens, we can fully hide
 the WebSocket implementation here and then use our store anywhere in our app!
 */
const mutations = (setState, getState) => {
  // Read from state in actions/mutations
  console.log("ran inside mutations");
  const url =
    process.env.NODE_ENV === "production"
      ? undefined
      : "http://localhost:3003/";

  const socket = io.connect(url, {
    transports: ["websocket"],
    autoConnect: true,
  });
  // this is enough to connect all our server events
  // to our state managment system!
  socket
    .on("connect", () => {
      setState({ connected: true });
    })
    .on("disconnect", () => {
      setState({ connected: false });
    })
    .on("rawData", (data) => {
      console.log("RAWDATA " + data);
      setState((state) => ({
        serialOutput: [
          ...state.serialOutput,
          { value: data, timestamp: Date.now() },
        ],
      }));
    })
    .on("minpulatedData", (data) => {
      const prevData = getState().serialOutput;
      for (const [key, value] of Object.entries(prevData)) {
        prevData[key] = Array.isArray(value)
          ? [...value, data[key]]
          : data[key] || value;
      }
      setState({ serialData: { ...prevData } });
    });

  return {
    // the setState function is to update state in the store. Because the state is immutable, it should have been like this:
    //  {
    //   ...state,
    //   config: { ...state.config, ...prop },
    // }
    // as this is a common pattern, set actually merges state, and we can skip the ...state part
    // To disable the merging behavior, you can specify a replace boolean value for set like so: set((state) => newState, true)
    // () => set({}, true) would delete the entire store and actions included.

    /*
    GOLDMINE: doesn't re-render on the same props getting changed to the same thing
      setState((state) => {
        produce((state) => {
          for (const [key, value] of Object.entries(props)) {
            state.config[key] = value;
          }
        });
      });
    */
    /* this however re-renders without using immer
  setState((state) => {
    for (const [key, value] of Object.entries(props)) {
      state.config[key] = value;
    }
    return state.config;
  });
*/
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

        // update namespace and auth
        // socket.nsp = getState().config.path;
        socket.auth = getState().config;
        // if (socket.connected) {
        //   socket.disconnect().connect();
        // }
      },
      toggleConnected() {
        setState(
          produce((state) => {
            state.connected = !state.connected;
          }),
        );
      },
      trulyConnected() {
        setState({ connected: true });
      },
    },
    serialActions: {
      connect() {
        // socket.nsp = "/" + getState().config.path;
        // socket.auth = getState().config;
        socket.connect();
      },
      disconnect() {
        socket.disconnect();
      },
      reconnect() {
        socket.disconnect().connect();
      },
      write(command) {
        socket.emit("writeOnPort", command);
      },
    },
  };
};

export const useStore = create(combine(initialState, mutations));
