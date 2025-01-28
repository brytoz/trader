import { ArrowUpDown } from "lucide-react";
import React from "react";

const Trade: React.FC = () => {
  return (
    <div className="w-full rounded h-auto border border-gray-200 shadow p-6 flex flex-col gap-6 bg-white text-black">
      <div className="text-xl font-extrabold text-black">Trade</div>
      <div className="flex w-full justify-between space-x-12">
        <div className="rounded-lg border border-gray-200 shadow-xs px-4 py-2 w-full text-center cursor-pointer transition-all duration-500  text-black text-muted-foreground">
          Buy ETH
        </div>
        <div className="rounded-lg border border-gray-200 shadow-xs px-4 py-2 w-full text-center cursor-pointer transition-all duration-500  text-black">
          Sell ETH
        </div>
      </div>

      <div className="w-full">
        <select
          name=""
          id=""
          className="rounded-lg w-full shadow-xs py-2 px-4 border border-gray-200"
        >
          <option className="pr-2" value="one">
            Select
          </option>
          <option value="one">Select</option>
          <option value="one">Select</option>
          <option value="one">Select</option>
        </select>
      </div>

      <div className="flex items-center justify-between w-full">
        <div className="w-1/3">
          <input
            className="rounded-lg placeholder:text-black/30 px-3 border border-gray-200 shadow-xs py-2 w-full"
            placeholder="Amount"
            type="text"
            name=""
            id=""
          />
        </div>
        <div className="w-1/3 flex justify-center">
          <ArrowUpDown className="w-6 h-6 text-muted-foreground" />
        </div>
        <div className="w-1/3">
          <input
            className="rounded-lg placeholder:text-black/30 px-3 border border-gray-200 shadow-xs py-2 w-full"
            placeholder="$"
            type="text"
            name=""
            id=""
            disabled
          />
        </div>
      </div>
    </div>
  );
};

export default Trade;
