/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import { Link, Navigate } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import useFetchCommon from "../../hooks/useFetchCommon";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useCart from "../../useCart/useCart";
import useFetch from "../../hooks/useFetch";
import AOS from 'aos';
import 'aos/dist/aos.css';


const Cards = () => {
  const {user} =useAuth()

  const axiosHook = useFetch()
  const userEmail = user?.email;
  const url = `/carts?email=${userEmail}`

   const [, refetch]=useCart()
  const handleCart=(cart)=>{
    const userCart = {
      cart,
      userEmail
    }
    if(!user){
      return <Navigate to={'/login'}></Navigate> 
    }
    if(user){
    axiosHook.post(url , userCart)
    .then(res=>{
      // console.log(refetch);
      if(res.data.insertedId){
        refetch()
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${cart.product_name} added in Cart Successfully`,
          showConfirmButton: false,
          timer: 1500
        });
      }
      if(res.data.message=='cart is full'){
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
  const [gadgets, setGadgets] = useState([]);
  const axiosCommon = useFetchCommon();
  useEffect(() => {
    axiosCommon.get("/gadgets").then((data) => setGadgets(data.data));
  }, [axiosCommon]);

  useEffect(()=>{
    AOS.init()
  },[])
  return (
    <div>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5  ">
        {gadgets?.slice(6, 12).map((data) => (
          <div
          data-aos="zoom-in-up" data-aos-delay="300"
    data-aos-duration="1000"
    data-aos-easing="ease-in-out"
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
                  <button className=" btn bg-[#046351] text-white border-l-4 border-b-4 border-[#2efed8]">View Details</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link to={'/allGadgets'} className=" flex justify-center my-5 ">
        <button className=" btn  text-xl  border-r-4 border-b-4 border-gray-700">See All</button>
      </Link>
    </div>
  );
};

export default Cards;
