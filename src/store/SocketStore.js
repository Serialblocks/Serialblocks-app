import { combine } from "zustand/middleware";
import { io } from "socket.io-client";
import { useUserStore } from "@/store/UserStore";
import { create } from "zustand";

const initialSocketStoreState = {
  isWsConnected: false,
  socket: io("", {
    transports: ["websocket", "polling"],
    autoConnect: false,
    reconnectionAttempts: 5,
  }),
};

const mutations = (setState, getState) => {
  //
  const socket = initialSocketStoreState.socket;
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
    });

  // handles connection problems
  // also the reason why we didn't chain those events together because they don't return Socket Object instead they return Manager Object.

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

    useUserStore.getState().pushNotification({
      title: "Reconnected",
      description: `reconnected on the ${
        attempt.toString() + ordinalSuffix
      } attempt,
        we were so worried!`,
    });
    setState({
      isWsConnected: true,
    });
  }),
    // Fired upon an attempt to reconnect.
    socket.io.on("reconnect_attempt", (attempt) => {
      const reconnectionAttempts = socket.io.reconnectionAttempts();
      useUserStore.getState().pushNotification({
        title: "Reconnecting",
        description: `Connection failed, trying to reconnect.. (${attempt}/${reconnectionAttempts})`,
      });
      setState({
        isWsConnected: false,
      });
    });

  // Fired when couldn't reconnect within reconnectionAttempts.
  socket.io.on("reconnect_failed", () => {
    useUserStore.getState().pushNotification({
      title: "Failed",
      description: `Connection failed, Please try again later.`,
    });
    setState({
      isWsConnected: false,
    });
  });

  return {
    connect() {
      getState().socket.connect();
    },
    disconnect() {
      getState().socket.disconnect();
    },
    restart() {
      getState().socket.disconnect().connect();
    },
  };
};

export const useSocketStore = create(
  combine(initialSocketStoreState, mutations),
);
