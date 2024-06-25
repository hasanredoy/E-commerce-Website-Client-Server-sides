import axios from "axios";

const axiosCommon = axios.create({
  baseURL:'https://gadget-shop-server-nine.vercel.app'
})
const useFetchCommon = () => {
  return axiosCommon;
};

export default useFetchCommon;