import { FaHome, FaShoppingCart } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import './dashboard.css'
const Dashboard = () => {
  return (
    <div className=" flex gap-5 container mx-auto">
      {/* sidebar */}
      <div className=" w-[20%] px-5 pt-5  bg-[#039396] ">
        {/* user links */}
          <NavLink to={'/dashboard/userHome'} className={'flex items-center font-bold gap-2 text-white'}><FaHome></FaHome > Home</NavLink>
          <NavLink to={'/dashboard/myCart'} className={'flex items-center font-bold gap-2 my-3'}><FaShoppingCart></FaShoppingCart >My Cart</NavLink>
      </div>
      <div className=" w-[70%] ">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;