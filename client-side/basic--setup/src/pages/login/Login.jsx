import { useContext } from "react";
import { Link } from "react-router-dom";
import { MainContext } from "../../components/auth-provider/AuthProvider";

const Login = () => {
  const {loginUser}= useContext(MainContext)
 console.log(name);
  const handleLogin= (e)=>{
    e.preventDefault()
  
    
    const email = e.target.email.value
    const password = e.target.password.value
  
    console.log(email, password);

    loginUser(email, password)
    .then(res=>console.log(res.user))
    .catch(err=>console.log(err.user))
   }

  return (
    <div className="min-h-[calc(100vh-116px)] bg-[#472b2f] container mx-auto flex items-center ">
      <div className="card shrink-0 w-full lg:w-1/2 shadow-2xl text-white bg-[#2a171b] mx-auto">
        <h1 className=" text-3xl text-center font-bold pt-3">Please Login!</h1>
      <form onSubmit={handleLogin} className="card-body">


      


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
          <button className="btn bg-[#e7eca3]">Login</button>
        </div>
        
      </form>
      <p className=" text-center mb-2 ">New Here ! <Link className=" font-bold hover:underline text-blue-700" to={"/register"}>Register</Link></p>
    </div>
    </div>
  );
};

export default Login;
