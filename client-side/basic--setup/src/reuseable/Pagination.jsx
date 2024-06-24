import { useEffect, useState } from "react";
import useFetchCommon from "../hooks/useFetchCommon";

const Pagination = () => {
  // count state
  const [count, setCount] = useState(0);

  const axiosCommon = useFetchCommon();

  // function for pagination
  // get reviews collection
  useEffect(() => {
    axiosCommon.get("/reviews/count").then((res) => {
      console.log(res);
      setCount(res.data.count);
    });
  }, [axiosCommon]);
  const itemsPerPage = 6;
  const totalPage = Math.ceil(count / itemsPerPage);
  console.log(totalPage);
  let numberOfPages = [];
  for (let i = 0; i < totalPage; i++) {
    // console.log(i);
    numberOfPages.push(i);
  }

  return [numberOfPages,totalPage,itemsPerPage]
};

export default Pagination;
