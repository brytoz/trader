import { create } from "zustand";

interface PositionsState {
  open: boolean;
  pending: boolean;
  closed: boolean;

  setOpen: () => void;
  setClose: () => void;
  setPending: () => void;
}

export const usePositionsStore = create<PositionsState>((set) => ({
  open: true,
  pending: false,
  closed: false,

  setOpen: () =>
    set(() => ({
      open: true,
      pending: false,
      closed: false,
    })),
  setClose: () =>
    set(() => ({
      open: false,
      pending: false,
      closed: true,
    })),
  setPending: () =>
    set(() => ({
      open: false,
      pending: true,
      closed: false,
    })),
}));
