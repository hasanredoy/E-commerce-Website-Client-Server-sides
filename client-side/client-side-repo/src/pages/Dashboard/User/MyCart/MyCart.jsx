import { Link } from "react-router-dom";
import useCart from "../../../../useCart/useCart";
import { FaTrash } from "react-icons/fa";
import useFetchCommon from "../../../../hooks/useFetchCommon";
import Swal from "sweetalert2";
import DynamicPageTitle from "../../../../reuseable/DynamicPageTitle";
import PaginationDiv from "../../../../reuseable/PaginationDiv";
import Pagination from "../../../../reuseable/Pagination";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useFetch from "../../../../hooks/useFetch";
import useAuth from "../../../../hooks/useAuth";
import Heading from "../../../../reuseable/Heading";

const MyCart = () => {
  const [currentPage ,setCurrentPage]=useState(0)

  const [numberOfPages , totalPage,itemsPerPage] =Pagination("/carts",5)
  // console.log(numberOfPages);
const axiosHook = useFetch()
const {user} = useAuth()
// get cart for Pagination
const {refetch, data:paginationCart=[],isPending } = useQuery({
  queryKey: ['user-carts-for-pagination',currentPage],
  queryFn: async () => {
    const res = await axiosHook.get(`/carts-for-pagination?email=${user?.email}&page=${currentPage}&size=${itemsPerPage}`);
    return res.data;
  },
});

  const [data,reload] = useCart();
  // console.log(data);
  const totalPrice = data?.reduce((a, b) =>{
    const priceB = parseFloat(b?.cart?.price)||0
    const priceA = parseFloat(a)||0
     return priceA+ priceB
    }, 0).toFixed(2);
  const axiosCommon =useFetchCommon()
  // console.log(totalPrice);
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
      axiosCommon.delete(`/cart/${id}`)
  .then((res)=>{
    if(res.data.deletedCount>0){
      refetch()
      reload()
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
if(isPending){
  return<div className='flex justify-center items-center h-full'>
  <span className="loading loading-infinity loading-lg "></span>
</div>
}
  return (
    <div>
      <DynamicPageTitle dynamicTitle={"My Cart | Dashboard"}></DynamicPageTitle>
    
      {
        data.length>0?<>
  
      <Heading description={' Welcome Back '} title={"Check Your Cart Place Your Order"}/>
      <div className="divider"></div>
        <div className=" flex justify-between items-center px-2 lg:px-10 my-7">
         <div className="flex flex-col lg:w-[80%] gap-3 justify-between lg:flex-row">
         <h1 className=" text-base lg:text-lg font-bold">Total Items: {data?.length}</h1>
          <h1 className=" text-base lg:text-lg font-bold">Total Price: {totalPrice} $</h1>
         </div>
       <Link to={'/dashboard/payment'}>
       <button disabled={!totalPrice} className=" btn-primary">
            Pay
          </button>
       </Link>
        </div>
      <div className=" overflow-x-auto mx-auto my-10 rounded-md bg-accent bg-opacity-10">
       
        <table className="table">
          {/* head */}
          <thead className=" text-white  bg-[#046351]">
            <tr>
              <th></th>
              <th className=" text-base lg:text-lg font-medium lg:font-bold">Image</th>
              <th className=" text-base lg:text-lg font-medium lg:font-bold">Item Name</th>
              <th className=" text-base lg:text-lg font-medium lg:font-bold">Price</th>
              <th className=" text-base lg:text-lg font-medium lg:font-bold">Details</th>
              <th className=" text-base lg:text-lg font-medium lg:font-bold">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginationCart?.map((item, index) => (
              <tr className=" bg-gray-100 border-b border-gray-700 " key={item._id}>
                <th className="border-r border-b border-gray-500">{index + 1}</th>
                <td className="border-r border-b border-gray-500">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="  w-16 h-16">
                        <img src={item?.cart?.image} />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="border-r border-b border-gray-500">
                  <span className="  text-sm lg:text-base font-medium">
                    {item?.cart?.product_name}
                  </span>
                </td>
                <td className="border-r border-b border-gray-500">
                  <span className="  text-sm lg:text-base font-medium">
                    {item?.cart?.price} $
                  </span>
                </td>
                <th className="border-r border-b border-gray-500">
                  <Link to={`/item/${item?.cart?._id}`}>
                    <button className=" btn bg-[#046351] text-white border-l-4 border-b-4 border-[#2efed8]">
                      View Details
                    </button>
                  </Link>
                </th>
                <td className=" text-center border-b border-gray-500">
                  <button onClick={()=>handleDelete(item?._id,item?.cart?.product_name)} className=" text-white  bg-red-600  rounded-full p-3">
                    <FaTrash></FaTrash>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
          {
            numberOfPages.length>1&&<PaginationDiv currentPage={currentPage} setCurrentPage={setCurrentPage} numberOfPages={numberOfPages} totalPage={totalPage}></PaginationDiv>
          }
      </div>
        </>
        :
       <div className=" flex flex-col gap-5 items-center justify-center min-h-screen">
         <h2 className=" text-3xl font-bold text-center">Your Cart Is Empty, Please Add Something In your Cart </h2>
         <Link to={`/allGadgets`}>
                    <button className=" btn bg-[#046351] text-white border-l-4 border-b-4 border-[#2efed8]">
                      All Gadgets
                    </button>
                  </Link>
       </div>
        
      }
    </div>
  );
};

export default MyCart;
