import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MainContext } from "../auth-provider/AuthProvider";
import { FaShoppingCart, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import "./navbar.css";
import { FaMoon, } from "react-icons/fa6";
import { IoSunnySharp } from "react-icons/io5";
import { MdDashboardCustomize } from "react-icons/md";
import gadgetLogo  from '../../assets/gadgets.png'
import useCart from "../../useCart/useCart";
import useAdmin from "../../hooks/useAdmin";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = useContext(MainContext);
  const [isAdmin,]=useAdmin()
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
  // console.log(user);
  useEffect(() => {
    document
      .querySelector("html")
      .setAttribute("data-theme", localStorage.getItem("theme"));
  }, []);

  const handleLogOut=()=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You Want to Logout",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#046351",
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


   const [data]=useCart()
  const links = (
    <>
      <NavLink className={"   text-sm lg:text-base  font-semibold lg:mr-5 "} to={"/"}>
        Home
      </NavLink>
      <NavLink className={"t text-sm lg:text-base font-semibold lg:mr-5 "} to={"/allGadgets"}>
        All Gadgets
      </NavLink>
      <NavLink className={" text-sm lg:text-base  font-semibold lg:mr-5 "} to={"/becomeSeller"}>
        Become Seller
      </NavLink>
      <NavLink className={" text-sm lg:text-base  font-semibold lg:mr-5 "} to={"/reviews"}>
        Reviews
      </NavLink>
      <NavLink className={" text-sm lg:text-base  lg:mr-5 font-semibold "} to={"/contact"}>
        Contact
      </NavLink>

      { user&&
        <>{isAdmin||<NavLink
        className={
          "  flex gap-1 justify-center items-center bg-[#046351] w-14 h-8 rounded-full hover:bg-slate-100 text-xl lg:mr-4 text-[#22f8d0]  font-bold  "
        }
        to={"/dashboard/myCart"}
      >
        <FaShoppingCart className=" text-neutral-300"></FaShoppingCart> {data?.length}
      </NavLink>}</>
      }
    </>
  );

  return (
    <div className="bg-base-300 ">
      <div className="  w-[95%] lg:w-[90%] navbar     mx-auto">
      <div className=" w-full lg:navbar-start ">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 space-y-3 "
          >
            <div
              className={` flex gap-2 justify-center items-center  rounded-full py-1 px-2 border-b-2 border-[#15f7ce] ${
                theme === "light" ? "bg-white" : "bg-[#121212]"
              }  `}
            >
              <span className=" text-sm lg:text-base ">
                {theme === "light" && (
                  <IoSunnySharp className=""></IoSunnySharp>
                )}
                {theme === "dark" && <FaMoon></FaMoon>}
              </span>
              <select
                className=" outline-none border-0"
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
            <hr />
            {links}
          </ul>
        </div>

        <Link to={"/"}>
          <div className=" flex gap-0 lg:ga rounded-sm px-1 border bg-slate-50 ">
            <img src={gadgetLogo} className=" h-10 w-10" alt="" />
            <h1 className="font-black text-base lg:text-xl bg-gradient-to-l to-[#046351] from-[#03c7a3]  bg-clip-text text-transparent flex flex-col md:flex-row items-center">
              Gadget <span className="ml-2">Shop</span>
             
            </h1>

          </div>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 flex justify-center items-center ">
          {links}
        </ul>
      </div>
      <div className="navbar-end flex gap-5">
        <div
          className={` hidden md:flex gap-2 justify-center items-center  rounded-full py-1 px-2 border border-b-2 border-[#046351] ${
            theme === "light" ? "bg-white " : "bg-[#121212]"
          }  `}
        >
          <span className=" text-sm lg:text-base ">
            {theme === "light" && <IoSunnySharp className=""></IoSunnySharp>}
            {theme === "dark" && <FaMoon></FaMoon>}
          </span>
          <select
            className=" outline-none border-0"
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
        <div className=" ">
          {user && (
            <div className="dropdown ">
              <div tabIndex={0} className="avatar">
                <div
                  title={user.displayName || ""}
                  className="w-10 rounded-full ring ring-[#03f6c9] ring-offset-base-100 ring-offset-2"
                >
                  <img className=" w-full h-full" src={user.photoURL || ""} />
                </div>
              </div>{" "}
              <ul
                tabIndex={0}
                className="dropdown-content z-[50] menu p-2 shadow  rounded-box bg-slate-200 text-black py-5 space-y-4 -left-28 w-36"
              >
                <Link
                  to={'/dashboard/profile'}
                  className="flex w-32 rounded-md border-b-4 border-l-4 p-2 border border-[#01a587] gap-2 justify-center items-center "
                >
                  <MdDashboardCustomize className=" text-xl"></MdDashboardCustomize>
                  <span className=" ">Dashboard</span>
                </Link>
                <Link
                  onClick={handleLogOut}
                  className="flex w-32 rounded-md border-b-4 p-2 border border-r-4 border-[#02b090] gap-2 justify-center items-center"
                >
                  <FaSignOutAlt className=" text-xl"></FaSignOutAlt>
                  <span className=" "> Logout</span>
                </Link>
              </ul>
            </div>
          )}
        </div>
        {user ? (
          ""
        ) : (
          <Link
            to={"/login"}
            title="Login"
            className="btn-primary"
          >
            <FaSignInAlt className="hidden md:block "></FaSignInAlt>
            <span className="  ">Login</span>
          </Link>
        )}
      </div>

      </div>
    </div>
  );
};

export default Navbar;
