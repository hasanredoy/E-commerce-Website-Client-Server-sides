import { useContext } from "react";
import { Link } from "react-router-dom";
import { MainContext } from "../../components/auth-provider/AuthProvider";
import RegisterModal from "../../components/modals/RegisterModal";
import { updateProfile } from "firebase/auth";
import axios from "axios";
import GoogleLogin from "../../socialLogin/GoogleLogin";

const Register = () => {

  const {createUser , modal ,setModal} = useContext(MainContext)

 const handleRegister= (e)=>{
  e.preventDefault()

  const name = e.target.name.value
  const photo = e.target.photo.value
  const number = e.target.number.value
  const email = e.target.email.value
  const password = e.target.password.value

  console.log(createUser);
  createUser(email , password)
  .then(res=>{
    setModal(true)
    console.log(res.user);
    updateProfile(res.user,{
      displayName:name ,
      photoURL:photo,
      phoneNumber:number   
    })
    const usersData ={
      email,
      name ,
      photo ,
      status:"user"
      
    }
    
      axios.post('http://localhost:5000/users',usersData)
      .then(res=>{
        console.log(res.data);
      })
      .catch(err=>{
        console.log(err);
      })
    
  })
  .catch(err=>console.log(err))

 }

  return (
    <div className="min-h-[calc(100vh-116px)] bg-[#472b2f] container mx-auto flex items-center  relative">
    <div className={`card shrink-0 w-full lg:w-1/2 shadow-2xl text-white bg-[#2a171b] mx-auto my-5 ${modal?"hidden":"block"}`}>
      <h1 className=" text-3xl text-center font-bold pt-3">Please Register !</h1>

    <form onSubmit={handleRegister} className="card-body">

    <div className="form-control">
          <label className="label">
            <span className=" ">You&apos;re Full Name</span>
          </label>
          <input
            type="text"
            placeholder="Name"
            className="input input-bordered text-black outline focus:outline-sky-200"
            required
            name="name"
          />
        </div>


        <div className="form-control">
          <label className="label">
            <span className=" ">You&apos;re Photo URL</span>
          </label>
          <input
            type="url"
            placeholder="Photo URL"
            className="input input-bordered text-black outline focus:outline-sky-200"
            required
            name="photo"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className=" ">You&apos;re Phone Number <small className=" text-green-600">(Don&apos;t Worry We Won&apos;t Publish You&apos;re Number)</small></span>
          </label>
          <input
            type="number"
            placeholder="Number"
            className="input input-bordered text-black outline focus:outline-sky-200"
            required
            name="number"
          />
        </div>

      <div className="form-control">
        <label className="label">
          <span className=" ">Email</span>
        </label>
        <input
          type="email"
          placeholder="email"
          className="input input-bordered text-black outline focus:outline-sky-200"
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
          className="input input-bordered text-black focus:outline-sky-200"
          required
          name="password"
        />
      
      </div>
      <div className="form-control mt-6 w-1/3 mx-auto">
        <button className="btn bg-[#e7eca3]">Register</button>
      </div>
      
    </form>
    <div>
      <GoogleLogin></GoogleLogin>
    </div>
    <p className=" text-center mb-2 ">Already Have an Account ! <Link className=" font-bold hover:underline text-blue-700" to={"/register"}>Login</Link></p>
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