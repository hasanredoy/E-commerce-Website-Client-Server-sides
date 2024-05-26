import { useQuery } from "@tanstack/react-query";
import useFetch from "./useFetch";
import useAuth from "./useAuth";



const useTanStackQuery = () => {
  const axiosHook = useFetch()
  const auth=useAuth()
  const user ={
    email:''
  }
  console.log(auth);
  
  const {refetch, data } = useQuery({
    queryKey: ['carts'],
    queryFn: async () => {
      const res = await axiosHook.get(`/carts?email=
      ${user?.email}
      `);
      return res.data;
    },
  });
  return  [data,refetch]
};

export default useTanStackQuery;