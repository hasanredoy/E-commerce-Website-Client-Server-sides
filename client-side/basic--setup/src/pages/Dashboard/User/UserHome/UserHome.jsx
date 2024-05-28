import { FaShoppingCart, FaStar } from "react-icons/fa";
import useAuth from "../../../../hooks/useAuth";
import { MdElectricRickshaw } from "react-icons/md";
import useCart from "../../../../useCart/useCart";

import { MdOutlinePayment } from "react-icons/md";
import useFetch from "../../../../hooks/useFetch";
import { useQuery } from "@tanstack/react-query";

const UserHome = () => {
  const {user}=useAuth()
  const [cart,]=useCart()
  const axiosHook = useFetch()
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosHook.get(`/reviews?email=${user?.email}`);
      return res.data;
    },
  });
  // console.log(reviews);
  return (
    <div>
      <div>
        <h4 className=" text-2xl lg:text-4xl text-center mt-5 font-bold">Welcome Back <span className=" text-[#19dbd8]">{user?.displayName}</span></h4>
        
      </div>
      <div className="flex flex-col md:flex-row my-5 ">
        <div className=" flex items-center justify-center flex-col w-full lg:w-1/2 bg-[#FFEDD5] min-h-[400px]" >
            <img className=" mb-5 w-52 rounded-full border-sky-500" src={user?.photoURL} alt="" />
            <h5 className=" text-xl font-bold">{user?.displayName}</h5>
        </div>
        <hr />
        <div className="flex items-center justify-center flex-col w-full lg:w-1/2 bg-[#cdffed] min-h-[400px] gap-5">
          <h1 className=" text-2xl lg:text-4xl font-bold">Your Activities</h1>
          <h4 className=" flex gap-2 items-center text-lg font-medium text-yellow-500"><MdElectricRickshaw></MdElectricRickshaw> Orders Deliver :3 </h4>
          <h4 className=" flex gap-2 items-center text-lg font-medium text-green-400"><FaShoppingCart></FaShoppingCart> Cart : {cart?.length} </h4>
          <h4 className=" flex gap-2 items-center text-lg font-medium text-orange-700"><FaStar></FaStar> Reviews : {reviews?.length}</h4>
          <h4 className=" flex gap-2 items-center text-lg font-medium text-purple-700"><MdOutlinePayment></MdOutlinePayment> Payments : 3 </h4>

        </div>
      </div>
    </div>
  );
};

export default UserHome;