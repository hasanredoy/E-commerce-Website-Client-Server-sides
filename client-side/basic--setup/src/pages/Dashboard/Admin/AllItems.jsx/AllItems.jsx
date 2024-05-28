import { useQuery } from "@tanstack/react-query";
import useFetch from "../../../../hooks/useFetch";

const AllItems = () => {
  const axiosHook =useFetch()
const{data:items=[],refetch,isPending}=useQuery({
  queryKey:['users',axiosHook],
  queryFn:async()=>{
    const result = await axiosHook.get('/gadgets')
    console.log(result.data);
    return result.data
  }
})
console.log(items);
  return (
    <div>
      
    </div>
  );
};

export default AllItems;