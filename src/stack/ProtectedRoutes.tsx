import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../config/useAuth";

const ProtectedRoutes = () => {
  const location = useLocation();
  const isAuthenticated = useAuth();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};

export default ProtectedRoutes;
