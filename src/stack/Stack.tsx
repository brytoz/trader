import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Errors from "../pages/Errors";
import Index from "../pages/Index";
import Login from "../pages/Login";
import ProtectedRoutes from "./ProtectedRoutes";

const Stack: React.FC = () => {
  return (
    <Suspense>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="*" element={<Errors />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/index"  element={<Index />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default Stack;
