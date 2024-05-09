import { useContext } from "react";
import { MainContext } from "../components/auth-provider/AuthProvider";

const useAuth = () => {
  const auth = useContext(MainContext)
  return auth
};

export default useAuth;