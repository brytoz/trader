import React, { useState } from "react";
import Nav from "../components/nav/Nav";
import Trade from "../components/Trade";
// import { useQuery } from "@tanstack/react-query";
import TradingViewChart from "../components/TradingViewChart";
import Markets from "../components/Markets";
// import { fetchMarketData } from "../config/api";
import BottomNav from "../components/nav/BottomNav";
// import ChartLoader from "../components/loaders/ChartLoader";


// import ChartLoader from "../components/loaders/ChartLoader";
// import TradeLoader from "../components/loaders/TradeLoader";
// import MarketsLoader from "../components/loaders/MarketsLoader";

const Index: React.FC = () => {
  const [selectedSymbol, setSelectedSymbol] = useState({
    from_currency: "EUR",
    to_currency: "USD",
  });
  // const [currentPrice, setCurrentPrice] = useState<string  | null>(null);
  // const [balance, setBalance] = useState(5000);

 

  return (
    <div>
      <div className="bg-[#242424]">

      <Nav />
      </div>

      <div className="one w-full flex h-[70vh] ">
        <div className="w-[70%] flex h-auto">
          <div className="w-[75%]  py-4">
            <TradingViewChart
              fromCurrency={selectedSymbol.from_currency}
              toCurrency={selectedSymbol.to_currency}
            />
            {/* <ChartLoader /> */}
          </div>
          <div className="w-[25%] py-4 h-auto overflow-y-scroll">
            <Markets setSelectedSymbol={setSelectedSymbol} />
            {/* <MarketsLoader /> */}
          </div>
        </div>
        <div className="w-[30%]  p-8 px-4  h-auto overflow-y-scroll">
          <Trade
            buyAmount={400}
            pair={`${selectedSymbol.from_currency}${selectedSymbol.to_currency}`}
            sellAmount={500}
          />

          {/* <TradeLoader /> */}
        </div>
      </div>

      <BottomNav />

    </div>
  );
};

export default Index;
