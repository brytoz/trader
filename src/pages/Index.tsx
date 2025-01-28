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
          <Trade />
        </div>
      </div>
 
    </div>
  );
};

export default Index;
