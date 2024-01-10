import { atom } from "recoil";

interface UserState {
  userEmail: string | null;
}

export const userState = atom<UserState>({
  key: "userState",
  default: {
    userEmail: null,
  },
});
