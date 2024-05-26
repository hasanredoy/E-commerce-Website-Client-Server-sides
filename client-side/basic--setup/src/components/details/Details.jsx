import { FaStar } from "react-icons/fa6";
import { Link, useLoaderData } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Details = () => {
  const data =useLoaderData()
  const {handleCart}=useAuth()
  return (
    <div>
      <div className="card  border-none lg:border border-[#03fcce] bg-base-200  shadow-xl px-2  my-8 container mx-auto pt-5 flex flex-col lg:flex-row gap-5"
        >
          <div className="w-full lg:w-[30%]">
          <figure className=" bg-white  mx-auto">
            <img className=" mx-auto" src={data.image} alt="Shoes" />
          </figure>
          <h2 className="font-bold text-center text-xl mt-4">
            {data.product_name}
           
          </h2>
          </div>
          <div className="card-body w-full lg:w-[50%]
          ">
            <h3 className="text-2xl font-bold">{data.title}</h3>
            <p className=" font-bold text-lg">{data.company}</p>
            <p>
              {data.description}{" "}
              
            </p>

            <h4 className=" flex gap-5 py-5 text-xl items-center "> Rating : {data.rating} <FaStar className=" text-2xl text-yellow-400"></FaStar> </h4>
            <h4 className=" flex gap-5 text-xl items-center py-5 ">Price : <span className=" font-bold">{data.price} $</span> </h4>

            <div className="card-actions justify-between my-5">
              
            <button
                  className=" btn border-t-4 border-r-4 border-neutral-600"
                  onClick={() => handleCart(data)}
                >
                  Add to Cart
                </button>
              
            </div>
          </div>
        </div>
    </div>
  );
};

export default Details;