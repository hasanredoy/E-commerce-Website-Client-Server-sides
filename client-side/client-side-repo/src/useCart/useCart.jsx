import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useFetch from "../hooks/useFetch";

const useCart = () => {
  const axiosHook = useFetch()
  const {user} =useAuth()
  
  const {refetch:reload, data=[],isPending } = useQuery({
    queryKey: ['user-carts'],
    queryFn: async () => {
      const res = await axiosHook.get(`/carts?email=${user?.email}`);
      return res.data;
    },
  });
  return  [data,reload,isPending]
};

export default useCart;