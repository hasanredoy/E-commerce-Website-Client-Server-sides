import { Link } from "react-router-dom";
import useGetAllPayments from "../../../../hooks/useGetAllPayments";
import DynamicPageTitle from "../../../../reuseable/DynamicPageTitle";

const PaymentHistory = () => {
  const [payments,] = useGetAllPayments()
  // console.log(payments);
  if(payments?.length==0){
    return <div>
      <h2>No History Yet..</h2>
      <Link to={-1}>
      <button className=" btn bg-sky-500 text-white font-bold">Back </button>
      </Link>
    </div>
  }
  return (
    <div className=" my-10 ">
      <DynamicPageTitle dynamicTitle={"Payment History | Dashboard"}></DynamicPageTitle>
      <h1 className=" text-xl lg:text-2xl font-bold text-center">All Payments History</h1>
      <div className="text-black overflow-x-auto mx-auto my-10 rounded-md w-full bg-gray-300">
       
       <table className="table">
         {/* head */}
         <thead className=" text-white  bg-[#039396]">
           <tr>
             <th></th>
             <th className="px-10 border-r text-base lg:text-lg font-medium lg:font-bold">Transection ID</th>
             <th className="px-10 border-r text-base lg:text-lg font-medium lg:font-bold">Items</th>
             <th className="px-10 border-r text-base lg:text-lg font-medium lg:font-bold">Total Price</th>
             <th className="px-10 border-r text-base lg:text-lg font-medium lg:font-bold">Delivery Location</th>
             <th className="px-10 border-r text-base lg:text-lg font-medium lg:font-bold">Delivery Date</th>
             <th className="px-10 border-r text-base lg:text-lg font-medium lg:font-bold">Status</th>
           </tr>
         </thead>
         <tbody>
           {payments?.map((item, index) => (
             <tr key={item._id} className="  ">
               <th>{index + 1}</th>
               <td className=" text-center border-r border-gray-600">
                <h4 className=" font-bold text-green-600" >{item.transectionID}</h4>
               </td>
               <td className=" border-r border-gray-600 pl-6">
                 <ul className="flex flex-col w-[200px] gap-1 list-disc ">
                   {item?.cart?.map(singleItem =><li className=" font-bold " key={singleItem._id}>{singleItem?.product_name},</li>)}
                 </ul>
               </td>
               <td className=" text-center border-r border-gray-600">
                 <span className="  font-medium lg:font-bold">
                   {item?.totalPrice} $
                 </span>
               </td>
               <th className=" text-center border-r border-gray-600">
                <span>{item?.delivery?.location}</span>
               </th>
               <td className=" text-center border-r border-gray-600">
                 <span className=" font-bold">{item?.delivery?.date}</span>
               </td>
               <td className=" text-center p-2 border-r border-gray-600">
                 <span className="  font-bold">{item?.status}</span>
               </td>
             
             </tr>
           ))}
         </tbody>
       </table>
     </div>
    </div>
  );
};

export default PaymentHistory;