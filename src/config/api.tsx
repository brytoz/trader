import axios from "axios";

const API_KEY = "58ASQZO5MFVHYIRC";

export type ForexPair = {
  from_currency: string;
  to_currency: string;
};

export const fetchAvailablePairs = async (): Promise<ForexPair[]> => {
  const pairs: ForexPair[] = [
    { from_currency: "ETH", to_currency: "BTC" },
    { from_currency: "EUR", to_currency: "USD" },
    { from_currency: "GBP", to_currency: "USD" },
    { from_currency: "USD", to_currency: "JPY" },
    { from_currency: "AUD", to_currency: "USD" },
    { from_currency: "USD", to_currency: "CAD" },
    { from_currency: "NZD", to_currency: "USD" },
    { from_currency: "EUR", to_currency: "GBP" },
    { from_currency: "EUR", to_currency: "JPY" },
    { from_currency: "GBP", to_currency: "JPY" },
    { from_currency: "AUD", to_currency: "JPY" },
    { from_currency: "USD", to_currency: "CHF" },
    { from_currency: "EUR", to_currency: "CHF" },
    { from_currency: "GBP", to_currency: "CHF" },
    { from_currency: "NZD", to_currency: "JPY" },
    { from_currency: "AUD", to_currency: "NZD" },
    { from_currency: "CAD", to_currency: "JPY" },
    { from_currency: "EUR", to_currency: "CAD" },
    { from_currency: "EUR", to_currency: "AUD" },
    { from_currency: "GBP", to_currency: "CAD" },
    { from_currency: "USD", to_currency: "MXN" },
  ];

  return pairs;
};

export const fetchMarketData = async (symbol: string) => {
  try {
    // Fetch ticker data for current price
    const tickerResponse = await fetch(
      `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`
    );
    const tickerData = await tickerResponse.json();
    const currentPrice = tickerData.price;

    // Fetch order book data for buy/sell values
    const orderBookResponse = await fetch(
      `https://api.binance.com/api/v3/ticker/bookTicker?symbol=${symbol}`
    );
    const orderBookData = await orderBookResponse.json();
    const buyValue = orderBookData.bidPrice;
    const sellValue = orderBookData.askPrice;
    const data = { currentPrice, buyValue, sellValue };
    return data;
  } catch (error) {
    console.error("Error fetching market data:", error);
    return null;
  }
};
