import { useQuery } from "@tanstack/react-query";
import { apiService } from "../../service/apiservice";
import TableLoader from "../loaders/TableLoader";
import { usePositionsStore } from "../../store/usePositionsStore";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import { useState } from "react";
import { UpdateStopLossProfit } from "./UpdateStopLossProfit";
import { toastService } from "../../service/toastMsg";

export const OpenOrder = () => {
  const [selectedData, setSelectedData] = useState<object | null>(null);

  const handleEditClick = (data: object | null) => {
    setSelectedData(data);
  };

  const fetchOpenOrders = async () => {
    try {
      const response = await apiService.getOpenOrders();
      return response.data;
    } catch (error) {
      throw new Error("Cannot fetch open orders ");
    }
  };

  const closeTrade = async (
    userId: string,
    accountId: string,
    orderId: string
  ) => {
    toastService.infoMsg(`${"Trying to close trade..."}`);

    try {
      const data = {
        userId,
        accountId,
        orderId,
      };
      await apiService.closeTrade(data);
      toastService.successMsg(`${"Successfully closed."}`);
    } catch (error: any) {
      if (error.code === "ECONNABORTED") {
        toastService.errorMsg(
          "Service Timed-out. Please connect to a strong network"
        );
      } else {
        toastService.errorMsg(
          `${
            error.response?.data?.error ||
            error.response?.data?.message ||
            "Cannot close trade right now open orders"
          }`
        );
      }
    }
  };
  const { data, isLoading } = useQuery({
    queryKey: ["openOrders"],
    queryFn: fetchOpenOrders,
  });

  const { closed, pending } = usePositionsStore();

  return (
    <>
      {selectedData && (
        <UpdateStopLossProfit
          close={() => setSelectedData(null)}
          data={selectedData}
        />
      )}
      <tbody>
        {data &&
          data.map((row: any) => (
            <tr
              key={row.id}
              className="border-b border-gray-700 hover:bg-gray-600 transition-all duration-500"
            >
              <td className="px-4 py-3">{row.id}</td>
              <td className="px-4 py-3">{row.symbol}</td>
              <td className="px-4 py-3  ">
                <span
                  className={`flex items-center px-2 py-1 rounded text-sm font-medium  capitalize  ${
                    row.side === "sell" ? "text-red-500" : "text-green-500"
                  } `}
                >
                  {row.side}{" "}
                  {row.side === "sell" ? (
                    <ChevronDown className="w-5 h-5" />
                  ) : (
                    <ChevronUp className="w-5 h-5" />
                  )}
                </span>
              </td>
              <td className="px-4 py-3 capitalize">{row.type}</td>
              <td className="px-4 py-3 flex items-center">
                {row.quantity} <sub className="text-[0.5rem]">lots</sub>{" "}
              </td>
              <td className="px-4 py-3">{row.price}</td>
              <td className="px-4 py-3">{row.account.leverage}</td>
              {!pending && (
                <td className="px-4 py-3">
                  <span
                    className={`flex items-center   py-1 rounded text-sm font-medium  capitalize  ${
                      Number(row.profitloss) >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    } `}
                  >
                    {Number(row.profitloss) >= 0 ? <Plus size={16} /> : ""}
                    {row.profitloss}$
                  </span>
                </td>
              )}
              <td className="px-4 py-3 text-xs">{row.createdAt}</td>
              <td className="px-4 py-3">
                {!closed ? (
                  <button
                    onClick={() => handleEditClick(row)}
                    className="px-2 py-1 rounded text-sm font-medium bg-yellow-700 text-yellow-200 hover:bg-yellow-800 cursor-pointer"
                  >
                    Edit
                  </button>
                ) : (
                  <span className="text-xs">{row?.updatedAt}</span>
                )}
              </td>
              <td className="px-4 py-3">
                <div
                  onClick={() =>
                    closeTrade(row.userId,row.accountId,row.orderId)
                  }
                  className="px-2 py-1 rounded text-sm font-medium bg-blue-700 text-blue-200 hover:bg-blue-800 cursor-pointer"
                >
                  Close trade
                </div>
              </td>
            </tr>
          ))}
      </tbody>
      {isLoading && <TableLoader />}
    </>
  );
};
