import { useQuery } from "@tanstack/react-query";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Heading from "../../reuseable/Heading";


const Testemonial = () => {
  const axiosHook = useFetch();

  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosHook.get("/reviews");
      return res.data;
    },
  });
  useEffect(()=>{
    AOS.init()
  },[])
  return (
    <div className=" w-full    ">
     <Heading description={'Hear what'} title={'Our client says'}></Heading>
      <div className="divider"></div>
      <div className=" grid grid-cols-1 md:grid-cols-2  gap-5 ">
        {reviews?.slice(4 - 8).map((review) => (
          <div
          data-aos="zoom-in-down" data-aos-delay="300"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
            key={review._id}
            className=" bg-base-200 hover:bg-base-300 hover:border border-[#08fefe] flex flex-col w-full  p-6 mx-auto divide-y rounded-md divide-gray-700 "
          >
            <div className="flex justify-between p-4">
              <div className="flex space-x-4">
                <div>
                  <img
                    src={review?.photo}
                    alt=""
                    className="object-cover w-12 h-12 rounded-full bg-gray-500"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-xl">{review?.name}</h4>
                  <h4 className="font-medium">
                    {review?.posting_time?.split("T")[0]}
                  </h4>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-yellow-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5 fill-current"
                >
                  <path d="M494,198.671a40.536,40.536,0,0,0-32.174-27.592L345.917,152.242,292.185,47.828a40.7,40.7,0,0,0-72.37,0L166.083,152.242,50.176,171.079a40.7,40.7,0,0,0-22.364,68.827l82.7,83.368-17.9,116.055a40.672,40.672,0,0,0,58.548,42.538L256,428.977l104.843,52.89a40.69,40.69,0,0,0,58.548-42.538l-17.9-116.055,82.7-83.368A40.538,40.538,0,0,0,494,198.671Zm-32.53,18.7L367.4,312.2l20.364,132.01a8.671,8.671,0,0,1-12.509,9.088L256,393.136,136.744,453.3a8.671,8.671,0,0,1-12.509-9.088L144.6,312.2,50.531,217.37a8.7,8.7,0,0,1,4.778-14.706L187.15,181.238,248.269,62.471a8.694,8.694,0,0,1,15.462,0L324.85,181.238l131.841,21.426A8.7,8.7,0,0,1,461.469,217.37Z"></path>
                </svg>
                <span className="text-xl font-bold">{review.star}</span>
              </div>
            </div>
            <div className="p-4 space-y-2 text-lg ">
              <p>{review?.review}</p>
            </div>
          </div>
        ))}
      </div>
      <Link className=" flex justify-center my-5" to={'/reviews'}>
      <button className="btn-primary">
        Hear More
      </button>
      </Link>
    </div>
  );
};

export default Testemonial;
