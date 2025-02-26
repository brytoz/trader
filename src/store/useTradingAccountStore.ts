import { create } from "zustand";

interface TradingAcctState {
  tradingAcct: string | null;
  setTradingAcct: (tradingAcct: string | null) => void;
}

export const useTradingAccountStore = create<TradingAcctState>((set) => ({
  tradingAcct: null,

  setTradingAcct: (tradingAcct) => set({ tradingAcct }),
}));
