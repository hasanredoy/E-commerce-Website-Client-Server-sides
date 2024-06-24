import { Link } from "react-router-dom";
import errorImg from "../../assets/error.jpg"
const ErrorPage = () => {
  return (
    <div 
  
     className=" w-full h-screen flex justify-center ">
      <img src={errorImg} className=" h-screen w-[90%]" alt="" />
    <div className="  absolute top-[2%]  flex flex-col gap-10"><h1 className=" z-50 text-5xl font-bold "> Page Not Found</h1>
    <Link to={-1} className=" mx-auto">
    <button className="btn bg-sky-600  text-white z-50 font-bold">Go Back</button>
    </Link>
    </div>
    </div>
  );
};

export default ErrorPage;