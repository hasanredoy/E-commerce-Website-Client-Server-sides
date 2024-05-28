import { Link } from "react-router-dom";
import useCart from "../../../../useCart/useCart";
import { FaTrash } from "react-icons/fa";
import useFetchCommon from "../../../../hooks/useFetchCommon";
import Swal from "sweetalert2";

const MyCart = () => {
  const [data,refetch,isPending] = useCart();
  // console.log(data);
  const totalPrice = data?.reduce((a, b) => a + b?.cart?.price, 0);
  const axiosCommon =useFetchCommon()
  // console.log(totalPrice);
const handleDelete =(id,name)=>{
  console.log(id);
  Swal.fire({
    title: "Are you sure?",
    text: "You Want To delete This item?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#039396",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes"
  }).then((result) => {
    if (result.isConfirmed) {
      axiosCommon.delete(`/cart/${id}`)
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
if(isPending){
  return<div className='flex justify-center items-center h-full'>
  <span className="loading loading-infinity loading-lg "></span>
</div>
}
  return (
    <div>
      <div>
        <h4 className=" my-5 text-lg text-center font-bold text-[#11c6c9]">
          -- Welcome Back --
        </h4>
        <h1 className=" my-5 text-3xl lg:text-4xl text-center font-bold">
          Check Your Cart Place Your{" "}
          <span className=" text-[#11c6c9]">Order</span> !
        </h1>
      </div>
      <div className="divider"></div>
      <div className=" flex justify-between items-center px-2 lg:px-10 my-7">
         <div className="flex flex-col lg:w-[80%] gap-3 justify-between lg:flex-row">
         <h1 className=" text-base lg:text-xl font-bold">Total Items: {data?.length}</h1>
          <h1 className=" text-base lg:text-xl font-bold">Total Price: {totalPrice} $</h1>
         </div>
          <button className="bg-[#02c2d0] text-white rounded-md btn">
            Pay
          </button>
        </div>
      <div className="text-black overflow-x-auto mx-auto my-10 rounded-md bg-gray-300">
       
        <table className="table">
          {/* head */}
          <thead className=" text-white  bg-[#039396]">
            <tr>
              <th></th>
              <th className=" text-base lg:text-xl font-medium lg:font-bold">Image</th>
              <th className=" text-base lg:text-xl font-medium lg:font-bold">Item Name</th>
              <th className=" text-base lg:text-xl font-medium lg:font-bold">Price</th>
              <th className=" text-base lg:text-xl font-medium lg:font-bold">Details</th>
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
                        <img src={item?.cart?.image} />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="  text-base font-medium lg:font-bold">
                    {item?.cart?.product_name}
                  </span>
                </td>
                <td>
                  <span className="  text-base font-medium lg:font-bold">
                    {item?.cart?.price} $
                  </span>
                </td>
                <th>
                  <Link to={`/item/${item?.cart?._id}`}>
                    <button className=" btn bg-[#046351] text-white border-l-4 border-b-4 border-[#2efed8]">
                      View Details
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
    </div>
  );
};

export default MyCart;