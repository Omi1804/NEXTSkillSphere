import { create } from "zustand";
import type { HeaderUser } from "@/types/header.types";

interface CurrentUserStore {
  currentUser: HeaderUser | null;
  setCurrentUser: (user: HeaderUser | null) => void;
  clearCurrentUser: () => void;
}

export const useUserStore = create<CurrentUserStore>((set) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
  clearCurrentUser: () => set({ currentUser: null }),
}));
