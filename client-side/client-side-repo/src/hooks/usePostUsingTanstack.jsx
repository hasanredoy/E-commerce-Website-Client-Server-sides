import { useMutation } from "@tanstack/react-query";
import useFetchCommon from "./useFetchCommon";
import { useState } from "react";

const usePostUsingTanstack = (url) => {
  // console.log(url);
  const [result ,setResult]=useState({})
  const axiosCommon = useFetchCommon()
  const {mutateAsync}=useMutation({
    mutationFn:async(postData)=>{
      // console.log(postData);
    const {data} = await axiosCommon.post(url,postData)
    // console.log(data);
    setResult(data)
  }
  })
  return [mutateAsync,result]
};

export default usePostUsingTanstack;