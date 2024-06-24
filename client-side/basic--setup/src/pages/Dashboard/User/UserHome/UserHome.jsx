import { FaShoppingCart, FaStar } from "react-icons/fa";
import useAuth from "../../../../hooks/useAuth";
import useCart from "../../../../useCart/useCart";

import { MdOutlinePayment } from "react-icons/md";
import useFetch from "../../../../hooks/useFetch";
import { useQuery } from "@tanstack/react-query";
import { FaUser } from "react-icons/fa6";
import useGetAllPayments from "../../../../hooks/useGetAllPayments";
import DynamicPageTitle from "../../../../reuseable/DynamicPageTitle";

const UserHome = () => {
  const {user}=useAuth()
  const [cart,]=useCart()
  const axiosHook = useFetch()
  // const theme = 

  // get reviews 
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosHook.get(`/reviews?email=${user?.email}`);
      return res.data;
    },
  });


  // get payments 
  const [payments]=useGetAllPayments()
  // console.log(reviews);
  return (
    <div>
      <DynamicPageTitle dynamicTitle={"User Home | Dashboard"}></DynamicPageTitle>
      <div>
        <h4 className=" text-2xl lg:text-4xl text-center mt-5 font-bold">Hi ,Welcome {user?.displayName? <span className=" text-[#19dbd8]">{user?.displayName}</span>: 'Back'}</h4>
        
      </div>
      <div className="flex flex-col md:flex-row my-5 ">
        <div className=" flex items-center justify-center flex-col w-full lg:w-1/2 bg-[#FFEDD5] min-h-[400px]" >
          {
            user?.photoURL? <img className=" mb-5 w-44 h-44 rounded-full border border-sky-500" src={user?.photoURL} alt="" />:<span><FaUser className=" text-[100px] mb-5 p-5 rounded-full border-2 border-sky-300"></FaUser></span>
          }
           
        </div>
        <hr />
        <div className="flex items-center justify-center flex-col w-full lg:w-1/2 bg-[#cdffed] min-h-[400px] gap-5">
          <h1 className=" text-2xl text-black lg:text-4xl font-bold">Your Activities</h1>
          <h4 className=" flex gap-2 items-center text-lg font-medium text-green-400"><FaShoppingCart></FaShoppingCart> Cart : {cart?.length} </h4>
          <h4 className=" flex gap-2 items-center text-lg font-medium text-orange-700"><FaStar></FaStar> Reviews : {reviews?.length}</h4>
          <h4 className=" flex gap-2 items-center text-lg font-medium text-purple-700"><MdOutlinePayment></MdOutlinePayment> Payments : {payments?.length}</h4>

        </div>
      </div>
    </div>
  );
};

export default UserHome;