// apiService.js
import axios from 'axios';
import * as Keychain from 'react-native-keychain';





const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_MAIN_HOST,
  timeout: 10000,
});

// Request interceptor to add authorization token if available
api.interceptors.request.use(
  async config => {
    if (config.needsAuth) {
      const credentials = localStorage.getItem("token")


      if (credentials) {
        const {accessToken, refreshToken} = JSON.parse(credentials);
        const token = accessToken;
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  error => Promise.reject(error),
);

// Response interceptor for handling errors or refreshing token if necessary
api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response && error.response.status === 401) {
      //  handle token expiration or refresh here
      // const credentials = await Keychain.getGenericPassword();
      // const {  refreshToken } = JSON.parse(credentials.password);
      //   const token = refreshToken;
      //   config.headers['Authorization'] = `Bearer ${token}`;
      console.log('Expired --');
    }
    return Promise.reject(error);
  },
);

export const apiService = {
  // Generic GET request
  get: (url: string, params = {}, needsAuth: boolean = false) => {
    return api.get(url, {params, needsAuth});
  },

  // Generic POST request
  post: (url:string, data = {}, needsAuth = false) => {
    return api.post(url, data, {needsAuth});
  },

  // Generic PUT request
  put: (url: string, data = {}, needsAuth = false) => {
    return api.put(url, data, {needsAuth});
  },

  // Generic DELETE request
  delete: (url:string, needsAuth:boolean = false) : Promise<object> => {
    return api.delete(url, {needsAuth});
  },

  getMyProfile: () => {
    return api.get('/user/profile', {needsAuth: true});
  },

  loginEmail: async (credentials:object) => {
    await Keychain.resetGenericPassword();
    return api.post('/auth/login/email', credentials, {needsAuth: false});
  },

  emailRegOTP: credentials => {
    return api.post('/auth/verify-email', credentials, {needsAuth: false});
  },

  signUpWithEmail: credentials => {
    return api.post('/auth/register/email', credentials, {needsAuth: false});
  },

  verifyEmailRegOTP: credentials => {
    return api.post('/auth/verify-otp', credentials, {needsAuth: false});
  },

  emailUpdateOTP: async credentials => {
    try {
      const keychainData = await Keychain.getGenericPassword();
      if (keychainData) {
        const {userId} = JSON.parse(keychainData.password);

        const response = await api.post(
          `/user/${userId}/change-email`,
          credentials,
          {needsAuth: true},
        );
        return response.data;
      } else {
        throw new Error('Session Expired. Login to continue');
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        return {message: error.response.data.message, error: true};
      } else if (error.message) {
        return {message: error.message, error: true};
      } else {
        return {message: 'Error processing data', error: true};
      }
    }
  },

  updateEmail: async credentials => {
    try {
      const keychainData = await Keychain.getGenericPassword();
      if (keychainData) {
        const {userId} = JSON.parse(keychainData.password);

        const response = await api.put(
          `/user/${userId}/email/verify`,
          credentials,
          {needsAuth: true},
        );
        return response.data;
      } else {
        throw new Error('Session Expired. Login to continue');
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        return {message: error.response.data.message, error: true};
      } else if (error.message) {
        return {message: error.message, error: true};
      } else {
        return {message: 'Error processing data', error: true};
      }
    }
  },

  // ////// CHANNELS////////////
  createNewChannel: async credentials => {
    try {
      const keychainData = await Keychain.getGenericPassword();
      if (keychainData) {
        const {userId} = JSON.parse(keychainData.password);

        const response = await api.post(
          `/channel/${userId}/create-channel`,
          credentials,
          {needsAuth: true},
        );
        return response.data;
      } else {
        throw new Error('Session Expired. Login to continue');
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        return {message: error.response.data.message, error: true};
      } else if (error.message) {
        return {message: error.message, error: true};
      } else {
        return {message: 'Error processing data', error: true};
      }
    }
  },

  getChannelsRanking: async ({page, pageSize}) => {
    try {
      const response = await api.get(
        `/channel/ranked?page=${page}&limit=${pageSize}`,
        {needsAuth: true},
      );
      return response.data;
    } catch (error) {
      return {message: {data: [], total: 0, nextPage: null}, error: true};
    }
  },

  getMyChannels: async ({page, pageSize}) => {
    try {
      const keychainData = await Keychain.getGenericPassword();
      if (keychainData) {
        const {userId} = JSON.parse(keychainData.password);

        const response = await api.get(
          `/channel/${userId}/my-channels?page=${page}&limit=${pageSize}`,
          {needsAuth: true},
        );
        return response.data;
      } else {
        throw new Error('Session Expired. Login to continue');
      }
    } catch (error) {
      return {message: {data: [], total: 0, nextPage: null}, error: true};
    }
  },

  getChannelMessage: async ({channelId, page, pageSize}) => {
    try {
      const response = await api.get(
        `/channel/${channelId}/messages?page=${page}&limit=${pageSize}`,
        {needsAuth: true},
      );
      return response.data;
    } catch (error) {
      return {message: {data: [], total: 0, nextPage: null}, error: true};
    }
  },

  getJoinedChannels: async ({page, pageSize}) => {
    try {
      const keychainData = await Keychain.getGenericPassword();
      if (keychainData) {
        const {userId} = JSON.parse(keychainData.password);

        const response = await api.get(
          `/channel/${userId}/joined?page=${page}&limit=${pageSize}`,
          {needsAuth: true},
        );
        return response.data;
      } else {
        throw new Error('Session Expired. Login to continue');
      }
    } catch (error) {
      return {message: {data: [], total: 0, nextPage: null}, error: true};
    }
  },

  searchChannel: async credentials => {
    try {
      const response = await api.get(
        `/channel/search?query=${credentials.query}`,
        {needsAuth: true},
      );
      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        return {message: error?.response?.data?.message, error: true};
      } else if (error.message) {
        return {message: error?.message, error: true};
      } else {
        return {message: 'Error processing data', error: true};
      }
    }
  },

  sendMessageChannel: async credentials => {
    try {

        const response = await api.post(
          `/channel/${credentials.channelId}/posts-message`,
          {
            textContent: credentials.textContent,
            type: credentials.type,
            fileUrl: credentials.fileUrl,
          },
          {needsAuth: true},
        );
        return response.data;
    } catch (error) {
    
        return {message: 'Error processing data', error: true};
 
    }
  },

  deleteChannelMessage: async ({msgId, channelId}) => {
    try {
      const response = await api.delete(
        `/channel/message/${msgId}/delete/${channelId}`,
        {needsAuth: true},
      );
      return response.data;
    } catch (error) {
      return {message: 'Error deleting', error: true};
    }
  },




  // ////// CHANNELS////////////


  // ////// FEEDS ////////////

  fetchMediaPosts: async ({page, pageSize}) => {
    try {

        const response = await api.get(
          `/channel/media-posts?page=${page}&limit=${pageSize}`,
          {needsAuth: true},
        );
        return response.data;
    
    } catch (error) {
      return {message: {data: [], total: 0, nextPage: null}, error: true};
    }
  },

  // ////// FEEDS ////////////
  
  // ////// MESSAGES ////////////
  fetchConversationMessages: async ({page, pageSize}) => {
    try {
      const keychainData = await Keychain.getGenericPassword();
      if (keychainData) {
        const {userId} = JSON.parse(keychainData.password);

        const response = await api.get(
          `/messages/conversations/${userId}?page=${page}&limit=${pageSize}`,
          {needsAuth: true},
        );
        return response.data;
      } else {
        throw new Error('Session Expired. Login to continue');
      }
    } catch (error) {
      return {message: {data: [], total: 0, nextPage: null}, error: true};
    }
  },
  

  fetchChatMessages: async ({page, pageSize}) => {
    try {
      const keychainData = await Keychain.getGenericPassword();
      if (keychainData) {
        const {userId} = JSON.parse(keychainData.password);

        const response = await api.get(
          `/messages/conversations/${userId}?page=${page}&limit=${pageSize}`,
          {needsAuth: true},
        );
        return response.data;
      } else {
        throw new Error('Session Expired. Login to continue');
      }
    } catch (error) {
      return {message: {data: [], total: 0, nextPage: null}, error: true};
    }
  },
  
  // ////// MESSAGES ////////////


  // Save token to Keychain after login
  saveToken: async (token1, token2, userId) => {
    try {
      const tokenData = JSON.stringify({
        userId: userId,
        accessToken: token1,
        refreshToken: token2,
      });
      await Keychain.setGenericPassword('auth', tokenData);
      console.log('Tokens saved successfully');
    } catch (error) {
      console.error('Error saving tokens:', error);
    }
  },

  createInterest: async credentials => {
    try {
      // Retrieve userId from Keychain
      const keychainData = await Keychain.getGenericPassword();
      if (keychainData) {
        const {userId} = JSON.parse(keychainData.password);

        // Use userId in the endpoint URL
        const response = await api.post(
          `/user/${userId}/interests`,
          credentials,
          {needsAuth: true},
        );
        return response.data;
      } else {
        throw new Error('Session Expired. Login to continue');
      }
    } catch (error) {
      console.error('Error in createInterest:', error);
      throw new Error('Error processing data');
    }
  },

  // Logout function to remove token from Keychain
  logout: async () => {
    await Keychain.resetGenericPassword();
  },

  fetchProtectedData: () => {
    return api.get('/protected-data', {}, {needsAuth: true});
  },
};
