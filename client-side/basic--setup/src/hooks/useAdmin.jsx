import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useFetch from "./useFetch";

const useAdmin = () => {
const {user} =useAuth()
console.log(user?.email);
const axiosHook = useFetch()
const {data:Admin=[] , isPending:isAdminPending} =useQuery({
  queryKey:['users'],
  queryFn:async ()=>{
    const res = await axiosHook.get(`/users/admin/${user?.email}`)
    return res.data.admin
  }
})
console.log(Admin);
// const isAdmin = Admin?.filter(user => user.role ==="admin")
  return [Admin,isAdminPending]
};

export default useAdmin;