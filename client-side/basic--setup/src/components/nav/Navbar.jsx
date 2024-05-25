import { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MainContext } from "../auth-provider/AuthProvider";
import { FaShoppingCart, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import "./navbar.css";
import { FaMoon, FaRegSun, FaSun } from "react-icons/fa6";
import { IoSunnySharp } from "react-icons/io5";
import { MdDashboardCustomize } from "react-icons/md";


const Navbar = () => {
  const { user, logOut } = useContext(MainContext);
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

  const handleLogOut = () => {
    logOut().then().catch();
  };

  const links = (
    <>
      <NavLink className={"  text-lg font-semibold lg:mr-5 "} to={"/"}>
        Home
      </NavLink>
      <NavLink className={"text-lg font-semibold lg:mr-5 "} to={"/allGadgets"}>
        All Gadgets
      </NavLink>
      <NavLink className={"text-lg font-semibold lg:mr-5 "} to={"/reviews"}>
        Become Seller
      </NavLink>
      <NavLink className={"text-lg font-semibold lg:mr-5 "} to={"/reviews"}>
        Reviews
      </NavLink>
      <NavLink className={"text-lg lg:mr-5 font-semibold "} to={"/contact"}>
        Contact
      </NavLink>

      <NavLink
        className={
          "  flex gap-1 justify-center items-center bg-lime-50 w-14 h-8 rounded-full hover:bg-slate-100 text-xl lg:mr-4 text-yellow-600  font-bold "
        }
        to={"/myCart"}
      >
        <FaShoppingCart className=" text-neutral-800"></FaShoppingCart> 0
      </NavLink>
    </>
  );

  return (
    <div className="navbar  bg-base-300  bg-opacity-90  mx-auto">
      <div className="navbar-start ">
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
              className={` flex gap-2 justify-center items-center  rounded-full p-2 ${
                theme === "light" ? "bg-white" : "bg-[#121212]"
              }  `}
            >
              <span className=" text-base lg:text-xl ">
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
            {links}
          </ul>
        </div>

        <Link to={"/"}>
          <div className=" ">
            <h1 className="font-black text-base lg:text-xl bg-gradient-to-l from-blue-800 to-purple-900 via-yellow-400 bg-clip-text text-transparent">
              <span className=" text-lg lg:text-2xl ">G</span>
              adget <span className=" text-lg lg:text-2xl">S</span>
              hop
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
          className={` hidden md:flex gap-2 justify-center items-center  rounded-full p-2 ${
            theme === "light" ? "bg-white" : "bg-[#121212]"
          }  `}
        >
          <span className=" text-base lg:text-xl ">
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
        <div className=" hidden lg:flex">
          {user && (
            <div className="dropdown dropdown-hover">
              <div className="avatar">
                <div
                  title={user.displayName || ""}
                  className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
                >
                  <img className=" w-full h-full" src={user.photoURL || ""} />
                </div>
              </div>{" "}
              <ul
                tabIndex={0}
                className="dropdown-content z-[50] menu p-2 shadow  rounded-box bg-slate-200 text-black py-5 space-y-4 -left-44 w-52"
              >
                <Link
                  
                  className=" flex gap-2 items-center justify-center "
                >
                  <MdDashboardCustomize className=" text-xl"></MdDashboardCustomize>
                  <span className=" ">Dashboard</span>
                </Link>
                <Link
                  onClick={handleLogOut}
                  className="flex gap-2 justify-center items-center"
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
            className="btn rounded-full  btn-outline btn-md btn-info hover:btn-secondary flex items-center justify-center pb-0 lg:pb-1 lg:text-xl  text-white"
          >
            <FaSignInAlt className=" flex text-xl"></FaSignInAlt>
            <span className=" hidden md:flex">Login</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
