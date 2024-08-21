import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BE_BASE_URL, // Replace with your API base URL
  timeout: 10000, // Set a timeout limit for requests (in milliseconds)
  headers: {
    "Content-Type": "application/json", // Default headers
  },
});

export default axiosClient;
