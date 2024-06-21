import axios from "axios";
import { useState } from "react";

const usePostImage = (image) => {
  // console.log(image);
const [imageUrl , setImageUrl]=useState('')
  const api_key= import.meta.env.VITE_IMAGE_HOSTING_API_KEY
const api_url = `https://api.imgbb.com/1/upload?key=${api_key}`
const imageData = new FormData()
imageData.append("image",image)
if(!image.name)return
  axios.post(api_url,imageData)
  .then(res=>{
    // console.log(res.data);
    setImageUrl(res.data?.data?.display_url)    
  })
  return imageUrl
  
};

export default usePostImage;