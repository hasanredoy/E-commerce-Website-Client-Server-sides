import { useEffect, useState } from "react";
import useFetchCommon from "../hooks/useFetchCommon";

const Pagination = (url) => {
  // console.log(url);
  // count state
  const [count, setCount] = useState(0);

  const axiosCommon = useFetchCommon();

  // function for pagination
  // get reviews collection
  useEffect(() => {
    axiosCommon.get(`${url}/count`).then((res) => {
      console.log(res.data);
      setCount(res.data.count);
    });
  }, [axiosCommon,url]);
  console.log(count);
  const itemsPerPage = 6;
  const totalPage = Math.ceil(count / itemsPerPage);
  let numberOfPages = [];
  console.log(numberOfPages);
  for (let i = 0; i < totalPage; i++) {
    // console.log(i);
    numberOfPages.push(i);
  }

  return [numberOfPages,totalPage,itemsPerPage]
};

export default Pagination;
