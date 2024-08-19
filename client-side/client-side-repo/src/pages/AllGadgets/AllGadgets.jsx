import { Link, Navigate } from "react-router-dom";
import useFetchCommon from "../../hooks/useFetchCommon";
import { useQuery } from "@tanstack/react-query";
import { FaGreaterThan, FaLessThan, FaStar } from "react-icons/fa6";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import banner from '../../assets/24644656_Mobile phone accessories cartoon illustration set.jpg'
import Discount from "../../components/Discount/Discount";
import useFetch from "../../hooks/useFetch";
import useCart from "../../useCart/useCart";
import Swal from "sweetalert2";
import DynamicPageTitle from "../../reuseable/DynamicPageTitle";
import LoadingSpinner from "../../reuseable/LoadingSpinner";
import AOS from 'aos';
import 'aos/dist/aos.css';


const AllGadgets = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const axiosCommon = useFetchCommon();
  const { user } = useAuth();
  const [count, setCount] = useState();
  const [search, setSearch] = useState('');
  const axiosHook = useFetch()
  const userEmail = user?.email;
  const url = `/carts?email=${userEmail}`
  const [, feds]=useCart()
  const handleCart=(cart)=>{
    const userCart = {
      cart,
      userEmail
    }
    if(!user){
      return <Navigate to={'/login'}></Navigate> 
    }
    if(userEmail){
    axiosHook.post(url , userCart)
    .then(res=>{
      // console.log(refetch);
      if(res.data.insertedId){
        feds()
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${cart.product_name} added in Cart Successfully`,
          showConfirmButton: false,
          timer: 1500
        });
      }
      if(res.data.message=='cart is full'){
        feds()
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `Cart is full`,
          showConfirmButton: false,
          timer: 1000
        });
      }
    })
    .catch(err => console.log(err)
    )
  }
 } 


  useEffect(() => {
    axiosCommon.get("/gadgets/count").then((res) => {
      // console.log(res);
      setCount(res.data.count);
    });
  }, [axiosCommon]);
  const itemsPerPage = 6;
  const totalPage = Math.ceil(count / itemsPerPage);
  // console.log(totalPage);
  let numberOfPages = [];
  for (let i = 0; i < totalPage; i++) {
    // console.log(i);
    numberOfPages.push(i);
  }
  // console.log(numberOfPages);
  
  const { data: gadgets = [],refetch,isFetching } = useQuery({
    queryKey: ["gadgets", itemsPerPage, currentPage,search],
    queryFn: async () => {
      const res = await axiosCommon.get(
        `/gadgets?size=${itemsPerPage}&page=${currentPage}&search=${search}`
      );
      // console.log(res);
      return res.data;
    },
  });
  // console.log(gadgets);
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
  useEffect(()=>{
    AOS.init()
  },[])
  return (
    <div className="mb-10 overflow-hidden">
      <DynamicPageTitle dynamicTitle={"All Gadgets"}></DynamicPageTitle>
      {/* banner  */}
      <div
        className="hero bg-cover min-h-[500px] mb-20"
        style={{
          backgroundImage:
            `url(${banner})`,
        }}
      >
        <div className="hero-overlay bg-opacity-60 bg-black bg-cover"></div>
        <div className="hero-content text-center text-white ">
          <div className="max-w-xl">
            <h1 className=" mb-5 text-2xl md:text-3xl  font-bold">
              {" "}
              Hi{" "}
              <span className=" bg-gradient-to-r  bg-clip-text text-transparent from-[#03caa6]  to-[#5df7db]">
                {user?.displayName?user.displayName:'Welcome Back'}
              </span>
              !! Wanna Buy Something..
            </h1>
            <p className="mb-5 text-sm md:text-base  ">
              Check Our Latest Gadgets , We Guarantee You will Be Satisfied
              after buying our SmartPhones, Laptops, Tablets, Watches,
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
                  className="w-6 h-6 text-white"
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
  {isFetching&&<LoadingSpinner></LoadingSpinner>}
      <div className=" w-[95%] lg:w-[90%] mx-auto my-10  grid grid-cols-1 lg:grid-cols-3 gap-8   ">
        {gadgets?.map((data) => (
          <div
          data-aos="zoom-in-up" data-aos-delay="300"
          data-aos-duration="1500"
          data-aos-easing="ease-in-out"
            key={data.id}
            className="card   to-base-300  shadow-lg px-2 bg-base-200  hover:scale-100 lg:hover:scale-105   hover:border-0 lg:hover:border-2  hover:border-orange-400"
          >
            <h2 className="font-bold text-center text-base lg:text-lg mt-2">
              {data.product_name}
              
            </h2>
            <div className="divider"></div>
            <figure className=" bg-white px-2 w-full">
              <img className=" h-[200px]" src={data.image} alt="Shoes" />
            </figure>
            <div className="card-body">
              <h3 className="text-base lg:text-lg font-semibold">{data.title}</h3>
              <p className="">{data.company}</p>
              <p className=" text-sm">
                {data.description.slice(0, 60)}{" "}
                <Link to={data?._id} className=" pl-2 font-semibold text-blue-700">
                  Read More...
                </Link>
              </p>

              <h4 className=" flex gap-2 text-sm lg:text-base items-center ">
              <span className="  space-x-2">  Rating:{" "}{" "}
              {data.rating}</span>
                <FaStar className=" text-xl text-yellow-400"></FaStar>{" "}
              </h4>
              <h4 className=" flex gap-5 text-sm  lg:text-base items-center py-2 ">
                Price : <span className=" font-semibold">{data.price} $</span>{" "}
              </h4>
              <div className="card-actions justify-between my-2">
                <button
                  className=" btn-secondary"
                  onClick={() => handleCart(data)}
                >
                  Add to Cart
                </button>
                <Link to={`/item/${data._id || ""}`}>
                  <button className=" btn-primary  ">
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
