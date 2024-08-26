import axios from "axios";
import { useNavigate } from "react-router-dom";


const axiosHook = axios.create({
  baseURL: 'https://server-side-lilac.vercel.app',
});


const useFetch = () => {
  const navigate = useNavigate()

// Add a response interceptor

axiosHook.interceptors.request.use(function(config){
const token = localStorage.getItem('token')
config.headers.authorization = `Bearer ${token}`
return config;
},function(error){
  return Promise.reject(error)
})

axiosHook.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401||error.response && error.response.status === 403) {

      // Redirect to login page
      navigate.push('/login');
    }
    return Promise.reject(error);
  }
);
  return axiosHook;
};

export default useFetch;
