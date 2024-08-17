import { useContext } from "react";
import { MainContext } from "../auth-provider/AuthProvider";
import { Link } from "react-router-dom";

const RegisterModal = () => {
  const {modal,setModal} = useContext(MainContext)
  return (
    <div className=" w-[100%] p-5 flex items-center justify-center min-h-96 bg-base-300 flex-col gap-5 rounded-lg relative ">
      <button onClick={()=>setModal(!modal)} className=" btn rounded-full absolute top-0 text-2xl left-2">X</button>
        <h1 className=" text-2xl font-bold">Registered Successfully</h1>
        <Link to={"/"}>
        <button className=" btn btn-accent">Back Home</button>
        </Link>
    </div>
  );
};

export default RegisterModal;