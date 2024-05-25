import { useContext, useState } from "react";
import { FaGreaterThan } from "react-icons/fa6";
import { FaLessThan } from "react-icons/fa6";
import Cards from "../../components/card/Cards";
import { MainContext } from "../../components/auth-provider/AuthProvider";
import FaQ from "../../components/FAQ/FaQ";

const Home = () => {
  let [slide, setSlide] = useState(1);
  const {user} =useContext(MainContext)
  

  if (slide == 0) {
    setSlide(3);
  } else if (slide == 4) {
    setSlide(1);
  } else

    return (
      <div className=" mx-auto ">
        {/* banner */}
        <div
          className="min-h-screen bg-contain lg:bg-cover flex flex-col lg:flex-row justify-between  mb-5 "
          style={{
            backgroundImage:
              "url(https://cdn.pixabay.com/photo/2019/03/21/15/18/shop-4071232_1280.png)",
          }}
        >
          <div className="  flex min-h-svh w-full lg:w-1/2 items-center justify-center text-white bg-black bg-opacity-50 text-center lg:text-start">
            <div className="max-w-md">
              <h1 className="mb-5 text-2xl lg:text-5xl font-bold">
                WellCome To Our Gadget Shop
              </h1>
              <p className="mb-5">
                We&apos;re Selling Tech Gadgets Like Smartphones , Laptop ,
                Headset And etc.
              </p>
              <button   className="btn   btn-outline text-white outline-orange-200 font-black text-xl  ">
               <a href="#cards"> Shop Now!</a>
              </button>
            </div>
          </div>
          <div className="   bg-black bg-opacity-60 flex min-h-svh w-full lg:w-1/2 items-center justify-center  text-white flex-col gap-10 overflow-hidden">
            {(slide == 1 && (
              <div className=" pl-10 lg:pl-0 flex overflow-hidden gap-5  w-[500px]">
                <img
                  className=" h-[300px] lg:h-[400px] w-[300px] lg:w-[400px] rounded-lg border-2 border-yellow-500"
                  src="https://img.freepik.com/free-photo/modern-stationary-collection-arrangement_23-2149309643.jpg?t=st=1716564382~exp=1716567982~hmac=7e0cc938ceb79c1636c4da9713087f32bd313136ceee6c9342c63949f8141bc6&w=740"
                  alt=""
                />
                <img
                  className=" h-[300px] lg:h-[400px] w-[300px] lg:w-[400px] rounded-lg border-2 border-yellow-500"
                  src="https://i.pinimg.com/originals/7b/3f/e1/7b3fe1e66e263b7e0c0e1f1cfb4086c7.png"
                  alt=""
                />
                <img
                  className=" h-[300px] lg:h-[400px] w-[300px] lg:w-[400px] rounded-lg border-2 border-yellow-500"
                  src="https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt=""
                />
              </div>
            )) ||
              ""}
            {slide == 2 && (
              <div className=" pl-10 lg:pl-0 flex overflow-hidden gap-5  w-[500px]">
                <img
                  className=" h-[300px] lg:h-[400px] w-[300px] lg:w-[400px] rounded-lg border-2 border-yellow-500"
                  src="https://i.pinimg.com/originals/7b/3f/e1/7b3fe1e66e263b7e0c0e1f1cfb4086c7.png"
                  alt=""
                />
                <img
                  className=" h-[300px] lg:h-[400px] w-[300px] lg:w-[400px] rounded-lg border-2 border-yellow-500"
                  src="https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt=""
                />
                <img
                  className=" h-[300px] lg:h-[400px] w-[300px] lg:w-[400px] rounded-lg border-2 border-yellow-500"
                  src="https://img.freepik.com/free-photo/modern-stationary-collection-arrangement_23-2149309643.jpg?t=st=1716564382~exp=1716567982~hmac=7e0cc938ceb79c1636c4da9713087f32bd313136ceee6c9342c63949f8141bc6&w=740"
                  alt=""
                />
              </div>
            )}
            {slide == 3 && (
              <div className=" pl-10 lg:pl-0 flex overflow-hidden gap-5 w-[500px]">
                <img
                  className=" h-[300px] lg:h-[400px] w-[300px] lg:w-[400px] rounded-lg border-2 border-yellow-500"
                  src="https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt=""
                />
                <img
                  className=" h-[300px] lg:h-[400px] w-[300px] lg:w-[400px] rounded-lg border-2 border-yellow-500"
                  src="https://img.freepik.com/free-photo/modern-stationary-collection-arrangement_23-2149309643.jpg?t=st=1716564382~exp=1716567982~hmac=7e0cc938ceb79c1636c4da9713087f32bd313136ceee6c9342c63949f8141bc6&w=740"
                  alt=""
                />
                <img
                  className=" h-[300px] lg:h-[400px] w-[300px] lg:w-[400px] rounded-lg border-2 border-yellow-500"
                  src="https://i.pinimg.com/originals/7b/3f/e1/7b3fe1e66e263b7e0c0e1f1cfb4086c7.png"
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

        <section className=" container mx-auto my-5">
          <div className=" my-8 space-y-5">
            <h1 className=" text-2xl lg:text-5xl text-center font-bold">
              {" "}
              Check Out Our Gadgets{" "}
            </h1>
           
          </div>

          <div id="cards">
            <Cards
            ></Cards>
          </div>
        </section>


        {/* FaQ */}
        <div>
          <FaQ></FaQ>
        </div>
      </div>
    );
};

export default Home;
