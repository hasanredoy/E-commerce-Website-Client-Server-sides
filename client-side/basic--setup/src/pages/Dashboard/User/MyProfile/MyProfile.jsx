import { FaEdit } from "react-icons/fa";
import useAuth from "../../../../hooks/useAuth";
import useFetch from "../../../../hooks/useFetch";
import useFetchCommon from "../../../../hooks/useFetchCommon";
import axios from "axios";
import { useState } from "react";
import usePostImage from "../../../../hooks/usePostImage";
import { updateProfile } from "firebase/auth";

const MyProfile = () => {
  const axiosCommon = useFetchCommon()
  const {user}=useAuth()
console.log(user);
  // imageState 
  const [image , setImage]=useState([])
  // posting image on imgbb 
  const imageUrl = usePostImage(image)
// console.log(imageUrl);
  // update user profile 
  const handleUpdateUserProfile=(e)=>{
    e.preventDefault()
    const name = e.target.name.value
    const userImage = imageUrl 
  if(imageUrl){
    updateProfile(user,{
      displayName:name ,
      photoURL:imageUrl,
      phoneNumber:user?.phoneNumber   
    })
  }
  
      
  }
  return (
    <div>
       <div className="  flex flex-col items-center my-10 justify-center">
        <img className=" w-[300px] h-[300px] rounded-full border border-sky-600" src={user?.photoURL} alt="" />
        <form onSubmit={handleUpdateUserProfile} className=" w-full flex gap-10 flex-col justify-center ">
          <div className=" ">
          <h1 className=" text-xl pb-3 font-bold">Change Profile Photo? </h1>
            <input
            onChange={(e)=>setImage(e.target.files[0])}
            type="file" name="image" />
          </div>
         
            <div className="form-control">
              <label className="label">
                <span className=" text-2xl ">Name</span>
              </label>
              <input
                type="text"
               defaultValue={user?.displayName}
                className="input input-bordered text-black bg-white  focus:outline-sky-200"
                required
                name="name"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className=" text-2xl ">Email </span>
              </label>
              <input
                type="email"
                defaultValue={user?.email}
                className="input input-bordered text-black bg-white focus:outline-sky-200"
                readOnly
                required
                name="email"
              />
            
            </div>
          <button className=" btn bg-[#04d9bd]">Update</button>
          </form>
       </div>
    </div>
  );
};

export default MyProfile;