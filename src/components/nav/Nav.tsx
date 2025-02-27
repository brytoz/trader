import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TrendingUp, TrendingDown } from "lucide-react";
import { apiService } from "../../service/apiservice";
import { useQuery } from "@tanstack/react-query";
import { useTradingAccountStore } from "../../store/useTradingAccountStore";

interface NavProps {}

const Nav: React.FC<NavProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fetchProfile = async () => {
    try {
      const response = await apiService.getMyProfile();
      return response.data;
    } catch (error) {
      throw new Error("Cannot fetch open orders ");
    }
  };
  const { data, isLoading } = useQuery({
    queryKey: ["myProfile"],
    queryFn: fetchProfile,
  });

  const {
    setTradingAcct,
    setTradingAcctLeverage,
    // setTradingAcctBalance,
    // setTradingAcctEquity,
    // setTradingAcctAvailableMargin,
    // setTradingAcctUsedMargin,
  } = useTradingAccountStore();
  const setNewTradAcct = () => {
    if (data) {
      setTradingAcct(data.accounts[0].id);
      setTradingAcctLeverage(data.accounts[0].leverage);
    }
  };

  useEffect(() => {
    setNewTradAcct();
    return () => {
      setNewTradAcct();
    };
  }, [data]);

  const calculateAll = () => {
    if (!data || !data.accounts || data.accounts.length === 0) {
      // console.log("No data or accounts found.");
      return undefined;
    }

    const account = data.accounts[0];

    const balance = account.balance.toFixed(2);
    const equity = account.equity.toFixed(2);
    const availableMargin = account.availableMargin.toFixed(2);
    const usedMargin = account.usedMargin.toFixed(2);

    const marginLevel =
      account.usedMargin !== 0
        ? ((account.equity / account.usedMargin) * 100).toFixed(2)
        : "0.00";

    const profitLoss = (account.equity - account.balance).toFixed(2);
    const isProfit = parseFloat(profitLoss) >= 0;

    // setTradingAcctBalance(balance);
    // setTradingAcctEquity(equity);
    // setTradingAcctAvailableMargin(availableMargin);
    // setTradingAcctUsedMargin(usedMargin);
    return {
      balance,
      equity,
      availableMargin,
      usedMargin,
      marginLevel,
      profitLoss,
      isProfit,
    };
  };

  const results = calculateAll();

  return (
    <div className="logo transition-all duration-500     z-10">
      <div className="transition-all duration-500 w-full p-3 flex justify-start items-center px-6  backdrop-blur-md  bg-black/20 text-white  font-bold   shadow-xlg glass2">
        <div className="w-1/5">
          <Link to="/" className="flex items-center ">
            <span className="ml-2 textbase md:text-2xl font-black logo-color">
              BRYTOZ
            </span>
          </Link>
        </div>

        <div className="w-4/5 flex justify-end md:justify-around  ">
          <span className="">
            <div className=" text-xs hidden md:block transition-all duration-500 ">
              Balance
            </div>
            <div className="text-xs">${results && results.balance}</div>
          </span>

          <span className="">
            <div className=" text-xs   transition-all duration-500 flex items-center">
              <p> </p>
              <p>Equity</p>
            </div>
            <div className="text-xs flex items-center">
              {results &&
              parseFloat(results.equity) < parseFloat(results.balance) ? (
                <TrendingDown className="w-4 h-4 mr-1 text-red-500" />
              ) : (
                <TrendingUp className="w-4 h-4 mr-1 text-green-600" />
              )}
              {results && results.equity}
              {isLoading && "0"}
            </div>
          </span>
          <span className="">
            <div
              title="Available Margin"
              className=" text-xs hidden md:block transition-all duration-500 "
            >
              Margin
            </div>
            <div className="text-xs">
              ${results && results.availableMargin} {isLoading && "0"}
            </div>
          </span>

          <span className="">
            <div className=" text-xs hidden md:block transition-all duration-500 ">
              Margin Level
            </div>
            <div className="text-xs">
              {results && results.marginLevel}
              {isLoading && "0"}%
            </div>
          </span>

          <span className="">
            <div className=" text-xs hidden md:block transition-all duration-500 ">
              P/L
            </div>
            <div className="text-xs flex items-center">
              {results && results.isProfit ? (
                <TrendingUp className="w-4 h-4 mr-1 text-green-600" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-1 text-red-500" />
              )}
              ${results && results.profitLoss} {isLoading && "0"}
            </div>
          </span>

          <button
            className=" flex md:hidden text-xl  justify-end"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {!isMenuOpen ? <span> &#9776;</span> : <span> &times;</span>}
          </button>
        </div>

        {/* Mobile Navigatipn */}
        {isMenuOpen && (
          <nav className="transition-all duration-500 absolute top-0 right-0 w-1/2 h-screen bg-black bg-opacity-90 flex flex-col items-center justify-center space-y-6 z-100">
            <button
              className="block md:hidden text-5xl absolute top-2 right-2"
              onClick={() => setIsMenuOpen(false)}
            >
              &times;
            </button>
            <span className="text-lg">Balance</span>
            <span className="text-lg transition-all duration-500">Equity</span>

            <span className="text-lg transition-all duration-500">Margin</span>

            <span className="text-lg">Margin Level</span>
            <span className="text-lg">P/L</span>
          </nav>
        )}
      </div>
    </div>
  );
};

export default Nav;
