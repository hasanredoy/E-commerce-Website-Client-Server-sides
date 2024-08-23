import useFetch from "../../../../hooks/useFetch";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAdmin from "../../../../hooks/useAdmin";

import DynamicPageTitle from "../../../../reuseable/DynamicPageTitle";
import Pagination from "../../../../reuseable/Pagination";
import { useState } from "react";
import PaginationDiv from "../../../../reuseable/PaginationDiv";
import Heading from "../../../../reuseable/Heading";
import useSellers from "../../../../hooks/useSellers";

const AllSellers = () => {
  const axiosHook = useFetch()
  const [currentPage,setCurrentPage]=useState(0)

  // get pagination function 
  const [numberOfPages , totalPage,itemsPerPage,count] =Pagination("/sellers",10)
 
  const [sellers,refetch,isPending]=useSellers(currentPage,itemsPerPage)
console.log(sellers);
  
  const handleMakeSeller=(email,name)=>{
    Swal.fire({
      title: "Are you sure?",
      text: `You Want To Make ${name} Seller?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#046351",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
         axiosHook.patch(`/make-seller/${email}`)
         .then(res=>{
          console.log(res.data);
          if(res.data.modifiedCount>0){
            Swal.fire({
            title: `${name} is Now Seller`,
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
      text: `You Want Remove This ${name} seller?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#046351",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
         axiosHook.delete(`/sellers/${id}`)

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
      <DynamicPageTitle dynamicTitle={"All sellers | Dashboard"}></DynamicPageTitle>
      {
        isPending && <div className='flex justify-center items-center h-full'>
        <span className="loading loading-infinity loading-lg "></span>
      </div>
      }
   
      <Heading description={'Welcome Back'} title={'Here Are All sellers on This Website'}/>
      <div className="divider"></div>
      <div className=" flex justify-between items-center px-2 lg:px-10 my-7">
         <div className="flex flex-col lg:w-[80%] gap-3 justify-between lg:flex-row">
         <h1 className=" text-base lg:text-lg font-bold">Total sellers: {count}</h1>
          
         </div>
          
        </div>
      <div className=" overflow-x-auto mx-auto my-10 rounded-md bg-accent bg-opacity-10">
       
        <table className="table">
          {/* head */}
          <thead className="   bg-[#046351]">
            <tr className=" text-white">
              <th></th>
              <th className=" text-base lg:text-lg font-medium lg:font-bold">Image</th>
              <th className=" text-base lg:text-lg font-medium lg:font-bold">Seller Name</th>
              <th className=" text-base lg:text-lg font-medium lg:font-bold">Email</th>
              <th className=" text-base lg:text-lg font-medium lg:font-bold">Request Date</th>
              <th className=" text-base lg:text-lg font-medium lg:font-bold">Status</th>
              <th className=" text-base lg:text-lg font-medium lg:font-bold">Action</th>
            </tr>
          </thead>
          <tbody>
            {sellers?.map((seller, index) => (
              <tr key={seller._id}>
                <th className="border-r border-b border-gray-500">{index + 1}</th>
                <td className="border-r border-b border-gray-500">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="  w-16 h-16">
                        <img src={seller?.photo} />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="border-r border-b border-gray-500">
                  <span className="  text-sm lg:text-base font-medium">
                    {seller?.name?seller?.name:'Anonymous'}
                  </span>
                </td>
                <td className="border-r border-b border-gray-500">
                <span className="  text-sm lg:text-base font-medium">
                    {seller?.email?seller?.email:'Anonymous'}
                  </span>
                </td>
                <td className="border-r border-b border-gray-500">
                <span className="  text-sm lg:text-base font-medium">
                    {seller?.requestDate?seller?.requestDate:'Not found'}
                  </span>
                </td>
                <th className="border-r border-b border-gray-500">
                 
                <span className="  text-sm lg:text-base font-medium">
                    {seller?.status?seller?.status:'Not found'}
                  </span>   
                </th>
                <td className=" text-center border-b border-gray-500 flex gap-5 py-7 items-center h-full">

                {
                  seller?.role==='admin'?'Admin':<button onClick={()=>handleMakeSeller(seller?.email,seller?.name)} className=" btn-primary w-32 flex text-center">
                      Make Seller
                    </button>
                 }
                  <button onClick={()=>handleDelete(seller?.email,seller?.name)} className=" text-white flex gap-2 items-center  bg-red-600 rounded-lg p-3">
                    <FaTrash></FaTrash> Reject
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

export default AllSellers;