import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TrendingUp, TrendingDown } from "lucide-react";
import { apiService } from "../../service/apiservice";
import { useQuery } from "@tanstack/react-query";

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

  console.log("info", data)
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
            <div className="text-xs">$900</div>
          </span>

          <span className="">
            <div className=" text-xs   transition-all duration-500 flex items-center">
              <p> </p>
              <p>Equity</p>
            </div>
            <div className="text-xs flex items-center">
              <TrendingDown className="w-4 h-4 mr-1 text-red" /> 900{" "}
              {isLoading && 0}{" "}
            </div>
          </span>
          <span className="">
            <div className=" text-xs hidden md:block transition-all duration-500 ">
              Margin
            </div>
            <div className="text-xs">$900 {isLoading && 0}</div>
          </span>

          <span className="">
            <div className=" text-xs hidden md:block transition-all duration-500 ">
              Margin Level
            </div>
            <div className="text-xs">50% {isLoading && "0%"}</div>
          </span>

          <span className="">
            <div className=" text-xs hidden md:block transition-all duration-500 ">
              P/L
            </div>
            <div className="text-xs flex items-center">
              <TrendingUp className="w-4 h-4 mr-1 text-green-600" /> $900{" "}
              {isLoading && 0}
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
