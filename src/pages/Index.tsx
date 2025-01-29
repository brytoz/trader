import React from "react";
import Nav from "../components/Nav";
import Trade from "../components/Trade";

const Index: React.FC = () => {
  return (
    <div>
      <Nav />

      <div className="w-full flex">
        <div className="w-[65%] bg-red-500 p-4">one</div>
        <div className="w-[35%] bg-green-500 p-8 h-screen">
          <div className="flex items-center justify-around mb-3">
            <div className="text-xl text-black">Filter:</div>
            <div className="rounded-lg shadow-sm px-5 py-2 bg-black text-white cursor-pointer" onClick={() => alert("allal")}>Forex</div>
            <div className="rounded-lg shadow-sm px-5 py-2 bg-black text-white cursor-pointer" onClick={() => alert("allal")}>Cypto</div>
          </div>

          <Trade />
        </div>
      </div>
    </div>
  );
};

export default Index;
