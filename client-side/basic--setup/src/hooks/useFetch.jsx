import axios from "axios";
import { useEffect } from "react";
// import { MainContext } from "../components/auth-provider/AuthProvider";
import { Navigate } from "react-router-dom";
import useAuth from "./useAuth";


const axiosHook = axios.create({
  baseURL:'https://gadget-shop-server-nine.vercel.app',
  withCredentials:true,
})

const useFetch = () => {
const logOut= useAuth()
  // console.log(logOut);
 useEffect(()=>{
  axiosHook.interceptors.response.use(res=>{
    return res
  },err=>{
    if(err.response.status===401 || err.response.status===403){
     logOut()
     .then(()=>{
       <Navigate to={'/login'}></Navigate>
    })
     .catch()
    }
  })
 },[logOut])

  return axiosHook
};

export default useFetch;