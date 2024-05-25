import { FaStar } from "react-icons/fa6";
import { Link, useLoaderData } from "react-router-dom";

const Details = () => {
  const data =useLoaderData()
  console.log(data);
  return (
    <div>
      <div
          key={data.id}
          className="card  bg-[#37373752] bg-opacity-70 shadow-lg px-2 text-black my-8 container mx-auto pt-5"
        >
          <figure className=" bg-white px-2 w-1/2 mx-auto">
            <img className=" h-[400px] mx-auto" src={data.image} alt="Shoes" />
          </figure>
          <h2 className="font-bold text-center text-xl mt-4">
            {data.product_name}
            {data.new === "true" && (
              <div className="badge badge-accent ml-1">NEW</div>
            )}
          </h2>
            <div className="divider"></div>
          <div className="card-body">
            <h3 className="text-2xl font-bold">{data.title}</h3>
            <p className=" font-bold text-lg">{data.company}</p>
            <p>
              {data.description}{" "}
              
            </p>

            <h4 className=" flex gap-5 py-5 text-xl items-center "> Rating : {data.rating} <FaStar className=" text-2xl text-yellow-400"></FaStar> </h4>
            <h4 className=" flex gap-5 text-xl items-center py-5 ">Price : <span className=" font-bold">{data.price} $</span> </h4>

            <div className="card-actions justify-between my-5">
              
              <button className=" btn btn-error">Add to Cart</button>
              <Link to={`/`}>
             <button className=" btn btn-info">Buy Now !</button>
             </Link>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Details;