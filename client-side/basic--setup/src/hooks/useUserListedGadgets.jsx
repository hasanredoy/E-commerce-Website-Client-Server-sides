import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useFetch from "./useFetch";

const useUserListedGadgets = () => {
  const {user}=useAuth()
  const email = user.email
   const axiosHook = useFetch()

  const {refetch, data } = useQuery({
    queryKey: ['user-listed-gadgets',email],
    queryFn: async () => {
      const res = await axiosHook.get(`/carts?email=
      ${email}
      `);
      return res.data;
    },
  });
  return  [data,refetch]
};

export default useUserListedGadgets;