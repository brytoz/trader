import { create } from "zustand";

interface NavigationState {
  orderNav: boolean;
  historyNav: boolean;
  closedNav: boolean;

  setOrderNav: () => void;
  setHistoryNav: () => void;
  setCloseNav: () => void;
  
}

export const useNavigationStore = create<NavigationState>((set) => ({
  orderNav: false,
  historyNav: false,
  closedNav: true,
  
  setOrderNav: () =>
    set(() => ({
      orderNav: true,
      historyNav: false,
      closedNav: false, 
    })),
  setHistoryNav: () =>
    set(() => ({
      orderNav: false,
      historyNav: true,
      closedNav: false, 
    })),

  setCloseNav: () =>
    set(() => ({
      orderNav: false,
      historyNav: false,  
      closedNav: true, 
    })),
}));
