import { useQuery } from '@tanstack/react-query';
import useFetch from './useFetch';

const useUsers = () => {
const axiosHook =useFetch()
const{data:users=[],refetch,isPending}=useQuery({
  queryKey:['users',axiosHook],
  queryFn:async()=>{
    const result = await axiosHook.get('/userss')
    // console.log(result.data);
    return result.data
  }
})


  return [users,refetch,isPending]
};

export default useUsers;