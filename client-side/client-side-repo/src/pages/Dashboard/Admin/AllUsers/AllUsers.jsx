import useFetch from "../../../../hooks/useFetch";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAdmin from "../../../../hooks/useAdmin";

import useUsers from "../../../../hooks/useUsers";
import DynamicPageTitle from "../../../../reuseable/DynamicPageTitle";
import Pagination from "../../../../reuseable/Pagination";
import { useState } from "react";
import PaginationDiv from "../../../../reuseable/PaginationDiv";
import Heading from "../../../../reuseable/Heading";

const AllUsers = () => {
  const axiosHook = useFetch()
  const [currentPage,setCurrentPage]=useState(0)

  // get pagination function 
  const [numberOfPages , totalPage,itemsPerPage,count] =Pagination("/users",10)
 
  const [users,refetch,isPending]=useUsers(currentPage,itemsPerPage)
console.log(users);
  
  const handleAdmin=(id,name)=>{
    Swal.fire({
      title: "Are you sure?",
      text: `You Want To Make ${name} Admin?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#046351",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
         axiosHook.patch(`/users/admin/${id}`)
         .then(res=>{
          console.log(res.data);
          if(res.data.modifiedCount>0){
            Swal.fire({
            title: `${name} is Now Admin`,
            icon: "success"
          });
          }
          
         })
         .catch(err=>{
          console.log(err);
         })
          
      
      }
    });
  }
  const handleDelete=(id)=>{
    Swal.fire({
      title: "Are you sure?",
      text: `You Want Remove This ${name} User?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#046351",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
         axiosHook.delete(`/users/${id}`)

         .then(res=>{
          console.log(res.data);
          if(res.data.deletedCount>0){
            refetch()
            Swal.fire({
            title: `${name} Removed Successfully`,
            icon: "success"
          });
          }
          
         })
         .catch(err=>{
          console.log(err);
         })
          
      
      }
    });

  }
  const [isAdmin,]=useAdmin()
  console.log(isAdmin);
  return (
    <div>
      <DynamicPageTitle dynamicTitle={"All Users | Dashboard"}></DynamicPageTitle>
      {
        isPending && <div className='flex justify-center items-center h-full'>
        <span className="loading loading-infinity loading-lg "></span>
      </div>
      }
   
      <Heading description={'Welcome Back'} title={'Here Are All Users on This Website'}/>
      <div className="divider"></div>
      <div className=" flex justify-between items-center px-2 lg:px-10 my-7">
         <div className="flex flex-col lg:w-[80%] gap-3 justify-between lg:flex-row">
         <h1 className=" text-base lg:text-lg font-bold">Total Users: {count}</h1>
          
         </div>
          
        </div>
      <div className=" overflow-x-auto mx-auto my-10 rounded-md bg-accent bg-opacity-10">
       
        <table className="table">
          {/* head */}
          <thead className="   bg-[#046351]">
            <tr className=" text-white">
              <th></th>
              <th className=" text-base lg:text-lg font-medium lg:font-bold">Image</th>
              <th className=" text-base lg:text-lg font-medium lg:font-bold">User Name</th>
              <th className=" text-base lg:text-lg font-medium lg:font-bold">Email</th>
              <th className=" text-base lg:text-lg font-medium lg:font-bold">Role</th>
              <th className=" text-base lg:text-lg font-medium lg:font-bold">Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr key={user._id}>
                <th className="border-r border-b border-gray-500">{index + 1}</th>
                <td className="border-r border-b border-gray-500">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="  w-16 h-16">
                        <img src={user?.photo} />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="border-r border-b border-gray-500">
                  <span className="  text-sm lg:text-base font-medium">
                    {user?.name?user?.name:'Anonymous'}
                  </span>
                </td>
                <td className="border-r border-b border-gray-500">
                <span className="  text-sm lg:text-base font-medium">
                    {user?.email?user?.email:'Anonymous'}
                  </span>
                </td>
                <th className="border-r border-b border-gray-500">
                 {
                  user?.role==='admin'?'Admin':<button onClick={()=>handleAdmin(user?._id,user?.name)} className=" btn-primary w-32 flex text-center">
                      Make Admin
                    </button>
                 }
                  
                  
                    
                 
                </th>
                <td className=" text-center border-b border-gray-500">
                  <button onClick={()=>handleDelete(user?._id,user?.cart?.product_name)} className=" text-white  bg-red-600  rounded-full p-3">
                    <FaTrash></FaTrash>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {
            numberOfPages.length>1&&<PaginationDiv currentPage={currentPage} setCurrentPage={setCurrentPage} numberOfPages={numberOfPages} totalPage={totalPage}></PaginationDiv>
          }
    </div>
  );
};

export default AllUsers;