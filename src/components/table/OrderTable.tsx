import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import { usePositionsStore } from "../../store/usePositionsStore";

export const rows =
[
  {
    id: 1143155,
    volume: "0.01",
    entry: "23.546",
    asset: "BTCETH",
    openDate: "1 March",
    closeDate: "12 March",
    leverage: "1:500",
    profitloss: "2.9",
    orderType: "Market",
    direction: "Buy",
  },
  {
    id: 2235235,
    volume: "0.02",
    openDate: "1 March",
    closeDate: "12 March",
    leverage: "1:500",
    profitloss: "-2.9",
    orderType: "Market",
    direction: "Buy",
    entry: "23.546",
    asset: "BTCETH",
  },
  {
    id: 2342353,
    volume: "0.01",
    openDate: "1 March",
    closeDate: "12 March",
    entry: "23.546",
    asset: "BTCETH",
    leverage: "1:500",
    profitloss: "2.9",
    orderType: "Market",
    direction: "sell",
  },
  {
    id: 2357741,
    entry: "23.546",
    asset: "BTCETH",
    volume: "0.01",
    openDate: "1 March",
    closeDate: "12 March",
    leverage: "1:500",
    profitloss: "-2.9",
    orderType: "Market",
    direction: "Buy",
  },
  {
    id: 2342355,
    entry: "23.546",
    asset: "BTCETH",
    volume: "0.02",
    openDate: "1 March",
    closeDate: "12 March",
    leverage: "1:500",
    profitloss: "2.9",
    orderType: "Market",
    direction: "sell",
  },
] || [];
interface OrderTableProps {
data: object[] | []
}

const OrderTable:React.FC<OrderTableProps> = ({data}) => {
  const { closed, pending, open } = usePositionsStore();
 console.log(data)
  return (
    <div className="overflow-x-auto w-full">
      
      <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg shadow-md">
        <thead className="bg-gray-700 border-b border-gray-700 shadow-lg">
          <tr>
            {open
              ? [
                  "Order ID",
                  "Asset",
                  "Direction",
                  "Order Type",
                  "Volume",
                  "Price",
                  "Leverage",
                  "P/L",
                  "Open At",
                  "SL/TP",
                  "Action",
                ].map((header) => (
                  <th
                    key={header}
                    className="text-left px-4 py-3 text-gray-100 font-extrabold"
                  >
                    {header}
                  </th>
                ))
              : pending ?  [
                  "Order ID",
                  "Asset",
                  "Direction",
                  "Order Type",
                  "Volume",
                  "Price",
                  "Leverage",
                  "Open At",
                  "Closed At",
                  "Action",
                ].map((header) => (
                  <th
                    key={header}
                    className="text-left px-4 py-3 text-gray-100 font-extrabold"
                  >
                    {header}
                  </th>
                )) :  [
                  "Order ID",
                  "Asset",
                  "Direction",
                  "Order Type",
                  "Volume",
                  "Price",
                  "Leverage",
                  "P/L",
                  "Open At",
                  "Closed At",
                  "Action",
                ].map((header) => (
                  <th
                    key={header}
                    className="text-left px-4 py-3 text-gray-100 font-extrabold"
                  >
                    {header}
                  </th>
                ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              className="border-b border-gray-700 hover:bg-gray-600 transition-all duration-500"
            >
              <td className="px-4 py-3">{row.id}</td>
              <td className="px-4 py-3">{row.asset}</td>
              <td className="px-4 py-3  ">
                <span
                  className={`flex items-center px-2 py-1 rounded text-sm font-medium  capitalize  ${
                    row.direction === "sell" ? "text-red-500" : "text-green-500"
                  } `}
                >
                  {row.direction}{" "}
                  {row.direction === "sell" ? (
                    <ChevronDown className="w-5 h-5" />
                  ) : (
                    <ChevronUp className="w-5 h-5" />
                  )}
                </span>
              </td>
              <td className="px-4 py-3">{row.orderType}</td>
              <td className="px-4 py-3 flex items-center">
                {row.volume} <sub className="text-[0.5rem]">lots</sub>{" "}
              </td>
              <td className="px-4 py-3">{row.entry}</td>
              <td className="px-4 py-3">{row.leverage}</td>
              {!pending && <td className="px-4 py-3">
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
              </td>}
              <td className="px-4 py-3 text-xs">{row.openDate}</td>
              <td className="px-4 py-3">
                {!closed ? (
                  <span className="px-2 py-1 rounded text-sm font-medium bg-yellow-700 text-yellow-200 hover:bg-yellow-800 cursor-pointer">
                    Edit
                  </span>
                ) : (
                  <span className="text-xs">{row?.closeDate}</span>
                )}
              </td>
              <td className="px-4 py-3">
                {closed ? (
                  <span className="px-2 py-1 rounded text-sm font-medium bg-gray-700 text-gray-200 hover:bg-gray-800 cursor-pointer">
                    View
                  </span>
                ) : (
                  <span className="px-2 py-1 rounded text-sm font-medium bg-blue-700 text-blue-200 hover:bg-blue-800 cursor-pointer">
                    Close trade
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
