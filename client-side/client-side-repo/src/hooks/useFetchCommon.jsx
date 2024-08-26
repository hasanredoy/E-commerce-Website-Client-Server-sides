import axios from "axios";

const axiosCommon = axios.create({
  baseURL:'https://server-side-lilac.vercel.app'
})
const useFetchCommon = () => {
  return axiosCommon;
};

export default useFetchCommon;