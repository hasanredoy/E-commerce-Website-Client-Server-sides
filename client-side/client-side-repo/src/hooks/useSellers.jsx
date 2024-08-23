import { useQuery } from '@tanstack/react-query';
import useFetch from './useFetch';

const useSellers = (page,size) => {
const axiosHook =useFetch()
const{data:sellers=[],refetch,isPending}=useQuery({
  queryKey:['sellers',axiosHook,page],
  queryFn:async()=>{
    const result = await axiosHook.get(`/sellers?page=${page}&size=${size}`)
    // console.log(result.data);
    return result.data
  }
})


  return [sellers,refetch,isPending]
};

export default useSellers;