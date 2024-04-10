import axios from 'axios';

const http = axios.create({
  baseURL: 'https://router-dev.permaswap.network/halo/proposal',
  timeout: 5000
});

// request interceptor
http.interceptors.request.use(
  config => {
    //config.headers.Authorization = 'Bearer token';
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response Interceptor
http.interceptors.response.use(
  response => {
    // Processing the response
    return response.data;
  },
  error => {
    // Handling of errors
    return Promise.reject(error);
  }
);

// Encapsulating get requests

export const getContractor = (contractorAddress) => {
    console.log("goods")
    console.log(contractorAddress)
    return http.get(`/${contractorAddress}`, { });
};