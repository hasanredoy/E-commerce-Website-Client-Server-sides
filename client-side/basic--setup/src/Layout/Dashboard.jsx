import { FaHistory, FaHome, FaMoon, FaShoppingCart, FaSignOutAlt, FaStar } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import './dashboard.css'
import useCart from "../useCart/useCart";
import { MdOutlineContactSupport } from "react-icons/md";

import { LuMonitorSmartphone } from "react-icons/lu";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { IoSunnySharp } from "react-icons/io5";

const Dashboard = () => {
  const {logOut}=useAuth()
  const [userCart,]=useCart()
  const handleLogOut=()=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You Want to Logout",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#039396",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout"
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
        .then(()=>{
          Swal.fire({
            title: "Logged Out Successfully",
            icon: "success"
          });
        })
      }
    });
    
  }

  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  const handleTheme = (e) => {
    //  console.log(e.target.value);
    setTheme(e.target.value);
    if (e.target.value === "light") {
      localStorage.setItem("theme", "light");
    } else if (e.target.value === "dark") {
      localStorage.setItem("theme", "dark");
    }
    document
      .querySelector("html")
      .setAttribute("data-theme", localStorage.getItem("theme"));
  };
  // console.log(theme);
  useEffect(() => {
    document
      .querySelector("html")
      .setAttribute("data-theme", localStorage.getItem("theme"));
  }, []);

  return (
    <div className=" flex gap-10 container mx-auto">

      {/* sidebar */}
      <div className=" w-[20%] min-h-screen  px-5 pt-4  bg-[#039396] ">
       <div className=" h-full flex max-h-screen flex-col justify-evenly">
       <div className=" flex-1">

       <div
              className={` text-white flex gap-2  items-center   p-2 border-b-2 border-[#15f7ce] mb-3 `}
            >
              <span className="  text-base lg:text-xl ">
                {theme === "light" && (
                  <IoSunnySharp className=""></IoSunnySharp>
                )}
                {theme === "dark" && <FaMoon></FaMoon>}
              </span>
              <select
                className=" bg-[#039396] text-white font-bold outline-none border-0"
                defaultValue={
                  localStorage.getItem("theme")
                    ? localStorage.getItem("theme")
                    : "Theme"
                }
                onChange={handleTheme}
                name="themeController"
              >
                <option value="light"> Light </option>
                <option value="dark">Dark </option>
              </select>
            </div>
          {/* user links */}
          <NavLink to={'/dashboard/userHome'} className={'flex items-center font-bold gap-2 text-white'}><FaHome></FaHome >User Home</NavLink>
          <NavLink to={'/dashboard/userProfile'} className={'flex items-center font-bold gap-2 text-white my-3'}><FaHome></FaHome > My Profile</NavLink>
          <NavLink to={'/dashboard/myCart'} className={'flex items-center font-bold gap-2 my-3 text-white'}><FaShoppingCart></FaShoppingCart >My Cart <span>{userCart?.length}</span></NavLink>
          <NavLink to={'/dashboard/paymentHistory'} className={'flex items-center font-bold gap-2 my-3 text-white'}> <FaHistory></FaHistory>Payment History</NavLink>
         
        </div>
        {/* static links  */}
        <div>
        
          
          <NavLink to={'/'} className={'flex items-center font-bold gap-2 text-white'}><FaHome></FaHome > Home</NavLink>
          <NavLink to={'/allGadgets'} className={'flex items-center font-bold gap-2 text-white my-3'}><LuMonitorSmartphone></LuMonitorSmartphone>All Gadgets</NavLink>
          <NavLink to={'/contact'} className={'flex items-center font-bold gap-2 my-3 text-white'}><MdOutlineContactSupport></MdOutlineContactSupport >Contact</NavLink>
          <NavLink to={'/reviews'} className={'flex items-center font-bold gap-2 my-3 text-white'}> <FaStar></FaStar>Reviews</NavLink>
          <h3 onClick={handleLogOut}  className={' cursor-pointer flex items-center font-bold gap-2 my-3 text-white'}> <FaSignOutAlt></FaSignOutAlt>Logout</h3>
        </div>
       </div>
      </div>
      <div className=" w-[70%] ">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;