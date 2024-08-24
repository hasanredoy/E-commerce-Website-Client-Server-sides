import useAuth from "../../hooks/useAuth";
import useFetch from "../../hooks/useFetch";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
// import react star rating
import ReactStars from "react-rating-stars-component";

import './review.css'
import {  useEffect, useState } from "react";

import moment from 'moment'
import DynamicPageTitle from "../../reuseable/DynamicPageTitle";
import Pagination from "../../reuseable/Pagination";
import PaginationDiv from "../../reuseable/PaginationDiv";
import LoadingSpinner from "../../reuseable/LoadingSpinner";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Heading from "../../reuseable/Heading";
import { FaTrashAlt } from "react-icons/fa";




const ReviewsPage = () => {
  const axiosHook = useFetch();
  const { user } = useAuth();

  // rating state 
  const [rating , setRating]=useState(0)



  useEffect(()=>{
    AOS.init()
  },[])
  // current page state 
  const [currentPage, setCurrentPage] = useState(0);



   const [numberOfPages , totalPage,itemsPerPage,,reload] =Pagination("/reviews",6)
  //  console.log(numberOfPages);

  // getting review data from db using tanstack
  const { data: reviews = [], refetch,isPending } = useQuery({
    queryKey: ["reviews",currentPage],
    queryFn: async () => {
      const res = await axiosHook.get(`/reviews?page=${currentPage}&size=${itemsPerPage}`);
      return res.data;
    },
  });

  const handleDeleteUserReview = async()=>{
    const {data} = await axiosHook.delete(`/users/${user?.email}`)
    // console.log(data);
    if(data.deletedCount>0){

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Your review has been removed..`,
        showConfirmButton: false,
        timer: 1500,
      });      
      refetch()
      reload()
    }
  }
  
  // console.log(reviews);
  // value of rating
  const ratingChanged = (newRating) => {
    // console.log(newRating);
    setRating(newRating)
  };
// console.log(rating);
  // posting rating in db
  const handleRating = (e) => {
    e.preventDefault();
    const review = e.target.review.value;
    const userReview = {
      star:rating,
      review,
      posting_time: new Date(),
      photo: user?.photoURL,
      name: user?.displayName,
      email: user?.email,
    };

    axiosHook
      .post("/reviews", userReview)
      .then((res) => {
        // console.log(res.data);

        if (res.data.insertedId) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Thank You for You're Co-operation`,
            showConfirmButton: false,
            timer: 1500,
          });
          reload()

        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if(isPending){
    return <LoadingSpinner></LoadingSpinner>
  }

 
  return (
    <div className="flex flex-col-reverse justify-between md:flex-row  w-[95%] lg:w-[90%] mx-auto my-10 ">
      <DynamicPageTitle dynamicTitle={"Reviews"}></DynamicPageTitle>
      <div className=" w-full md:w-[70%] mt-0 mb-10   md:mt-10  ">
        <Heading description={'Hear '} title={'About Us!'}></Heading>
     
        <div className="divider"></div>
        <div className=" grid grid-cols-1 md:grid-cols-2  gap-5">
          {reviews?.map((review) => (
            <div
            data-aos="zoom-in-down" data-aos-delay="300"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
              key={review?._id}
              className=" relative container bg-base-200 hover:bg-base-300 hover:border border-[#08fefe] flex flex-col w-full max-w-lg p-6 mx-auto  rounded-md "
            >
              {user.email==review?.email&&<button title="delete your review" onClick={handleDeleteUserReview} className=" absolute p-1 top-1 right-1 cursor-pointer text-xl text-red-600"><FaTrashAlt></FaTrashAlt></button>}
              
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
                    <h4 className="font-bold text-base lg:text-lg">{review?.name}</h4>
                    <h4 className="font-medium text-sm text-green-500">
                      {moment(review?.posting_time).startOf().fromNow()}
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
              <div className="divider"></div>
              <div className="p-4 px-8 space-y-2 text-lg ">
                <p>{review?.review}</p>
              </div>
            </div>
          ))}
          
        </div>
       
       {
        <PaginationDiv   numberOfPages={numberOfPages} currentPage={currentPage} setCurrentPage={setCurrentPage} totalPage={totalPage}></PaginationDiv>}
      </div>
      <div className="divider lg:hidden"></div>
      <div className=" mt-10">
        <div className="flex flex-col max-w-xl bg-base-200 p-5 shadow-sm rounded-xl lg:p-8 ">
          <div className="flex flex-col items-center w-full">
            <h2 className=" text-lg lg:text-xl font-bold text-center">
              Please Leave Your opinion!
            </h2>
            <div className="flex flex-col items-center py-6 space-y-3">
              <span className="text-center text-sm lg:text-base">
                How was your experience?
              </span>
            </div>
            {/* react stars  */}
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={60}
              isHalf={true}
              emptyIcon={<i className="far fa-star"></i>}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              activeColor="#ffd700"
            />
            <form onSubmit={handleRating} className="flex flex-col w-full">
              
              <textarea
                name="review"
                required
                minLength={20}
                maxLength={5000}
                rows="3"
                placeholder="Message..."
                className="p-4 rounded-md resize-none "
              ></textarea>
     <div className=" flex justify-center my-5">
     <button
                type="submit"
                className="btn-primary"
              >
                Leave feedback
              </button>
     </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;
