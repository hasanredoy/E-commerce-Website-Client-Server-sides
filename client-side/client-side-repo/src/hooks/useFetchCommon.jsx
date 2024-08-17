import axios from "axios";

const axiosCommon = axios.create({
  baseURL:'http://localhost:5000'
})
const useFetchCommon = () => {
  return axiosCommon;
};

export default useFetchCommon;