
const API_KEY = "58ASQZO5MFVHYIRC";

export type ForexPair = {
  low: string;
  high:string;
  from_currency: string;
  to_currency: string;
};

export const fetchAvailablePairs = async (): Promise<ForexPair[]> => {
  const pairs: ForexPair[] = [
    { low: "393.021", high:"842.302", from_currency: "USD", to_currency: "NGN" },
    { low: "393.021", high:"842.302", from_currency: "ETH", to_currency: "BTC" },
    { low: "393.021", high:"842.302", from_currency: "EUR", to_currency: "USD" },
    { low: "393.021", high:"842.302", from_currency: "GBP", to_currency: "USD" },
    { low: "393.021", high:"842.302", from_currency: "USD", to_currency: "JPY" },
    { low: "393.021", high:"842.302", from_currency: "AUD", to_currency: "USD" },
    { low: "393.021", high:"842.302", from_currency: "USD", to_currency: "CAD" },
    { low: "393.021", high:"842.302", from_currency: "NZD", to_currency: "USD" },
    { low: "393.021", high:"842.302", from_currency: "EUR", to_currency: "GBP" },
    { low: "393.021", high:"842.302", from_currency: "EUR", to_currency: "JPY" },
    { low: "393.021", high:"842.302", from_currency: "GBP", to_currency: "JPY" },
    { low: "393.021", high:"842.302", from_currency: "AUD", to_currency: "JPY" },
    { low: "393.021", high:"842.302", from_currency: "USD", to_currency: "CHF" },
    { low: "393.021", high:"842.302", from_currency: "EUR", to_currency: "CHF" },
    { low: "393.021", high:"842.302", from_currency: "GBP", to_currency: "CHF" },
    { low: "393.021", high:"842.302", from_currency: "NZD", to_currency: "JPY" },
    { low: "393.021", high:"842.302", from_currency: "AUD", to_currency: "NZD" },
    { low: "393.021", high:"842.302", from_currency: "CAD", to_currency: "JPY" },
    { low: "393.021", high:"842.302", from_currency: "EUR", to_currency: "CAD" },
    { low: "393.021", high:"842.302", from_currency: "EUR", to_currency: "AUD" },
    { low: "393.021", high:"842.302", from_currency: "GBP", to_currency: "CAD" },
    { low: "393.021", high:"842.302", from_currency: "USD", to_currency: "MXN" },
  ];

  return pairs;
};

export const fetchMarketData = async (symbol: string) => {
  try {
    const tickerResponse = await fetch(
      `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`
    );
    const tickerData = await tickerResponse.json();
    const currentPrice = tickerData.price;

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
