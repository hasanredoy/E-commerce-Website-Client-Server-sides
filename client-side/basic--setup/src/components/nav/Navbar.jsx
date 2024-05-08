import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MainContext } from "../auth-provider/AuthProvider";
import { FaMoon } from "react-icons/fa";
import { MdLightMode } from "react-icons/md";



const Navbar = () => {
  const { user, logOut } = useContext(MainContext);
  // const [toggle , setToggle ]= useState(localStorage.getItem('theme'))
  const [toggle , setToggle ]= useState(localStorage.getItem('theme'))
  localStorage.setItem('theme', toggle)
  const themeFromLs = localStorage.getItem('theme')
  if(themeFromLs==="true"){
    document.querySelector("html").setAttribute("data-theme","light")
    }
  if(themeFromLs==="false"){
    document.querySelector("html").setAttribute("data-theme","dark")
    }
  // console.log(user);
  console.log(themeFromLs);
  const handleLogOut = () => {
    logOut().then().catch();
  };



  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/cart"}>Cart</NavLink>
      </li>
      <li>
        <NavLink to={"/contact"}>Contact</NavLink>
      </li>
    </>
  );

  return (
    <div className={themeFromLs==="true"? "navbar bg-base-200     mx-auto": "navbar bg-gray-700     mx-auto"}
   >
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
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-gray-200"
          >
            {links}
          </ul>
        </div>

        <Link to={"/"}>
          <div className=" ">
            <h1 className=
            {themeFromLs==="true"?'font-black text-xl bg-gradient-to-r from-blue-700 to-purple-600 via-red-400 bg-clip-text text-transparent':"font-black text-xl bg-gradient-to-r from-blue-700 to-purple-600 via-red-400 bg-clip-text text-transparent"}
            
            ><span className={themeFromLs==="true"?'text-2xl ':' text-2xl'}>G</span>adget <span  className={themeFromLs==="false"?' text-2xl':' text-2xl'}>S</span>hop</h1>
          
          </div>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className={themeFromLs==="true"?"menu menu-horizontal px-1 text-black":"menu menu-horizontal px-1 text-gray-200"}>{links}</ul>
      </div>
      <div className="navbar-end flex gap-5">
        <div>
          <label className="swap swap-rotate  ">
            {/* this hidden checkbox controls the state */}
            <input
            onClick={()=>setToggle(!toggle)}
              type="checkbox"
              className="theme-controller"
            />
           {themeFromLs==="true"?
         
           <div>
           <MdLightMode className=" text-4xl text-yellow-500"></MdLightMode>
           </div>
           :
           <div>
            <FaMoon className=" text-3xl"></FaMoon>
           </div>
           }
           

            
          </label>
        </div>
      <div className=" hidden lg:flex">
      {user && (
          <div className="avatar">
            <div
              title={user.displayName || ""}
              className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
            >
              <img className=" w-full h-full" src={user.photoURL || ""} />
            </div>
          </div>
        )}
      </div>
        {user ? (
          <Link
            onClick={handleLogOut}
            className="btn btn-outline btn-primary  text-white"
          >
            Logout
          </Link>
        ) : (
          <Link
            to={"/login"}
            className="btn  btn-outline btn-md btn-info hover:btn-secondary flex items-center justify-center pb-1 lg:text-xl  text-white"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
