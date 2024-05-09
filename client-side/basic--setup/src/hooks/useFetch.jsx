import axios from "axios";
import { useContext, useEffect } from "react";
// import { MainContext } from "../components/auth-provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";


const axiosHook = axios.create({
  baseURL:'http://localhost:5000',
  withCredentials:true,
})

const useFetch = () => {
// const {loading} = useContext(MainContext)
const {logOut}= useAuth()
  console.log(logOut);
  const navigate = useNavigate()
 useEffect(()=>{
  axiosHook.interceptors.response.use(res=>{
    return res
  },err=>{
    if(err.response.status===401 || err.response.status===403){
     logOut()
     .then(()=>{
      navigate('/login')
     })
     .catch()
    }
  })
 },[])

  return axiosHook
};

export default useFetch;