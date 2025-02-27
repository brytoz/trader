import { create } from "zustand";

interface TradingAcctState {
  tradingAcct: string | null;
  tradingAcctLeverage: string | number | null;
  balance: string | number | null;
  equity: string | number | null;
  availableMargin: string | number | null;
  usedMargin: string | number | null;

  setTradingAcct: (tradingAcct: string | null) => void;
  setTradingAcctLeverage: (tradingAcct: string | null) => void;
  // setTradingAcctEquity: (equity: string | null) => void;
  // setTradingAcctBalance: (balance: string | null) => void;
  // setTradingAcctAvailableMargin: (availableMargin: string | null) => void;
  // setTradingAcctUsedMargin: (usedMargin: string | null) => void;
}

export const useTradingAccountStore = create<TradingAcctState>((set) => ({
  tradingAcct: null,
  tradingAcctLeverage: null,
  balance: null,
  equity: null,
  availableMargin: null,
  usedMargin: null,

  setTradingAcct: (tradingAcct) => set({ tradingAcct }),
  setTradingAcctLeverage: (tradingAcctLeverage) => set({ tradingAcctLeverage }),

  // setTradingAcctBalance: (balance) => set({ balance }),
  // setTradingAcctEquity: (equity) => set({ equity }),
  // setTradingAcctAvailableMargin: (availableMargin) => set({ availableMargin }),
  // setTradingAcctUsedMargin: (usedMargin) => set({ usedMargin }),
}));
