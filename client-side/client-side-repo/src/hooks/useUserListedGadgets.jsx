import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useFetch from "./useFetch";

const useUserListedGadgets = () => {
  const {user}=useAuth()
  const email = user.email
   const axiosHook = useFetch()
// get specif gadget for specific user 
  const {refetch, data=[],isPending } = useQuery({
    queryKey: ['userListedGadgets'],
    queryFn: async () => {
      const res = await axiosHook.get(`/my-gadgets?email=${email}`);
      // console.log(res.data);
      return res.data;
    },
  });
  if(!email)refetch()
  return  [data,refetch,isPending]
};

export default useUserListedGadgets;