import { userState } from "../atoms";
import { selector } from "recoil";

interface UserState {
  userEmail: null | string;
}

export const userEmailState = selector({
  key: "userEmailState",
  get: ({ get }) => {
    const state = get(userState) as UserState;

    return state.userEmail;
  },
});
