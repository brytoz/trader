import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../config/useAuth";
import MainLoader from "../components/loaders/PageLoader";

const ProtectedRoutes = () => {
  const location = useLocation();
  const isAuthenticated = useAuth();

  if (isAuthenticated === null) {
    return <MainLoader />;
  }

 
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};

export default ProtectedRoutes;
