import { Minus, Plus } from "lucide-react";

interface UpdateStopLossProfitProps {
  // data: {id: string, symbol: string,  createdAt: string, price: string, quantity: number, side: string, status: string, stopLoss: string | null , takeProfit: string | null, type : string, updatedAt: string, userId: string,  account : {id: string, balance: number, leverage: string, tradingAccountType: string}  }  | null;  
  data: any;
  close: () => void
}

export const UpdateStopLossProfit: React.FC<UpdateStopLossProfitProps> = ({
  data, close
}) => {

  return (
    <div className="w-full h-screen fixed top-0 left-0 right-0 bottom z-[100] bg-white/30">
      <div className="flex items-center justify-center h-full">
        <div className="bg-gray-900 rounded-lg p-12 text-xl md:text-3xl font-extrabold text-gray-100">
          {data?.symbol}
          <div className="flex flex-col  justify-start text-xs gap-4 mt-8 ">
            <div className="  shadow-sm py-2 px-2 rounded-lg shadow-gray-700 cursor-pointer  border border-gray-900 transition-all duration-500">
              <div className="flex justify-between items-around">
                <div>Take Profit</div>
                <div className="text-xs font-normal">
                  <div className="text-[0.46rem]">Previous value</div> 
                  <div>{data.takeProfit}</div> 
                </div>
              </div>

              <div className=" mt-2 flex items-center gap-2 bg-gray-800 p-2 rounded-lg   mx-auto">
                <button className="p-2 bg-gray-700 rounded-md hover:bg-gray-600 cursor-pointer">
                  <Minus className="w-5 h-5 text-white" />
                </button>
                <input
                  type="text"
                  // value={takeProfit}
                  // onChange={(e) => setTakeProfit(e.target.value)}
                  className="text-center text-lg bg-transparent text-white outline-none w-full"
                />
                <button className="p-2 bg-gray-700 rounded-md hover:bg-gray-600 cursor-pointer">
                  <Plus className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            <div className="  shadow-sm py-2 px-2 rounded-lg shadow-gray-700 cursor-pointer  border border-gray-900 transition-all duration-500">
              <div className="flex justify-between items-around">
                <div>Stop Loss</div>
                <div className="text-xs font-normal">
                  <div className="text-[0.46rem]">Previous value</div> 
                  <div>{data.stopLoss}</div> 
                </div>
              </div>

              <div className=" mt-2 flex items-center gap-2 bg-gray-800 p-2 rounded-lg   mx-auto">
                <button className="p-2 bg-gray-700 rounded-md hover:bg-gray-600 cursor-pointer">
                  <Minus className="w-5 h-5 text-white" />
                </button>
                <input
                  type="text"
                  // value={stopLoss}
                  // onChange={(e) => setStopLoss(e.target.value)}
                  className="text-center text-lg bg-transparent text-white outline-none w-full"
                />
                <button className="p-2 bg-gray-700 rounded-md hover:bg-gray-600 cursor-pointer">
                  <Plus className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
          <div className="w-full flex  space-x-3  mt-12">
            <button onClick={close} className=" w-1/3 bg-gray-600 hover:bg-gray-700 rounded-lg py-2 px-4  font-bold text-center text-white cursor-pointer shadow-sm  text-base focus:bg-black/50">
              Close
            </button>

            <button className=" w-2/3 bg-blue-600 rounded-lg py-2 px-4  font-bold text-center text-white cursor-pointer shadow-sm  text-base">
              Update Price
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
