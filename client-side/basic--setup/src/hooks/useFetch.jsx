import axios from "axios";
import { useEffect } from "react";
// import { MainContext } from "../components/auth-provider/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "./useAuth";


const axiosHook = axios.create({
  baseURL:'http://localhost:5000',
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