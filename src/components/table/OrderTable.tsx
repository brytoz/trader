import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import { usePositionsStore } from "../../store/usePositionsStore";
import { FilledOrder } from "../orders/FilledOrder";
import { OpenOrder } from "../orders/OpenOrder";
import { PendingOrder } from "../orders/PendingOrder";

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

        {open && <OpenOrder />}
        {closed && <FilledOrder />}
        {pending && <PendingOrder />}
      </table>
    </div>
  );
};

export default OrderTable;
