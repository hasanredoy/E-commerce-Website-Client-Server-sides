import axios from "axios";
import { useEffect } from "react";
// import { MainContext } from "../components/auth-provider/AuthProvider";
import { Navigate } from "react-router-dom";
import useAuth from "./useAuth";


const axiosHook = axios.create({
  baseURL:'http://localhost:5000',
  withCredentials:true,
})

const useFetch = () => {
const logOut= useAuth()


  return axiosHook
};

export default useFetch;