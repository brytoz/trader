import { useQuery } from "@tanstack/react-query";
import { apiService } from "../../service/apiservice";
import TableLoader from "../loaders/TableLoader";
import { usePositionsStore } from "../../store/usePositionsStore";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import { calculatePnL, formatDate } from "../../config/functions";

export const FilledOrder = () => {
  const fetchFilledOrders = async () => {
    try {
      const response = await apiService.getFilledOrders();
      return response.data;
    } catch (error) {
      throw new Error("Cannot fetch filled orders ");
    }
  };
  const { data, isLoading } = useQuery({
    queryKey: ["filledOrders"],
    queryFn: fetchFilledOrders,
  });

  const { closed, pending,  } = usePositionsStore();

  return (
    <>
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
              <td className="px-4 py-3">{row.closePrice}</td>
              <td className="px-4 py-3">{row.account.leverage}</td>
              {!pending && (
                <td className="px-4 py-3">
                  <span
                    className={`flex items-center   py-1 rounded text-sm font-medium  capitalize  ${
                      calculatePnL(row.price,row.closePrice, row.quantity,row.account.leverage) >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    } `}
                  >
                    {calculatePnL(row.price,row.closePrice, row.quantity,row.account.leverage) >= 0 ? <Plus size={16} /> : ""}
                    ${calculatePnL(row.price,row.closePrice, row.quantity,row.account.leverage).toFixed(2)}
                  </span>
                </td>
              )}
              <td className="px-4 py-3 text-xs">{formatDate(row.createdAt)}</td>
              <td className="px-4 py-3">
                {!closed ? (
                  <span className="px-2 py-1 rounded text-sm font-medium bg-yellow-700 text-yellow-200 hover:bg-yellow-800 cursor-pointer">
                    Edit
                  </span>
                ) : (
                  <span className="text-xs">{formatDate(row?.updatedAt)}</span>
                )}
              </td>
              {/* <td className="px-4 py-3">
                {closed ? (
                  <span className="px-2 py-1 rounded text-sm font-medium bg-gray-700 text-gray-200 hover:bg-gray-800 cursor-pointer">
                    View
                  </span>
                ) : (
                  <span className="px-2 py-1 rounded text-sm font-medium bg-blue-700 text-blue-200 hover:bg-blue-800 cursor-pointer">
                    Close trade
                  </span>
                )}
              </td> */}
            </tr>
          ))}
      </tbody>
      {isLoading && <TableLoader />}
    </>
  );
};
