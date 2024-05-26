/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import useFetchCommon from "../../hooks/useFetchCommon";
import useAuth from "../../hooks/useAuth";

const Cards = () => {
  const handleCart =useAuth()
  const [gadgets, setGadgets] = useState([]);
  const axiosCommon = useFetchCommon();
  useEffect(() => {
    axiosCommon.get("/gadgets").then((data) => setGadgets(data.data));
  }, [axiosCommon]);

  return (
    <div>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5  ">
        {gadgets?.slice(6, 12).map((data) => (
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
