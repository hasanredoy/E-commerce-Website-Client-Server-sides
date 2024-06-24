import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useFetch from './useFetch';

const useGetAllPayments = () => {
  const {user} = useAuth()
  const email = user?.email
  const axiosHook = useFetch()

  // console.log(email)
  const {refetch, data } = useQuery({
    queryKey: ['payments for user '],
    queryFn: async () => {
      const res = await axiosHook.get(`/payments?email=${email}`);
      // console.log(res.data);
      return res.data;
    },
  });
  if(!email){
    refetch()
  }
  return  [data,refetch]
};

export default useGetAllPayments;