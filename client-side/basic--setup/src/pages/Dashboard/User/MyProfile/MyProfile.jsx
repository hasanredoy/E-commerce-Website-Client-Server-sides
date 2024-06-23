import useAuth from "../../../../hooks/useAuth";
import useFetch from "../../../../hooks/useFetch";
import { useState } from "react";
import usePostImage from "../../../../hooks/usePostImage";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";

const MyProfile = () => {
  const {user}=useAuth()
  const email = user.email
// console.log(user);
  // imageState 
  const [image , setImage]=useState([])
  // posting image on imgbb 
  const imageUrl = usePostImage(image)
console.log(imageUrl);
const axiosHook = useFetch()
function refreshPage() {
setTimeout(()=>{
  window.location.reload();
},1500)
}

  // update user profile 
  const handleUpdateUserProfile=(e)=>{
    e.preventDefault()
    const name = e.target.name.value
    const userData ={
      name,
      photo:imageUrl
    }
  
      updateProfile(user,{
      displayName:name ,
      photoURL:imageUrl,
    })
    axiosHook.patch(`/users/${email}`,userData)
    .then(res=>{
      console.log(res.data);
      if(res.data?.modifiedCount>0){
        Swal.fire({
          icon:'success',
          text:"Profile Updated Successfully"
      })
      }
    })
  
  
      
  }
  return (
    <div>
       <div className="  flex flex-col items-center my-10 justify-center">
        <img className=" w-[300px] h-[300px] rounded-full border border-sky-600" src={user?.photoURL} alt="" />

        <h1 className=" text-2xl font-bold pt-5">Welcome <span className=" text-sky-500">{user?.displayName?user?.displayName:"Back"}</span>.. Wanna Update Your Profile?</h1>
        <div className="divider"></div>
        <form onSubmit={handleUpdateUserProfile} className=" w-full flex gap-10 flex-col justify-center ">
          {/* image  */}
        <div className=" flex gap-[5%] mt-10">
        <div className=" ">
          <h1 className=" text-xl pb-3 font-bold">Change Profile Photo? </h1>
            <input
            onChange={(e)=>setImage(e.target.files[0])}
            type="file" name="image" />
           
          </div>
          <div>
          {
              imageUrl&&<img src={imageUrl} className=" w-32 h-32" alt="" />
            }
          </div>
        </div>
         {/* name  */}
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
            {/* email  */}
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
          <button
          onClick={refreshPage}
          className=" btn bg-[#04d9bd]">Update</button>
          </form>
       </div>
    </div>
  );
};

export default MyProfile;