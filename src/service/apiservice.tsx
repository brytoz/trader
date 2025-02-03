
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_MAIN_HOST,
  timeout: 10000,
});

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export const apiService = {
  getMyProfile: () => {
    return api.get("/user/profile");
  },

  login: async (credentials: object) => {
    return api.post("/api/auth/login", credentials);
  },

  placeMarketOrder: async (credentials: object) => {
    return api.post("/api/orders/market", credentials);
  },
  // emailUpdateOTP: async credentials => {
  //   try {
  //     const keychainData = await Keychain.getGenericPassword();
  //     if (keychainData) {
  //       const {userId} = JSON.parse(keychainData.password);

  //       const response = await api.post(
  //         `/user/${userId}/change-email`,
  //         credentials,
  //         {needsAuth: true},
  //       );
  //       return response.data;
  //     } else {
  //       throw new Error('Session Expired. Login to continue');
  //     }
  //   } catch (error) {
  //     if (error?.response?.data?.message) {
  //       return {message: error.response.data.message, error: true};
  //     } else if (error.message) {
  //       return {message: error.message, error: true};
  //     } else {
  //       return {message: 'Error processing data', error: true};
  //     }
  //   }
  // },

  logout: async () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  },
};
