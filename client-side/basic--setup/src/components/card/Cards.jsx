import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa6";

const Cards = () => {
  const [gadgets, setGadgets] = useState([]);
  const [filterGadgets, setFilterGadgets] = useState([]);
  const [themeFromLs , setThemeForLs] = useState()
  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setGadgets(data));
      
      setFilterGadgets(gadgets)
  }, []);
  useEffect(()=>{
   const theme = localStorage.getItem('theme')
   setThemeForLs(theme)
  },[])
console.log(themeFromLs);
  // console.log(filterGadgets);
  const handleFilter=(data)=>{
   if(data=="all"){
     setFilterGadgets(gadgets)
   }
   if(data=="mobiles"){
   
     setFilterGadgets( gadgets.filter(item => item?.category.includes("Smartphones")))
   }
   if(data=="laptop"){
    setFilterGadgets( gadgets.filter(item => item?.category.includes("Laptops")))
  }
  if(data=="watch"){
     setFilterGadgets( gadgets.filter(item => item?.category.includes("Smartwatches")))
     
    }
    if(data=="headset"){
     setFilterGadgets( gadgets.filter(item => item?.category.includes("Headphones")))
    
     
   }

  }
if(!themeFromLs){

  console.log('filterGadgets');
}
  return (
    <div>
       <div className="dropdown dropdown-hover mb-5">
              <div tabIndex={0} role="button" className="btn m-1 bg-[#461b1a] text-white">
                Filter
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a onClick={()=>handleFilter('all')}>All</a>
                </li>
                <li>
                  <a   onClick={()=>handleFilter('mobiles')}>Smart Phones</a>
                </li>
                <li>
                  <a  onClick={()=>handleFilter('laptop')}>Laptop</a>
                </li>
                <li>
                  <a  onClick={()=>handleFilter('watch')}>Watches</a>
                </li>
                <li>
                  <a  onClick={()=>handleFilter('headset')}>Headset</a>
                </li>
              </ul>
            </div>
      <div className=" grid grid-cols-1 lg:grid-cols-3 gap-5  ">
      {filterGadgets.length>1?filterGadgets.map((data) => (
        <div
          key={data.id}
          className={"card w-[98%] mx-auto lg:w-auto   to-base-300  shadow-lg px-2   hover:scale-0 lg:hover:scale-105 bg-base-200  hover:border-0 lg:hover:border-2  hover:border-orange-400"
          }
        >
          <h2 className="font-bold text-center text-xl mt-2">
            {data.product_name}
            {data.new === "true" && (
              <div className="badge badge-accent ml-1">NEW</div>
            )}
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
              <Link className=" pl-2 font-bold text-blue-700">
                Read More...
              </Link>
            </p>

            <h4 className=" flex gap-5 text-xl items-center ">{data.rating} <FaStar className=" text-2xl text-yellow-400"></FaStar> </h4>
            <h4 className=" flex gap-5 text-xl items-center py-5 ">Price : <span className=" font-bold">{data.price} $</span> </h4>
            <div className="card-actions justify-between my-5">
              
              <button className=" btn btn-error">Add to Cart</button>
             <Link to={`/item/${data.id||''}`}>
             <button className=" btn btn-info">View Details</button>
             </Link>
            </div>
          </div>
        </div>
      ))
      :
      gadgets.map((data) => (
        <div
          key={data.id}
          className="card w-[98%] mx-auto lg:w-auto   to-base-300  shadow-lg px-2 bg-base-200  hover:scale-0 lg:hover:scale-105   hover:border-0 lg:hover:border-2  hover:border-orange-400"
        >
          <h2 className="font-bold text-center text-xl mt-2">
            {data.product_name}
            {data.new === "true" && (
              <div className="badge badge-accent ml-1">NEW</div>
            )}
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
              <Link className=" pl-2 font-bold text-blue-700">
                Read More...
              </Link>
            </p>

            <h4 className=" flex gap-5 text-xl items-center ">{data.rating} <FaStar className=" text-2xl text-yellow-400"></FaStar> </h4>
            <h4 className=" flex gap-5 text-xl items-center py-5 ">Price : <span className=" font-bold">{data.price} $</span> </h4>
            <div className="card-actions justify-between my-5">
              
              <button className=" btn btn-error">Add to Cart</button>
              <Link to={`/item/${data.id||''}`}>
             <button className=" btn btn-info">View Details</button>
             </Link>
            </div>
          </div>
        </div>
      ))
      }
    </div>
    </div>
  );
};

export default Cards;
