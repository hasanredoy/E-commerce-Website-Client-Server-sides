import { useQuery } from "@tanstack/react-query";
import useFetch from "../../../../hooks/useFetch";
import { FaEdit, FaTrash } from "react-icons/fa";
import useFetchCommon from "../../../../hooks/useFetchCommon";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../../../reuseable/LoadingSpinner";
import DynamicPageTitle from "../../../../reuseable/DynamicPageTitle";
import Pagination from "../../../../reuseable/Pagination";
import PaginationDiv from "../../../../reuseable/PaginationDiv";
import { useState } from "react";

const AllItems = () => {
  const axiosHook =useFetch()
  const [currentPage,setCurrentPage]=useState(0)

  // get pagination function 
  const [numberOfPages , totalPage,itemsPerPage,count] =Pagination("/gadgets",10)
  // get all gadgets 
const{data,refetch,isFetching}=useQuery({
  queryKey:['items',axiosHook,currentPage],
  queryFn:async()=>{
    const result = await axiosHook.get(`/gadgets?size=${itemsPerPage}&page=${currentPage}`)
    // console.log(result.data);
    return result.data
  }
})
// console.log(data);
const axiosCommon =useFetchCommon()
// console.log(totalPrice);
// delete gadgets 
const handleDelete =(id,name)=>{
// console.log(id);
Swal.fire({
  title: "Are you sure?",
  text: "You Want To delete This item?",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#046351",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes"
}).then((result) => {
  if (result.isConfirmed) {
    axiosCommon.delete(`/gadgets/${id}`)
.then((res)=>{
  if(res.data.deletedCount>0){
    refetch()
  Swal.fire({
    title: `${name} deleted Successfully`,
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

//return loading spinner if data is pending 
if(isFetching){
  return <LoadingSpinner></LoadingSpinner>
}
return (
    <div>
     <DynamicPageTitle dynamicTitle={"All Items | Dashboard"}></DynamicPageTitle>
     
        <div>
        <h4 className=" my-5 text-lg text-center font-bold text-[#11c6c9]">
          -- Welcome Back --
        </h4>
        <h1 className=" my-5 text-3xl lg:text-4xl text-center font-bold">
          Here are all listed {" "}
          <span className=" text-[#11c6c9]">Gadgets</span> ..
        </h1>
      </div>
      <div className="divider"></div>
      <div className=" flex justify-between items-center px-2 lg:px-10 my-7">
         <div className="flex flex-col lg:w-[80%] gap-3 justify-between lg:flex-row">
         <h1 className=" text-base lg:text-xl font-bold">Total Items: {count}</h1>
          
         </div>
      
        </div>
      <div className="text-black overflow-x-auto mx-auto my-10 rounded-md bg-gray-300">
       
        <table className="table">
          {/* head */}
          <thead className=" text-white  bg-[#046351]">
            <tr>
              <th></th>
              <th className=" text-base lg:text-xl font-medium lg:font-bold">Image</th>
              <th className=" text-base lg:text-xl font-medium lg:font-bold">Item Name</th>
              <th className=" text-base lg:text-xl font-medium lg:font-bold">Price</th>
              <th className=" text-base lg:text-xl font-medium lg:font-bold">Details</th>
              <th className=" text-base lg:text-xl font-medium lg:font-bold">Edit</th>
              <th className=" text-base lg:text-xl font-medium lg:font-bold">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="  w-16 h-16">
                        <img src={item?.image} />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="  text-base font-medium lg:font-bold">
                    {item?.product_name}
                  </span>
                </td>
                <td>
                  <span className="  text-base font-medium lg:font-bold">
                    {item?.price} $
                  </span>
                </td>
                <th>
                  <Link to={`/item/${item?._id}`}>
                    <button className=" btn bg-[#046351] text-white border-l-4 border-b-4 border-[#2efed8]">
                      View Details
                    </button>
                  </Link>
                </th>
                <th>
                 <Link to={`/dashboard/update/${item?._id}`}>
                    <button className=" btn">
                      <FaEdit></FaEdit>
                    </button>
                 </Link>
                </th>
                <td className=" text-center">
                  <button onClick={()=>handleDelete(item?._id,item?.cart?.product_name)} className=" text-white  bg-red-600  rounded-full p-3">
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

export default AllItems;