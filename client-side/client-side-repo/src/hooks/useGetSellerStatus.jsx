import { useQuery } from "@tanstack/react-query";
import useFetch from "./useFetch";
import useAuth from "./useAuth";

const useGetSellerStatus = () => {
  const axiosHook = useFetch()
const {user} = useAuth()
  const {data:status=''}=useQuery({
    queryKey:['seller status',user],
    queryFn:async()=>{
      const {data} = await axiosHook.get(`/seller/${user?.email}`)
      // console.log(data);
      return data
    }
  })
  // console.log(status);
  return status
};

export default useGetSellerStatus;