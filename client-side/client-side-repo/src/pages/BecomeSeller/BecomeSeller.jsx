import DynamicPageTitle from "../../reuseable/DynamicPageTitle";
import Heading from "../../reuseable/Heading";
import seller from "../../assets/seller-image.jpg";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const BecomeSeller = () => {
  // get user 
  const {user} = useAuth()
  // get use navigate hook 
  const navigate = useNavigate()
  const handleSellerReq =(e)=>{
    e.preventDefault()
  if(!user)navigate('/login')
  }

  return (
    <main className="  w-[95%] lg:w-[90%] mx-auto my-20">
      <DynamicPageTitle dynamicTitle={"Become Seller"}></DynamicPageTitle>
      <Heading description={"Start selling"} title={"In our Shop!"}></Heading>
      <section className=" flex gap-10 mt-10  flex-col lg:flex-row">
        <div className=" flex-1">
          <img src={seller} className=" w-full h-[400px]" alt="" />
        </div>
        <div  className="flex-1 bg-base-300 bg-opacity-50 p-5 ">
          <h2 className=" text-xl font-bold text-center  py-3  ">Please fill out the form to start selling. </h2>
        <form className=" " onSubmit={handleSellerReq}>
        {/* name  */}
        <div className="form-control mb-3">
              <label className="label">
                <span className=" text-base font-semibold ">Name*</span>
              </label>
              <input
                type="text"
                placeholder="Product Name"
                className="input input-bordered   focus:outline-sky-200"
                required
                name="name"
              />
            </div>
            {/* email  */}
            <div className="form-control mb-3">
              <label className="label">
                <span className=" text-base font-semibold ">Email*</span>
              </label>
              <input
                type="text"
                placeholder="Product Title"
                className="input input-bordered   focus:outline-sky-200"
                required
                name="title"
              />
            </div> 
       
          {/* description */}
          <div className="form-control col-span-2">
            <label className="label">
              <span className=" text-base font-semibold ">Tell us about your self*</span>
            </label>
            <textarea
              name="description"
              className="  textarea"
              placeholder="write about yourself"
              rows={5}
            ></textarea>
          </div>

          <div className="mt-6  w-full  col-span-2 flex justify-center">
            <button  className="btn-primary">Send Request</button>
          </div>
        </form></div>
      </section>
    </main>
  );
};

export default BecomeSeller;
