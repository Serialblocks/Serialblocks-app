import { shared } from "use-broadcast-ts";
import { combine, persist } from "zustand/middleware";
import { produce } from "immer";
import { toast } from "@/components/ui/use-toast";
import { useSerialStore } from "@/store/Serialstore";
import { create } from "zustand";
import { useSocketStore } from "@/store/SocketStore";

const initialPortConfig = {
  path: "path/to/port",
  baudRate: 0,
  delimiter: "\r\n",
  EOL: "\n",
  dataBits: 8,
  lock: true,
  stopBits: 1,
  parity: "",
  rtscts: false,
  xon: false,
  xoff: false,
  xany: false,
  hupcl: true,
};
// https://serialport.io/docs/api-bindings-cpp#list

const userDataInitialState = {
  isLoggedIn: false,
  First_Name: "",
  Last_Name: "",
  Email: "",
  DisplayName: "",
  RemoteUrl: "",
  Theme: window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light",
  notifications: [],
  portConfig: initialPortConfig,
};

const mutations = (setState, getState) => {
  return {
    updateConfig(props) {
      setState(
        produce((state) => {
          for (const [key, value] of Object.entries(props)) {
            state.portConfig[key] = value;
          }
        }),
      );
    },
    pushNotification({ title, description }) {
      setState((state) => ({
        notifications: [
          ...state.notifications,
          {
            id: crypto.randomUUID(),
            timestamp: Date.now(),
            title,
            description,
          },
        ],
      }));
      toast({ title, description, className: "mt-[0.15rem]" });
    },
    async clearUserData() {
      setState(userDataInitialState);
      getState().updateAuth();
      getState().handleConnection({
        closeOpenedPort: true,
        action: "DISCONNECT",
      });
    },
    updateUserData(UserData) {
      const socket = useSocketStore.getState().socket;
      setState({ ...UserData });
      if (
        socket.auth?.DisplayName === getState().DisplayName &&
        socket.io.uri === getState().RemoteUrl
      )
        return;
      getState().updateAuth();
      getState().handleConnection({ closeOpenedPort: true, action: "RESTART" });
    },
    updateAuth() {
      const socket = useSocketStore.getState().socket;
      socket.io.uri = getState().RemoteUrl;
      socket.auth = {
        DisplayName: getState().DisplayName,
        ...getState().portConfig,
      };
    },
    async handleConnection({ closeOpenedPort = false, action = "RESTART" }) {
      const closePort = useSerialStore.getState().serialActions.closePort;
      const isPortOpen = useSerialStore.getState().isPortOpen;
      const { connect, disconnect, restart } = useSocketStore.getState();

      if (isPortOpen && closeOpenedPort) {
        await closePort();
      }
      switch (action) {
        case "RESTART":
          restart();
          break;
        case "CONNECT":
          connect();
          break;
        case "DISCONNECT":
          disconnect();
          break;
      }
    },
  };
};

export const useUserStore = create(
  persist(shared(combine(userDataInitialState, mutations)), {
    name: "SerialBlocksUserData",
  }),
);
