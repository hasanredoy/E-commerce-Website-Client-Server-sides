import axios from "axios";
import { useNavigate } from "react-router-dom";


const axiosHook = axios.create({
  baseURL: 'https://server-side-lilac.vercel.app',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
  }
});


const useFetch = () => {
  const navigate = useNavigate()

// Add a response interceptor

axiosHook.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401||error.response && error.response.status === 403) {
      // Clear user data
      localStorage.removeItem('token');
      localStorage.removeItem('userData');

      // Redirect to login page
      navigate.push('/login');
    }
    return Promise.reject(error);
  }
);
  return axiosHook;
};

export default useFetch;
