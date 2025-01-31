import { create } from "zustand";

const validateNumber = (value: string): string => {
  if (/^\d*\.?\d{0,3}$/.test(value)) {
    return value;
  }
  return "0";
};

const validateVolume = (value: string): number => {
  if (!/^\d*\.?\d{0,2}$/.test(value)) {
    return 0.01;
  }

  const num = parseFloat(value);
  if (isNaN(num)) return 0.01;

  return parseFloat(Math.max(0.01, Math.min(num, 50.0)).toFixed(2));
};

interface TradingState {
  takeProfit: string;
  stopLoss: string;
  volume: number;
  openPrice: string;

  setTakeProfit: (value: string) => void;
  setStopLoss: (value: string) => void;
  setVolume: (value: string) => void;
  setOpenPrice: (value: string) => void;

  incrementTakeProfit: () => void;
  decrementTakeProfit: () => void;
  incrementStopLoss: () => void;
  decrementStopLoss: () => void;
  incrementVolume: () => void;
  decrementVolume: () => void;
  incrementOpenPrice: () => void;
  decrementOpenPrice: () => void;
}

export const useTradingStore = create<TradingState>((set) => ({
  takeProfit: "0.0",
  stopLoss: "0.0",
  volume: 0.01,
  openPrice: "1000",

  setTakeProfit: (value) => set({ takeProfit: validateNumber(value) }),
  setStopLoss: (value) => set({ stopLoss: validateNumber(value) }),
  setVolume: (value) => set({ volume: validateVolume(value) }),
  setOpenPrice: (value) => set({ openPrice: validateNumber(value) }),

  incrementTakeProfit: () =>
    set((state) => {
      const num = parseFloat(state.takeProfit || "0");
      return { takeProfit: (num + 0.001).toFixed(3) };
    }),
  decrementTakeProfit: () =>
    set((state) => {
      const num = parseFloat(state.takeProfit || "0");
      return { takeProfit: Math.max(0, num - 0.001).toFixed(3) };
    }),

  incrementStopLoss: () =>
    set((state) => {
      const num = parseFloat(state.stopLoss || "0");
      return { stopLoss: (num + 0.001).toFixed(3) };
    }),
  decrementStopLoss: () =>
    set((state) => {
      const num = parseFloat(state.stopLoss || "0");
      return { stopLoss: Math.max(0, num - 0.001).toFixed(3) };
    }),

  incrementVolume: () =>
    set((state) => ({
      volume: parseFloat(Math.min(50.0, state.volume + 0.01).toFixed(2)),
    })),
  decrementVolume: () =>
    set((state) => ({
      volume: parseFloat(Math.max(0.01, state.volume - 0.01).toFixed(2)),
    })),

  incrementOpenPrice: () =>
    set((state) => {
      const num = parseFloat(state.openPrice || "0");
      return { openPrice: (num + 1).toString() };
    }),
  decrementOpenPrice: () =>
    set((state) => {
      const num = parseFloat(state.openPrice || "0");
      return { openPrice: Math.max(1, num - 1).toString() };
    }),
}));
