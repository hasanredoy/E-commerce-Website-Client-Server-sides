import { useEffect, useState } from "react";
import useFetchCommon from "../hooks/useFetchCommon";
import useAuth from "../hooks/useAuth";

const Pagination = (url,itemsCount) => {
  // console.log(url);
  const {user} = useAuth()
  const email = user.email
  // count state
  const [count, setCount] = useState(0);
  const itemsPerPage = itemsCount;
  const totalPage = Math.ceil(count / itemsPerPage);
  let numberOfPages = [];
  // console.log(numberOfPages);
  for (let i = 0; i < totalPage; i++) {
    // console.log(i);
    numberOfPages.push(i);
  }
  const axiosCommon = useFetchCommon();

  // function for pagination
  // get reviews collection
  useEffect(() => {
    axiosCommon.get(`${url}/count?email=${email}`).then((res) => {
      // console.log(res.data);
      setCount(res.data.count);
    });
  }, [axiosCommon,url,email]);
  // console.log(count);
  

  return [numberOfPages,totalPage,itemsPerPage,count]
};

export default Pagination;
