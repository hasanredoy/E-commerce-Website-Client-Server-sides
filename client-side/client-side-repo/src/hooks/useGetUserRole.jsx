import { useQuery } from "@tanstack/react-query";
import useFetch from "./useFetch";
import useAuth from "./useAuth";

const useGetUserRole = () => {
  const axiosHook = useFetch()
const {user} = useAuth()
  const {data:role=''}=useQuery({
    queryKey:['user role',user],
    queryFn:async()=>{
      const {data} = await axiosHook.get(`/user-role?email=${user?.email}`,{withCredentials:true})
      // console.log(data);
      return data
    }
  })
  // console.log(role);
  return role
};

export default useGetUserRole;