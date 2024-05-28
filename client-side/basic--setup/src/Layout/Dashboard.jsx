import {FaHistory, FaHome, FaList, FaMoon, FaShoppingCart, FaSignOutAlt, FaStar, FaUser, FaUsers } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import './dashboard.css'
import useCart from "../useCart/useCart";
import { MdOutlineContactSupport } from "react-icons/md";
import { TiThMenu } from "react-icons/ti";
import { LuMonitorSmartphone } from "react-icons/lu";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { IoSunnySharp } from "react-icons/io5";
import { MdAddShoppingCart } from "react-icons/md";
import useAdmin from "../hooks/useAdmin";
import useUsers from "../hooks/useUsers";


const Dashboard = () => {
  const {logOut}=useAuth()
  const [userCart,]=useCart()
  const [menu , setMenu]=useState(false)
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
const [isAdmin] =useAdmin()
const [data , refetch]=useUsers()
console.log(data);
  return (
    <div className=" flex gap-10 container mx-auto">

      {/* sidebar */}
       <button onClick={()=>setMenu(!menu)} className={`${theme==='light'?'text-black':'text-white'} z-50 lg:hidden text-2xl  absolute`}><TiThMenu></TiThMenu></button>
      <div className={` ${menu?"block":'hidden'} absolute z-40 w-[50%] min-h-screen  px-5 pt-4  bg-[#039396] `}>
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
            {
          isAdmin?<>
          {/* admin links */}
          <NavLink to={'/dashboard/adminHome'} className={'flex items-center font-bold gap-2 text-white'}><FaHome></FaHome >Admin Home</NavLink>
          <NavLink to={'/dashboard/adminProfile'} className={'flex items-center font-bold gap-2 text-white my-3'}><FaUser></FaUser > My Profile</NavLink>
          <NavLink to={'/dashboard/allUsers'} className={'flex items-center font-bold gap-2 my-3 text-white'}><FaUsers></FaUsers >All Users </NavLink>
          <NavLink to={'/dashboard/allItems'} className={'flex items-center font-bold gap-2 my-3 text-white'}> <FaList></FaList>All Items</NavLink>
          <NavLink to={'/dashboard/addItems'} className={'flex items-center font-bold gap-2 my-3 text-white'}> <MdAddShoppingCart></MdAddShoppingCart>Add Items</NavLink>
          </>:<>
          {/* user links */}
          <NavLink to={'/dashboard/userHome'} className={'flex items-center font-bold gap-2 text-white'}><FaHome></FaHome >User Home</NavLink>
          <NavLink to={'/dashboard/userProfile'} className={'flex items-center font-bold gap-2 text-white my-3'}><FaUser></FaUser > My Profile</NavLink>
          <NavLink to={'/dashboard/myCart'} className={'flex items-center font-bold gap-2 my-3 text-white'}><FaShoppingCart></FaShoppingCart >My Cart <span>{userCart?.length}</span></NavLink>
          <NavLink to={'/dashboard/paymentHistory'} className={'flex items-center font-bold gap-2 my-3 text-white'}> <FaHistory></FaHistory>Payment History</NavLink>
          </>
        }
         
        </div>
        {/* static links  */}
        <div className="divider"></div>
        <div>
        
          
          <NavLink to={'/'} className={'flex items-center font-bold gap-2 text-white'}><FaHome></FaHome > Home</NavLink>
          <NavLink to={'/allGadgets'} className={'flex items-center font-bold gap-2 text-white my-3'}><LuMonitorSmartphone></LuMonitorSmartphone>All Gadgets</NavLink>
          <NavLink to={'/contact'} className={'flex items-center font-bold gap-2 my-3 text-white'}><MdOutlineContactSupport></MdOutlineContactSupport >Contact</NavLink>
          <NavLink to={'/reviews'} className={'flex items-center font-bold gap-2 my-3 text-white'}> <FaStar></FaStar>Reviews</NavLink>
          <h3 onClick={handleLogOut}  className={' cursor-pointer flex items-center font-bold gap-2 my-3 text-white'}> <FaSignOutAlt></FaSignOutAlt>Logout</h3>
        </div>
       </div>
      </div>
      {/* links for lg  */}
      <div className={` hidden lg:block w-[20%] min-h-screen  px-5 pt-4  bg-[#039396] `}>
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
        {
          isAdmin?<>
          {/* admin links */}
          <NavLink to={'/dashboard/adminHome'} className={'flex items-center font-bold gap-2 text-white'}><FaHome></FaHome >Admin Home</NavLink>
          <NavLink to={'/dashboard/adminProfile'} className={'flex items-center font-bold gap-2 text-white my-3'}><FaUser></FaUser > My Profile</NavLink>
          <NavLink to={'/dashboard/allUsers'} className={'flex items-center font-bold gap-2 my-3 text-white'}><FaUsers></FaUsers >All Users </NavLink>
          <NavLink to={'/dashboard/allItems'} className={'flex items-center font-bold gap-2 my-3 text-white'}> <FaList></FaList>All Items</NavLink>
          <NavLink to={'/dashboard/addItems'} className={'flex items-center font-bold gap-2 my-3 text-white'}> <MdAddShoppingCart></MdAddShoppingCart>Add Items</NavLink>
          </>:<>
          {/* user links */}
          <NavLink to={'/dashboard/userHome'} className={'flex items-center font-bold gap-2 text-white'}><FaHome></FaHome >User Home</NavLink>
          <NavLink to={'/dashboard/userProfile'} className={'flex items-center font-bold gap-2 text-white my-3'}><FaUser></FaUser > My Profile</NavLink>
          <NavLink to={'/dashboard/myCart'} className={'flex items-center font-bold gap-2 my-3 text-white'}><FaShoppingCart></FaShoppingCart >My Cart <span>{userCart?.length}</span></NavLink>
          <NavLink to={'/dashboard/paymentHistory'} className={'flex items-center font-bold gap-2 my-3 text-white'}> <FaHistory></FaHistory>Payment History</NavLink>
          </>
        }
         
        </div>
        <div className="divider"></div>
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
      <div className=" w-full lg:w-[70%] ">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;