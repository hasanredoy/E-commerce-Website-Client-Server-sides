import { useQuery } from '@tanstack/react-query';
import useFetch from './useFetch';

const useUsers = (page,size) => {
const axiosHook =useFetch()
const{data:users=[],refetch,isPending}=useQuery({
  queryKey:['users',axiosHook,page],
  queryFn:async()=>{
    const result = await axiosHook.get(`/userss?page=${page}&size=${size}`)
    // console.log(result.data);
    return result.data
  }
})


  return [users,refetch,isPending]
};

export default useUsers;