import { FaEdit } from "react-icons/fa";
import useAuth from "../../../../hooks/useAuth";
import useFetch from "../../../../hooks/useFetch";
import useFetchCommon from "../../../../hooks/useFetchCommon";
import axios from "axios";
const api_key= import.meta.env.VITE_IMAGE_HOSTING_API_KEY
const api_url = `https://api.imgbb.com/1/upload?key=${api_key}`
const MyProfile = () => {
  const axiosCommon = useFetchCommon()
  const {user}=useAuth()
  const handleUpdateUserProfile= async(e)=>{
    e.preventDefault()
    const image = e.target.image.files[0]
    const name = e.target.name.value
    const email = e.target.email.value
    const imageUrl = {image :image}
    const uploadImage = await axios.post(api_url , image,{
      headers:{
        "content-type":"multipart/form-data"
      }
    })
    console.log(uploadImage);
      
  }
  return (
    <div>
       <div className="  flex flex-col items-center my-10 justify-center">
        <img className=" w-[300px] h-[300px] rounded-full border border-sky-600" src={user?.photoURL} alt="" />
        <form onSubmit={handleUpdateUserProfile} className=" w-full flex gap-10 flex-col justify-center ">
          <div className=" ">
          <h1 className=" text-xl pb-3 font-bold">Change Profile Photo? </h1>
            <input  className="   w-[97px] "  type="file" name="image" />
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