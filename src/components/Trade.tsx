import { ArrowUpDown } from "lucide-react";
import React, { useState } from "react";

const Trade: React.FC = () => {
  const [orderType, setOrderType] = useState("market");
  const [buyOrder, setBuyOrder] = useState(true);

  return (
    <div className="w-full rounded h-auto border border-gray-200 shadow p-6 flex flex-col gap-6 bg-white text-black">
      <div className="text-xl font-extrabold text-black">Trade</div>

      <div className="flex justify-between items-center  shadow-sm rounded ">
        <div
          onClick={() => setOrderType("market")}
          className={` font-bold px-2 py-1 rounded   active:bg-black active:text-white  cursor-pointer transition-all duration-500 ${
            orderType === "market"
              ? "text-sm text-black"
              : "text-xs text-black/40 "
          }  `}
        >
          Market
        </div>

        <div
          onClick={() => setOrderType("limit")}
          className={` font-bold px-2 py-1 rounded  active:bg-black active:text-white  cursor-pointer transition-all duration-500 ${
            orderType !== "market"
              ? "text-sm text-black"
              : "text-xs text-black/40 "
          }  `}
        >
          Limit
        </div>
      </div>
      <div className="w-full">
        <select
          name=""
          id=""
          className="rounded-lg w-full shadow-xs py-2 px-4 border border-gray-200"
        >
          <option className="pr-2" value="one">
            Select Pairs
          </option>
          <option value="one">ETH/DOGE</option>
          <option value="one">ETH/BTC</option>
          <option value="one">ETH/BNB</option>
        </select>
      </div>

      <div className="flex w-full justify-between space-x-12">
        <div
          onClick={() => setBuyOrder(true)}
          className={`rounded-lg border border-gray-200 shadow-xs px-4 py-2 w-full text-center cursor-pointer transition-all duration-500   ${
            buyOrder ? "text-green-200  bg-green-600" : "text-black  bg-white"
          }`}
        >
          Buy ETH
        </div>
        <div
          onClick={() => setBuyOrder(false)}
          className={`rounded-lg border border-gray-200 shadow-xs px-4 py-2 w-full text-center cursor-pointer transition-all duration-500    ${
            !buyOrder ? "text-red-200  bg-red-600" : "text-black  bg-white"
          }`}
        >
          Sell ETH
        </div>
      </div>

      <div className="flex items-center justify-between w-full">
        <div className="w-[40%]">
          <input
            className="rounded-lg placeholder:text-black/30 px-3 border border-gray-200 shadow-xs py-2 w-full "
            placeholder="$ Amount"
            type="text"
            name=""
            id=""
          />
        </div>
        <div className="w-[20%] flex justify-center">
          <ArrowUpDown className="w-6 h-6 opacity-50" />
        </div>
        <div className="w-[40%]">
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

      {orderType === "limit" ? (
        <div className="transition-all duration-500 w-full">
          <input
            className="rounded-lg placeholder:text-black/30 px-3 border border-gray-200 shadow-xs py-2 w-full text-center"
            placeholder="1.2232"
            type="text"
            name=""
            id=""
          />
        </div>
      ) : null}

      <div className="flex items-center justify-between text-xs gap-4 relative">
        <div className="border border-gray-200 w-full absolute " />
        <div className="bg-black/80 hover:bg-black text-white rounded-lg px-2 py-[2.5px] cursor-pointer z-5">
          25%
        </div>
        <div className="bg-black/80 hover:bg-black text-white rounded-lg px-2 py-[2.5px] cursor-pointer z-5">
          50%
        </div>
        <div className="bg-black/80 hover:bg-black text-white rounded-lg px-2 py-[2.5px] cursor-pointer z-5">
          75%
        </div>
        <div className="bg-black/80 hover:bg-black text-white rounded-lg px-2 py-[2.5px] cursor-pointer z-5">
          100%
        </div>
      </div>
      <div className="w-full">
        <button className=" w-full bg-black/90 rounded-lg py-2 px-4  font-bold text-center bg-black text-white cursor-pointer shadow-sm ">
          Buy {"  "}1.46678
        </button>
      </div>
    </div>
  );
};

export default Trade;
