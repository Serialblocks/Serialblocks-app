import { shared } from "use-broadcast-ts";
import { create } from "zustand";
import { combine, persist } from "zustand/middleware";

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
};
const mutations = (setState, getState) => {
  return {
    clearUserData() {
      setState(userDataInitialState);
    },
    updateUserData(UserData) {
      setState({ ...UserData });
    },
  };
};

export const useUserStore = create(
  persist(shared(combine(userDataInitialState, mutations)), {
    name: "SerialBlocksUserData",
  }),
);
