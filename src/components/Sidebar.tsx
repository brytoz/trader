import { useQuery } from "@tanstack/react-query";
import { fetchAvailablePairs, ForexPair } from "../config/api";
import { useState } from "react";

interface SidebarProps {
  setSelectedSymbol: (pair: ForexPair) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setSelectedSymbol }) => {
  const [forexSelection, setForexSelection] = useState<boolean>(true);
  const { data, isLoading, error } = useQuery<ForexPair[]>({
    queryKey: ["availablePairs"],
    queryFn: () => fetchAvailablePairs(),
  });

  if (isLoading) return <div>Loading market data...</div>;
  if (error) return <div>Error loading data</div>;

  const pairs = data || [];
  return (
    <div className=" w-full bg-gray-900 text-white p-4 overflow-y-scroll h-screen">
      <h2 className="text-xl mb-4">Markets</h2>
      <div className="flex item-center justify-around text-sm">

      <div
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
      </div>
      </div>
      {pairs.map((pair, index) => (
        <div
          key={index}
          className="my-6 flex items-center justify-center space-x-2 "
        >
          <h3 className="text-xs">
            {pair.from_currency}/{pair.to_currency}
          </h3>
          <button
            onClick={() => setSelectedSymbol(pair)}
            className="text-xs cursor-pointer bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-red-400 via-red-900 to-green-600 hover:bg-blue-700 px-4 py-1 rounded"
          >
            Trade
          </button>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
