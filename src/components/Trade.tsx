import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { useTradingStore } from "../store/useTradingStore";

interface TradeProps {
  pair: string;
  buyAmount: number;
  sellAmount: number;
}

const Trade: React.FC<TradeProps> = ({ sellAmount, buyAmount, pair }) => {
  const [orderType, setOrderType] = useState<string>("market");
  const [buyOrder, setBuyOrder] = useState<boolean>(true);
  const [tProfit, setTProfit] = useState<boolean>(false);
  const [sLoss, setLoss] = useState<boolean>(false);

  const {
    takeProfit,
    stopLoss,
    volume,
    openPrice,
    incrementTakeProfit,
    decrementTakeProfit,
    incrementStopLoss,
    decrementStopLoss,
    incrementVolume,
    decrementVolume,
    incrementOpenPrice,
    decrementOpenPrice,
    setTakeProfit,
    setStopLoss,
    setVolume,
    setOpenPrice,
  } = useTradingStore();

  return (
    <div className="w-full rounded h-auto border border-gray-900 shadow p-6 flex flex-col gap-6 bg-gray-900 text-white">
      <div className="text-xl font-extrabold text-white">Trade {pair}</div>

      <div className="flex justify-between items-center  shadow-sm rounded bg-gray-800 ">
        <div
          onClick={() => setOrderType("market")}
          className={` font-bold px-2 py-1 rounded   active:bg-black active:text-white  cursor-pointer transition-all duration-500 ${
            orderType === "market"
              ? "text-sm text-white"
              : "text-xs text-white/40 "
          }  `}
        >
          Market
        </div>

        <div
          onClick={() => setOrderType("limit")}
          className={` font-bold px-2 py-1 rounded  active:bg-black active:text-white  cursor-pointer transition-all duration-500 ${
            orderType !== "market"
              ? "text-sm text-white"
              : "text-xs text-white/40 "
          }  `}
        >
          Pending
        </div>
      </div>

      <div className="flex w-full justify-between space-x-12">
        <div
          onClick={() => setBuyOrder(true)}
          className={`rounded-lg border border-gray-900 shadow-xs px-4 py-2 w-full text-center cursor-pointer transition-all duration-500   ${
            buyOrder
              ? "text-green-200  bg-green-600"
              : "text-white  bg-gray-800"
          }`}
        >
          Buy
        </div>
        <div
          onClick={() => setBuyOrder(false)}
          className={`rounded-lg border border-gray-900 shadow-xs px-4 py-2 w-full text-center cursor-pointer transition-all duration-500    ${
            !buyOrder ? "text-red-200  bg-red-600" : "text-white  bg-gray-800"
          }`}
        >
          Sell
        </div>
      </div>

      <div>
        <div className="relative flex items-center gap-2 bg-gray-800 p-2 rounded-lg   mx-auto">
          <button
            className="p-2 bg-gray-700 rounded-md hover:bg-gray-600 cursor-pointer"
            onClick={decrementVolume}
          >
            <Minus className="w-5 h-5 text-white" />
          </button>
          <div className="absolute top-0 left-0 right-0 text-center text-opacity-80 text-[0.6rem]">
            Volume
          </div>
          <input
            type="text"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            className="text-center text-lg bg-transparent text-white outline-none w-full"
          />
          <button
            className="p-2 bg-gray-700 rounded-md hover:bg-gray-600 cursor-pointer"
            onClick={incrementVolume}
          >
            <Plus className="w-5 h-5 text-white" />
          </button>
        </div>
        <div className="w-full flex justify-between pt-1">
          <div className="text-[0.6rem]">Monetary Equivalent</div>
          <div className="text-[0.6rem]">1000 USD</div>
        </div>
      </div>
      {orderType === "market" && <div className="-my-2 flex flex-col  gap-2 bg-gray-800 p-2 rounded-lg   mx-auto w-full text-[0.6rem]">
        <div className="flex justify-between px-1">
          <div>Required Margin</div>
          <div>$30</div>
        </div>
        <div className="flex justify-between px-1">
          <div>Free Margin</div>
          <div>$50054</div>
        </div>
      </div>}
      {orderType === "limit" ? (
        <div>
          <div>Open Price</div>
          <div className="relative flex items-center gap-2 bg-gray-800 p-2 rounded-lg   mx-auto">
            <button
              className="p-2 bg-gray-700 rounded-md hover:bg-gray-600 cursor-pointer"
              onClick={decrementOpenPrice}
            >
              <Minus className="w-5 h-5 text-white" />
            </button>
            <input
              type="text"
              value={openPrice}
              onChange={(e) => setOpenPrice(e.target.value)}
              className="text-center text-lg bg-transparent text-white outline-none w-full"
            />
            <button
              className="p-2 bg-gray-700 rounded-md hover:bg-gray-600 cursor-pointer"
              onClick={incrementOpenPrice}
            >
              <Plus className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      ) : null}

      <div className="flex flex-col  justify-start text-xs gap-4  ">
        <div className="rounded shadow-sm py-2 px-2 rounded-lg shadow-gray-700 cursor-pointer  border border-gray-900 transition-all duration-500">
          <div className="flex justify-between items-around">
            <div>Take Profit</div>
            <div onClick={() => setTProfit(!tProfit)}>
              {tProfit ? (
                <Minus className="w-4 h-4 text-white" />
              ) : (
                <Plus className="w-4 h-4 text-white" />
              )}{" "}
            </div>
          </div>

          <div
            className={`  ${
              tProfit
                ? " mt-2 flex items-center gap-2 bg-gray-800 p-2 rounded-lg   mx-auto"
                : "hidden"
            }`}
          >
            <button
              className="p-2 bg-gray-700 rounded-md hover:bg-gray-600 cursor-pointer"
              onClick={decrementTakeProfit}
            >
              <Minus className="w-5 h-5 text-white" />
            </button>
            <input
              type="text"
              value={takeProfit}
              onChange={(e) => setTakeProfit(e.target.value)}
              className="text-center text-lg bg-transparent text-white outline-none w-full"
            />
            <button
              className="p-2 bg-gray-700 rounded-md hover:bg-gray-600 cursor-pointer"
              onClick={incrementTakeProfit}
            >
              <Plus className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        <div className="rounded shadow-sm py-2 px-2 rounded-lg shadow-gray-700 cursor-pointer  border border-gray-900 transition-all duration-500">
          <div className="flex justify-between items-around">
            <div>Stop Loss</div>
            <div onClick={() => setLoss(!sLoss)}>
              {sLoss ? (
                <Minus className="w-4 h-4 text-white" />
              ) : (
                <Plus className="w-4 h-4 text-white" />
              )}{" "}
            </div>
          </div>

          <div
            className={`  ${
              sLoss
                ? " mt-2 flex items-center gap-2 bg-gray-800 p-2 rounded-lg   mx-auto"
                : "hidden"
            }`}
          >
            <button
              className="p-2 bg-gray-700 rounded-md hover:bg-gray-600 cursor-pointer"
              onClick={decrementStopLoss}
            >
              <Minus className="w-5 h-5 text-white" />
            </button>
            <input
              type="text"
              value={stopLoss}
              onChange={(e) => setStopLoss(e.target.value)}
              className="text-center text-lg bg-transparent text-white outline-none w-full"
            />
            <button
              className="p-2 bg-gray-700 rounded-md hover:bg-gray-600 cursor-pointer"
              onClick={incrementStopLoss}
            >
              <Plus className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
      <div className="w-full mt-4">
        <button className=" w-full bg-blue-600 rounded-lg py-2 px-4  font-bold text-center bg-black text-white cursor-pointer shadow-sm ">
          {buyOrder ? "Buy" : "Sell"} {"    "}
          {orderType === "market" ? (buyOrder ? buyAmount : sellAmount) : ""}
        </button>
      </div>
    </div>
  );
};

export default Trade;
