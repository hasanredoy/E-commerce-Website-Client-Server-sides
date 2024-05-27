import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivetRout = ({children}) => {
  const {user,loading}=useAuth()
  const location =useLocation()
if(loading)return <span className="loading loading-infinity loading-lg"></span>

  if(user)return children;

  return <Navigate state={location?.pathname} to={'/login'}></Navigate>
};

export default PrivetRout;