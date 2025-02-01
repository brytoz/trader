import { useQuery } from "@tanstack/react-query";
import { fetchAvailablePairs, ForexPair } from "../config/api";
// import { useState } from "react";

interface MarketsProps {
  setSelectedSymbol: (pair: ForexPair) => void;
}

const Markets: React.FC<MarketsProps> = ({ setSelectedSymbol }) => {
  // const [forexSelection, setForexSelection] = useState<boolean>(true);
  const { data, isLoading, error } = useQuery<ForexPair[]>({
    queryKey: ["availablePairs"],
    queryFn: () => fetchAvailablePairs(),
  });

  if (isLoading) return <div>Loading market data...</div>;
  if (error) return <div>Error loading data</div>;

  const pairs = data || [];
  return (
    <div className=" w-full bg-gray-900 text-white p-4 overflow-y-scroll   ">
      <h2 className="mb-4 font-extrabold text-base">Available Markets</h2>
      <div className="flex item-center justify-around text-sm">
        <select className="w-full mb-3 shadow-sm py-1 border rounded border-gray-600 cursor-pointer px-1" name="" id="">
          <option value="">All</option>
          <option value="">Stocks</option>
          <option value="">Funds</option>
          <option value="">Forex</option>
          <option value="">Crypto</option>
          <option value="">CFD</option>
          <option value="">Futures</option>
          <option value="">Economy</option>
          <option value="">Bonds</option>
        </select>

        {/* <div
          className={`transition-all duration-500 rounded-lg shadow-sm px-3 py-1  cursor-pointer ${
            forexSelection ? "bg-black text-white" : "bg-white text-black"
          }`}
          onClick={() => setForexSelection(true)}
        >
          FIAT
        </div>
        <div
          className={`transition-all duration-500 rounded-lg shadow-sm px-3 py-1  cursor-pointer ${
            forexSelection ? "bg-white text-black" : "bg-black text-white"
          }`}
          onClick={() => setForexSelection(false)}
        >
          CRYPTO
        </div> */}
      </div>
      {pairs.map((pair, index) => (
        <div
          key={index}
          onClick={() => setSelectedSymbol(pair)}
          className="my-2 flex items-center justify-center space-x-2 rounded shadow-sm bg-gray-800 text-xs py-2 cursor-pointer transition-all duration-500 hover:scale-110"
        >
          <div className={`text-[0.6rem]`}>{pair.low}</div>
          <div className="uppercase font-bold">
            {pair.from_currency}
            {pair.to_currency}
          </div>

          <div className={`text-[0.6rem]`}>{pair.high}</div>
        </div>
      ))}
    </div>
  );
};

export default Markets;
