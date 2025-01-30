import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Trade from "../components/Trade";

import TradingViewChart from "../components/TradingViewChart";
import Sidebar from "../components/Sidebar";
import RightBar from "../upperComponent/RightBar";
// import { fetchForexData } from "../config/api";

const Index: React.FC = () => {

  const [selectedSymbol, setSelectedSymbol] = useState({
    from_currency: "EUR",
    to_currency: "USD",
  });
  // const [currentPrice, setCurrentPrice] = useState<string  | null>(null);
  // const [balance, setBalance] = useState(5000);

  return (
    <div>
      <Nav />

      <div className="w-full flex">
        <div className="w-[70%] ">
          <div className="flex">
            <div className="w-[25%] bg-pink-500 p-4">
              <Sidebar setSelectedSymbol={setSelectedSymbol} />
            </div>
            <div className="w-[75%] bg-red-500 p-4">
              <TradingViewChart
                fromCurrency={selectedSymbol.from_currency}
                toCurrency={selectedSymbol.to_currency}
              />
            </div>
          </div>
        </div>
        <div className="w-[30%] bg-green-500 p-8 h-screen ">
          <RightBar />
        </div>
      </div>
    </div>
  );
};

export default Index;
