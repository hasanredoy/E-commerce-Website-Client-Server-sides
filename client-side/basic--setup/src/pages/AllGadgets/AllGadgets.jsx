import { Link } from "react-router-dom";
import useFetchCommon from "../../hooks/useFetchCommon";
import { useQuery } from "@tanstack/react-query";
import { FaGreaterThan, FaLessThan, FaStar } from "react-icons/fa6";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import banner from '../../assets/banner2.png'
import Discount from "../../components/Discount/Discount";
const AllGadgets = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const axiosCommon = useFetchCommon();
  const { handleCart, user } = useAuth();
  const [count, setCount] = useState();
  const [search, setSearch] = useState('');

  useEffect(() => {
    axiosCommon.get("/gadgets/count").then((res) => {
      // console.log(res);
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
  // console.log(numberOfPages);
  
  const { data: gadgets = [],refetch } = useQuery({
    queryKey: ["gadgets", itemsPerPage, currentPage,search],
    queryFn: async () => {
      const res = await axiosCommon.get(
        `/gadgets?size=${itemsPerPage}&page=${currentPage}&search=${search}`
      );
      // console.log(res);
      return res.data;
    },
  });
  console.log(gadgets);
  const handelSearch =(e)=>{
    e.preventDefault()
    refetch()
    setSearch(e.target.search.value)
    setCount(gadgets.length)
  }
  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < totalPage - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  // console.log(currentPage);
  return (
    <div className="mb-10 overflow-hidden">
      {/* banner  */}
      <div
        className="hero bg-cover min-h-[500px] mb-20"
        style={{
          backgroundImage:
            `url(${banner})`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-white ">
          <div className="max-w-xl">
            <h1 className=" mb-5 text-3xl md:text-5xl font-bold">
              {" "}
              Hi{" "}
              <span className=" bg-gradient-to-r  bg-clip-text text-transparent from-[#03caa6]  to-[#5df7db]">
                {user?.displayName}
              </span>
              !! Wanna Buy Something..
            </h1>
            <p className="mb-5  ">
              Check Our Latest Gadgets , We Guarantee You will Be Satisfied
              after buying our SmartPhones , Laptops , Tablets , Watches ,
              Headset and etc., you will Find best quality and quantity in our
              Product...
            </p>
            <form onSubmit={handelSearch} >
              <label className=" text-black bg-white input flex items-center justify-between relative">
                <input name="search" type="text" className="grow " placeholder="Search" />
               <div className=" absolute left-auto -right-0.5">
               <button className=" rounded-l-none btn border-0 text-white bg-[#046351]">
                  Search
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 text-black"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
                </button>
               </div>
              </label>
            </form>
          </div>
        </div>
      </div>

    {/* discount  */}
    <div>
      <Discount discount={50}></Discount>
    </div>

  {/* cards */}
      <div className="  container mx-auto  grid grid-cols-1 lg:grid-cols-3 gap-5   ">
        {gadgets?.map((data) => (
          <div
            key={data.id}
            className="card w-[98%] mx-auto lg:w-auto   to-base-300  shadow-lg px-2 bg-base-200  hover:scale-100 lg:hover:scale-105   hover:border-0 lg:hover:border-2  hover:border-orange-400"
          >
            <h2 className="font-bold text-center text-xl mt-2">
              {data.product_name}
              
            </h2>
            <div className="divider"></div>
            <figure className=" bg-white px-2 w-full">
              <img className=" h-[200px]" src={data.image} alt="Shoes" />
            </figure>
            <div className="card-body">
              <h3 className="text-lg font-semibold">{data.title}</h3>
              <p className=" font-bold">{data.company}</p>
              <p>
                {data.description.slice(0, 60)}{" "}
                <Link to={data?._id} className=" pl-2 font-bold text-blue-700">
                  Read More...
                </Link>
              </p>

              <h4 className=" flex gap-5 text-xl items-center ">
                {data.rating}{" "}
                <FaStar className=" text-2xl text-yellow-400"></FaStar>{" "}
              </h4>
              <h4 className=" flex gap-5 text-xl items-center py-5 ">
                Price : <span className=" font-bold">{data.price} $</span>{" "}
              </h4>
              <div className="card-actions justify-between my-5">
                <button
                  className=" btn border-t-4 border-r-4 border-neutral-600"
                  onClick={() => handleCart(data)}
                >
                  Add to Cart
                </button>
                <Link to={`/item/${data._id || ""}`}>
                  <button className=" btn btn-info border-b-4 border-neutral-800">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className=" flex justify-center gap-5 my-5">
        <button onClick={handlePrev} className=" btn">
          <FaLessThan></FaLessThan>
        </button>
        {numberOfPages.map((page) => (
          <button
            onClick={() => setCurrentPage(page)}
            className={` btn ${
              currentPage === page && "btn-warning text-white font-bold "
            } `}
            key={page}
          >
            {page + 1}
          </button>
        ))}
        <button onClick={handleNext} className=" btn">
          <FaGreaterThan></FaGreaterThan>
        </button>
      </div>
    </div>
  );
};

export default AllGadgets;
