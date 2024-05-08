import { useState } from "react";
import { FaGreaterThan } from "react-icons/fa6";
import { FaLessThan } from "react-icons/fa6";
import Cards from "../../components/card/Cards";
const Home = () => {
  let [slide, setSlide] = useState(1);

  if (slide == 0) {
    setSlide(3);
  } else if (slide == 4) {
    setSlide(1);
  } else
    return (
      <div className=" container mx-auto ">
        {/* banner */}
        <div
          className="min-h-screen bg-contain lg:bg-cover flex flex-col lg:flex-row justify-between lg:rounded-2xl my-5 "
          style={{
            backgroundImage:
              "url(https://cdn.pixabay.com/photo/2019/03/21/15/18/shop-4071232_1280.png)",
          }}
        >
          <div className=" lg:rounded-l-2xl flex min-h-svh w-full lg:w-1/2 items-center justify-center text-white bg-black bg-opacity-50 text-center lg:text-start">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">
                WellCome To Our Gadget Shop
              </h1>
              <p className="mb-5">
                We&apos;re Selling Tech Gadgets Like Smartphones , Laptop ,
                Headset And etc.
              </p>
              <button className="btn border-none text-white hover:text-black bg-[#ab3434]">
                Shop Now!
              </button>
            </div>
          </div>
          <div className="  lg:rounded-r-2xl bg-black bg-opacity-60 flex min-h-svh w-full lg:w-1/2 items-center justify-center  text-white flex-col gap-10 overflow-hidden">
            {(slide == 1 && (
              <div className=" pl-5 lg:pl-0 flex overflow-hidden gap-5  w-[500px]">
                <img
                  className=" h-[300px] w-[300px] rounded-lg border-2 border-yellow-500"
                  src="https://cdn.pixabay.com/photo/2018/03/06/08/31/drone-3202860_640.jpg"
                  alt=""
                />
                <img
                  className=" h-[300px] w-[300px] rounded-lg border-2 border-yellow-500"
                  src="https://cdn.pixabay.com/photo/2016/03/26/13/09/laptop-1280536_640.jpg"
                  alt=""
                />
                <img
                  className=" h-[300px] w-[300px] rounded-lg border-2 border-yellow-500"
                  src="https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt=""
                />
              </div>
            )) ||
              ""}
            {slide == 2 && (
              <div className=" pl-5 lg:pl-0 flex overflow-hidden gap-5  w-[500px]">
                <img
                  className=" h-[300px] w-[300px] rounded-lg border-2 border-yellow-500"
                  src="https://cdn.pixabay.com/photo/2016/03/26/13/09/laptop-1280536_640.jpg"
                  alt=""
                />
                <img
                  className=" h-[300px] w-[300px] rounded-lg border-2 border-yellow-500"
                  src="https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt=""
                />
                <img
                  className=" h-[300px] w-[300px] rounded-lg border-2 border-yellow-500"
                  src="https://cdn.pixabay.com/photo/2018/03/06/08/31/drone-3202860_640.jpg"
                  alt=""
                />
              </div>
            )}
            {slide == 3 && (
              <div className=" pl-5 lg:pl-0 flex overflow-hidden gap-5 w-[500px]">
                <img
                  className=" h-[300px] w-[300px] rounded-lg border-2 border-yellow-500"
                  src="https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt=""
                />
                <img
                  className=" h-[300px] w-[300px] rounded-lg border-2 border-yellow-500"
                  src="https://cdn.pixabay.com/photo/2018/03/06/08/31/drone-3202860_640.jpg"
                  alt=""
                />
                <img
                  className=" h-[300px] w-[300px] rounded-lg border-2 border-yellow-500"
                  src="https://cdn.pixabay.com/photo/2016/03/26/13/09/laptop-1280536_640.jpg"
                  alt=""
                />
              </div>
            )}
            <div className=" flex gap-10 z-50 ">
              <button
                onClick={() => setSlide(slide - 1)}
                className=" text-5xl hover:text-5xl 
            text-[#f44242] hover:bg-white p-5 hover:rounded-full"
              >
                <FaLessThan></FaLessThan>
              </button>

              <button
                onClick={() => setSlide(slide + 1)}
                className=" text-5xl hover:text-5xl 
            text-[#f44242] hover:bg-white p-5 hover:rounded-full"
              >
                <FaGreaterThan></FaGreaterThan>
              </button>
            </div>
          </div>
        </div>

        {/* card  */}

        <section className=" my-5">
          <div className=" my-8 space-y-5">
            <h1 className=" text-2xl lg:text-5xl text-center font-bold">
              {" "}
              Check Out Our Gadgets{" "}
            </h1>
           
          </div>

          <div>
            <Cards></Cards>
          </div>
        </section>
      </div>
    );
};

export default Home;
