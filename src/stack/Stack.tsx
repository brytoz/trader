import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";


import Errors from "../pages/Errors";
import Index from "../pages/Index";

const Stack: React.FC = () => {
  return (
    <Suspense>
      <BrowserRouter>
      <Routes>
        <Route index element={<Index />} />
        <Route path="*" element={<Errors />} />
      </Routes>
      </BrowserRouter>
      </Suspense>
  );
};

export default Stack;