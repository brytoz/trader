import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Trade from "../components/Trade";
import TradingViewChart from "../components/TradingViewChart";
import { fetchForexData } from "../config/api";

const Index: React.FC = () => {
  const [forexSelection, setForexSelection] = useState(true);
  const [selectedSymbol, setSelectedSymbol] = useState({
    from_currency: "EUR",
    to_currency: "USD",
  });
  const [currentPrice, setCurrentPrice] = useState(null);
  const [balance, setBalance] = useState(5000);

  useEffect(() => {
    const fetchPrice = async () => {
      const data = await fetchForexData(
        selectedSymbol.from_currency,
        selectedSymbol.to_currency
      );
      setCurrentPrice(data["5. Exchange Rate"]);
    };

    fetchPrice();
  }, [selectedSymbol]);

  return (
    <div>
      <Nav />

      <div className="w-full flex">
        <div className="w-[70%] ">
          <div className="flex">
            <div className="w-[25%] bg-pink-500 p-4">one</div>
            <div className="w-[75%] bg-red-500 p-4">
              <TradingViewChart />
            </div>
          </div>
        </div>
        <div className="w-[30%] bg-green-500 p-8 h-screen ">
          <div className="flex items-center justify-around mb-3">
            <div className="text-xl text-black">Filter:</div>
            <div
              className={`transition-all duration-500 rounded-lg shadow-sm px-5 py-2  cursor-pointer ${
                forexSelection ? "bg-black text-white" : "bg-white text-black"
              }`}
              onClick={() => setForexSelection(true)}
            >
              Forex
            </div>
            <div
              className={`transition-all duration-500 rounded-lg shadow-sm px-5 py-2  cursor-pointer ${
                forexSelection ? "bg-white text-black" : "bg-black text-white"
              }`}
              onClick={() => setForexSelection(false)}
            >
              Crypto
            </div>
          </div>

          {forexSelection ? "" : <Trade />}
        </div>
      </div>
    </div>
  );
};

export default Index;
