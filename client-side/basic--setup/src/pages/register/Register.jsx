import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MainContext } from "../../components/auth-provider/AuthProvider";
import RegisterModal from "../../components/modals/RegisterModal";
import { updateProfile } from "firebase/auth";
import axios from "axios";
import GoogleLogin from "../../socialLogin/GoogleLogin";
import registerImg from "../../assets/computer-security-with-login-password-padlock.jpg"
import usePostImage from "../../hooks/usePostImage";
import Swal from "sweetalert2";
import DynamicPageTitle from "../../reuseable/DynamicPageTitle";
const Register = () => {

  const {createUser , modal ,setModal,updateUserProfile} = useContext(MainContext)
  const [photo,setPhoto]=useState([])
  
  const imgUrl = usePostImage(photo)
  // console.log(imgUrl);
 const handleRegister=  (e)=>{
  e.preventDefault()

  const name = e.target.name.value
  const email = e.target.email.value
  const password = e.target.password.value

  // console.log(createUser);
  // console.log(name);

  createUser(email , password)
  .then(res=>{
    // console.log(res.user);
    updateUserProfile(name,imgUrl)
    setModal(true)
    const usersData ={
      email,
      name ,
      photo ,
      status:"user"
      
    }
    
      axios.post('http://localhost:5000/users',usersData)
      .then(res=>{
        // console.log(res.data);
      })
      .catch(err=>{
        console.log(err);
      })
    
  })
  .catch(err=>{
    console.log(err);
    Swal.fire({
      text:err.message,
      icon:"error"
    })
  })

 
 }

  return (
    <div className="min-h-[calc(100vh-116px)] flex items-center  relative">
      <DynamicPageTitle dynamicTitle={"Register"}></DynamicPageTitle>
    <div className=" flex flex-col lg:flex-row gap-5">
      {/* img div  */}
      <div className=" w-full flex  items-center lg:w-[40%]">
     <img src={registerImg} className=" " alt="" />
      </div>
      {/* form div */}
      <div className={`card shrink-0 w-full lg:w-[50%] shadow-2xl  mx-auto my-5 ${modal?"hidden":"block"} bg-base-300`}>
      <h1 className=" text-3xl text-center font-bold pt-3">Please Register !</h1>

    <form onSubmit={handleRegister} className="card-body">

    <div className="form-control">
          <label className="label">
            <span className=" ">You&apos;re Full Name</span>
          </label>
          <input
            type="text"
            placeholder="Name"
            className="input input-bordered bg-white text-black   focus:outline-sky-200"
            required
            name="name"
          />
        </div>


        <div className="form-control">
          <label className="label">
            <span className=" ">You&apos;re Photo </span>
          </label>
          <input
            type="file"
            required
            onChange={(e)=>setPhoto(e.target.files[0])}
          />
        </div>

      <div className="form-control">
        <label className="label">
          <span className=" ">Email</span>
        </label>
        <input
          type="email"
          placeholder="email"
          className="input input-bordered bg-white text-black   focus:outline-sky-200"
          required
          name="email"
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className=" ">Password</span>
        </label>
        <input
          type="password"
          placeholder="password"
          className="input input-bordered bg-white text-black focus:outline-sky-200"
          required
          name="password"
        />
      
      </div>
      <div className="form-control mt-6 w-1/3 mx-auto">
        <button className="btn bg-[#159fa9]  font-bold text-white">Register</button>
      </div>
      
    </form>
    <div className="divider">or</div>
    <div>
      <GoogleLogin></GoogleLogin>
    </div>
    <div className="divider"></div>
    <p className=" text-center mb-2 ">Already Have an Account ! <Link className=" font-bold hover:underline text-blue-700" to={"/login"}>Login</Link></p>
  </div>
    </div>
  {
    modal?<div className=" my-10 absolute left-[5%] lg:left-[30%] w-[90%]  lg:w-[40%]">
    <RegisterModal></RegisterModal>
  </div>:''
  }
  </div>
  );
};

export default Register;