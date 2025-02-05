import React, { Fragment, useEffect, useState } from "react";
import { usePositionsStore } from "../../store/usePositionsStore";
import OrderTable from "../table/OrderTable";
import { useNavigationStore } from "../../store/useNavigationStore";
import HistoryTable from "../table/HistoryTable";
import { Briefcase, CircleX } from "lucide-react";
import socketService from "../../service/socketService";
// import TableLoader from "../loaders/TableLoader";

const BottomNav: React.FC = () => {
  const [trades, setTrades] = useState<object[]>([]);

  console.log("trades hererr", trades);
  useEffect(() => {
    const token = localStorage.getItem("token");

    socketService.emit("trade_update", {
      token,
      accountId: "2fdc594b-e9dd-49a7-bcb3-4f53f9b258fe",
      // accountId: "2fdc594b-e9dd-49a7-bcb3-4f53f9b258fe",
      userId: "5e55de9c-d528-40bc-8120-487586fbda24",
    });

    socketService.on("getOpenOrders", (data) => {
      setTrades(data);
    });

    return () => socketService.removeListener("trade_update");
  }, []);

  const { open, pending, closed, setOpen, setClose, setPending } =
    usePositionsStore();
  const {
    historyNav,
    orderNav,
    closedNav,
    setHistoryNav,
    setOrderNav,
    setCloseNav,
  } = useNavigationStore();

  return (
    <div
      className={`w-full mt-4 overflow-y-scroll bg-gray-900 ${
        closedNav ? "h-[25vh]" : "h-[30rem]"
      }`}
    >
      <div className="  w-full flex justify-around bg-gray-900 shadow-sm border border-gray-900 py-1 px-4  ">
        <div
          onClick={setOrderNav}
          className={`flex items-center px-18 rounded transition-all duration-500 cursor-pointer ${
            orderNav && "font-extrabold text-blue-200 bg-gray-800 "
          }`}
        >
          Order <Briefcase className="ml-2" />
        </div>
        <div
          onClick={setHistoryNav}
          className={`px-18 rounded transition-all duration-500 cursor-pointer ${
            historyNav && "font-extrabold text-blue-200 bg-gray-800 "
          }`}
        >
          History
        </div>
      </div>

      {orderNav && (
        <Fragment>
          <div className="flex justify-between px-12 py-3">
            <div className=" font-bold  text-xl transition-all duration-500 ">
              Positions {open && "- Open"} {pending && "- Pending"}{" "}
              {closed && "- Closed"}{" "}
            </div>
            <div
              onClick={setCloseNav}
              className=" font-bold  text-sm flex items-center bg-black tex p-1 rounded px-3 cursor-pointer"
            >
              {" "}
              close <CircleX />{" "}
            </div>
          </div>

          <div className="  w-full flex justify-around bg-gray-900 shadow-sm border border-gray-900 py-1 px-4  ">
            <div
              onClick={setOpen}
              className={`px-18 rounded transition-all duration-500 cursor-pointer ${
                open && "font-extrabold text-blue-200 bg-gray-800 "
              }`}
            >
              Open
            </div>
            <div
              onClick={setPending}
              className={`px-18 rounded transition-all duration-500 cursor-pointer ${
                pending && "font-extrabold text-blue-200 bg-gray-800 "
              }`}
            >
              Pending
            </div>
            <div
              onClick={setClose}
              className={`px-18 rounded transition-all duration-500 cursor-pointer ${
                closed && "font-extrabold text-blue-200 bg-gray-800 "
              }`}
            >
              Closed
            </div>
          </div>
        </Fragment>
      )}

      <div className="w-full px-12  ">
        {orderNav && <OrderTable data={trades} />}
        {historyNav && <HistoryTable />}
      </div>
    </div>
  );
};

export default BottomNav;
