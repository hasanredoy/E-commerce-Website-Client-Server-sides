import { useQuery } from "@tanstack/react-query";
import useFetch from "./useFetch";
import useAuth from "./useAuth";



const useTanStackQuery = () => {
  const axiosHook = useFetch()
  const {user}=useAuth()
 const email = user?.email
  // console.log(auth);
  
  const {refetch, data } = useQuery({
    queryKey: ['carts',email],
    queryFn: async () => {
      const res = await axiosHook.get(`/carts?email=
      ${email}
      `);
      return res.data;
    },
  });
  return  [data,refetch]
};

export default useTanStackQuery;