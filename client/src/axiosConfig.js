import axios from "axios";

const axiosBase = axios.create({
  baseURL: "https://evangadiforum-5s7u.onrender.com/api",
  // baseURL: "http://localhost:5500/api",
});
export default axiosBase;
