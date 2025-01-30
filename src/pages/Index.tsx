import React, { useState } from "react";
import Nav from "../components/Nav";
import Trade from "../components/Trade";
import { useQuery } from "@tanstack/react-query";
import TradingViewChart from "../components/TradingViewChart";
import Sidebar from "../components/Sidebar";
import { fetchMarketData } from "../config/api";

const Index: React.FC = () => {
  const [selectedSymbol, setSelectedSymbol] = useState({
    from_currency: "EUR",
    to_currency: "USD",
  });
  // const [currentPrice, setCurrentPrice] = useState<string  | null>(null);
  // const [balance, setBalance] = useState(5000);

  const { data, isLoading, error } = useQuery({
    queryKey: ["fetchMarketData"],
    queryFn: () => fetchMarketData(),
  });

  return (
    <div>
      <Nav />

      <div className="w-full flex h-[70%]">
        <div className="w-[70%] flex h-auto">
          <div className="w-[75%] bg-red-500 py-4">
            <TradingViewChart
              fromCurrency={selectedSymbol.from_currency}
              toCurrency={selectedSymbol.to_currency}
            />
          </div>
          <div className="w-[25%] bg-pi nk-500 p-4 h-auto overflow-y-scroll">
            <Sidebar setSelectedSymbol={setSelectedSymbol} />
          </div>
        </div>
        <div className="w-[30%] bg-green-500 p-8 px-4  h-auto ">
          <Trade
            buyAmount={400}
            pair={`${selectedSymbol.from_currency}/${selectedSymbol.to_currency}`}
            sellAmount={500}
          />
        </div>
      </div>
      <div className="w-full bg-yellow-900 h-96">dsds</div>
    </div>
  );
};

export default Index;
