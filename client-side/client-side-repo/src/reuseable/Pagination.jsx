import useFetchCommon from "../hooks/useFetchCommon";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const Pagination = (url,itemsCount) => {
  // console.log(url);
  const {user} = useAuth()
  const email = user.email
  // count state
  // const [count, setCount] = useState(0);
const axiosCommon = useFetchCommon();

  const itemsPerPage = itemsCount; 
   // get reviews count
  const {data: count=0, refetch:reload}= useQuery({
    queryKey:['reviews count'],
    queryFn:async()=>{
      const res = await axiosCommon.get(`${url}/count?email=${email}`)
    console.log(res);
    return res.data?.count
    }
  })
  const totalPage = Math.ceil(count / itemsPerPage);
  let numberOfPages = [];
  // console.log(numberOfPages);
  for (let i = 0; i < totalPage; i++) {
    // console.log(i);
    numberOfPages.push(i);
  }

  // function for pagination

  
  // useEffect(() => {
  //   axiosCommon.get(`${url}/count?email=${email}`).then((res) => {
  //     // console.log(res.data);
  //     setCount(res.data.count);
  //   });
  // }, [axiosCommon,url,email,refetchCount]);
  // console.log(count);
  

  return [numberOfPages,totalPage,itemsPerPage,count,reload ]
};

export default Pagination;
