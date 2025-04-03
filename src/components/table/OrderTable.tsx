import { usePositionsStore } from "../../store/usePositionsStore";
import { FilledOrder } from "../orders/FilledOrder";
import { OpenOrder } from "../orders/OpenOrder";
import { PendingOrder } from "../orders/PendingOrder";

 

const OrderTable:React.FC  = () => {
  const { closed, pending, open } = usePositionsStore();

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
                  "Closed Price",
                  "Leverage",
                  "P/L",
                  "Open At",
                  "Closed At",
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
