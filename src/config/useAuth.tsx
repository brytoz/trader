import { useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";

interface DecodedToken {
  exp: number;
}

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        const isTokenValid = decoded.exp * 1000 > Date.now();
       
        setIsAuthenticated(isTokenValid);
        if (!isTokenValid) {
          localStorage.removeItem("token");
        }
      } catch (error) {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, [isAuthenticated]);

  return isAuthenticated;
};

export default useAuth;
