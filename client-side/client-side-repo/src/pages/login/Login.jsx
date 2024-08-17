import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MainContext } from "../../components/auth-provider/AuthProvider";
import Swal from 'sweetalert2'

import Navbar from "../../components/nav/Navbar";
import loginImage from "../../assets/laptop-with-login-password-form-screen.png";
import GoogleLogin from "../../socialLogin/GoogleLogin";
import DynamicPageTitle from "../../reuseable/DynamicPageTitle";

const Login = () => {
  const { loginUser,resetPass} = useContext(MainContext);
  const location =useLocation()
  const navigate =useNavigate()
  const [modal , setModal]=useState(false)


  const path = location.state || '/';
  // console.log(location);
  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    // console.log(email, password);

    loginUser(email, password)
      .then((res) => {
        navigate(path)
        // console.log(res.user)
      })
      .catch((err) => console.log(err));
  };
 

  const handleResetPass =(e)=>{
    e.preventDefault()
    const email = e.target.modalEmail.value;
     resetPass(email)
    .then(()=>{
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Please Check Your Email.`,
        showConfirmButton: false,
        timer: 1500
      });
    })
    .catch(err=>{
      console.log(err);
    })
    }

  return (
    <div className=" min-h-screen">
      <DynamicPageTitle dynamicTitle={"Login | Dashboard"}></DynamicPageTitle>
      <Navbar></Navbar>
      {
        modal||<div className={" w-[95%] lg:w-[90%] mx-auto my-10   flex flex-col-reverse lg:flex-row  items-center mt-3 lg:mt-20"}>
        <div className="card shrink-0 w-full lg:w-1/2 shadow-2xl  mx-auto bg-base-100 ">
          <h1 className=" text-xl text-center font-bold pt-3">
            {" "}
            Do You Wanna Login!{" "}
          </h1>

          <div
            className=" flex justify-center mt-10
        "
          >
             <GoogleLogin></GoogleLogin>
          </div>
          <div className="divider">or</div>

          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="  ">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered text-black bg-white  focus:outline-sky-200"
                required
                name="email"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered text-black bg-white focus:outline-sky-200"
                required
                name="password"
              />
              <h1 onClick={()=>setModal(true)} className=" text-sm font-semibold mt-3 cursor-pointer hover:underline">
                Forget Password ?
              </h1>
            </div>

            <div className="form-control mt-6  mx-auto">
              <button className="btn-primary">
                Login
              </button>
            </div>
          </form>
          <p className=" text-center mb-2  ">
            New Here !{" "}
            <Link
              className=" font-bold hover:underline text-blue-700"
              to={"/register"}
            >
              Register
            </Link>
          </p>
        </div>
        <div>
          <img src={loginImage} alt="" />
        </div>
      </div>
      }
      {/* modal for reset pass  */}
      {
        modal&&  <div className=" absolute left-2 md:left-[25%] top-[15%] lg:top-[25%] w-[95%] md:w-1/2 mx-auto bg-neutral-300 rounded-xl  p-5 lg:p-10  shadow-lg text-black">
        <div className=" flex justify-end">

        <h5 onClick={()=>setModal(false)} className=" btn btn-circle text-xl btn-ghost">X</h5>
        </div>
        <h1 className=" text-lg md:text-2xl font-bold text-center mb-5">Forget Your Password? Please Enter Your Email Blew.</h1>


        <form onSubmit={handleResetPass} >
        <div className="form-control">
              <label className="label">
                <span className=" text-base md:text-lg ">Please Enter Your Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered bg-white focus:outline-sky-200"
                required
                name="modalEmail"
              />
              
            </div>

            <div className="form-control mt-6  mx-auto">
              <button className="btn bg-[#e7eca3] text-black font-bold text-lg">
                Submit 
              </button>
            </div>

        </form>
      </div>
      }
    
    </div>
  );
};

export default Login;
