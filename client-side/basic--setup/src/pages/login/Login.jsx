import { useContext } from "react";
import { Link } from "react-router-dom";
import { MainContext } from "../../components/auth-provider/AuthProvider";
import { FcGoogle } from "react-icons/fc";

import Navbar from "../../components/nav/Navbar";
import loginImage from "../../assets/laptop-with-login-password-form-screen.png";

const Login = () => {
  const { loginUser, theme, googleLogin } = useContext(MainContext);
  console.log(name);
  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    console.log(email, password);

    loginUser(email, password)
      .then((res) => console.log(res.user))
      .catch((err) => console.log(err));
  };
  const handleGoogleLogin = async () => {
    await googleLogin();
  };
  // const ls = localStorage.getItem('theme')
  // console.log(ls);
  return (
    <div className=" min-h-screen">
      <Navbar></Navbar>
      <div className={"  flex items-center mt-20 w-[95%] mx-auto "}>
        <div className="card shrink-0 w-full lg:w-1/2 shadow-2xl  mx-auto bg-base-100 ">
          <h1 className=" text-2xl text-center font-bold pt-3">
            {" "}
            Do You Wanna Login!{" "}
          </h1>

          <div
            className=" flex justify-center mt-10
        "
          >
            <button
              onClick={handleGoogleLogin}
              className=" btn btn-outline btn-success "
            >
              <FcGoogle></FcGoogle> Login With Google
            </button>
          </div>
          <div className="divider">or</div>

          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className=" text-2xl ">Email</span>
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
                <span className=" text-2xl ">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered text-black focus:outline-sky-200"
                required
                name="password"
              />
              <h1 className=" text-lg font-semibold mt-3 cursor-pointer hover:underline">
                Forget Password ?
              </h1>
            </div>

            <div className="form-control mt-6  mx-auto">
              <button className="btn bg-[#e7eca3] text-black font-bold text-lg">
                Login
              </button>
            </div>
          </form>
          <p className=" text-center mb-2 text-lg font-bold ">
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
      {/* modal for reset pass  */}
      <div>
        <form >
        <div className="form-control">
              <label className="label">
                <span className=" text-2xl ">Please Enter Your Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered text-black focus:outline-sky-200"
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
    </div>
  );
};

export default Login;
