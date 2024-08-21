import DynamicPageTitle from "../../reuseable/DynamicPageTitle";
import Heading from "../../reuseable/Heading";
import seller from "../../assets/seller-image.jpg";

const BecomeSeller = () => {

  const handleSellerReq =()=>{}

  return (
    <main className="  w-[95%] lg:w-[90%] mx-auto my-20">
      <DynamicPageTitle dynamicTitle={"Become Seller"}></DynamicPageTitle>
      <Heading description={"Start selling"} title={"In our Shop!"}></Heading>
      <section className=" flex gap-10  flex-col lg:flex-row">
        <div className=" flex-1">
          <img src={seller} className=" w-full h-[400px]" alt="" />
        </div>
        <div  className="flex-1 bg-base-300 bg-opacity-50 p-5 ">
          <h2 className=" text-xl font-bold text-center  py-3  ">Please fill out the form to start selling. </h2>
        <form className=" " onSubmit={handleSellerReq}>
        {/* name  */}
        <div className="form-control flex-1">
              <label className="label">
                <span className=" text-base font-semibold ">Name*</span>
              </label>
              <input
                type="text"
                placeholder="Product Name"
                className="input input-bordered bg-white text-black focus:outline-sky-200"
                required
                name="name"
              />
            </div>
            {/* email  */}
            <div className="form-control  flex-1">
              <label className="label">
                <span className=" text-base font-semibold ">Email*</span>
              </label>
              <input
                type="text"
                placeholder="Product Title"
                className="input input-bordered bg-white text-black focus:outline-sky-200"
                required
                name="title"
              />
            </div>     {/* price  */}
            <div className="form-control flex-1">
              <label className="label">
                <span className=" text-base font-semibold ">Price</span>
              </label>
              <input
                // defaultValue={price}

                type="text"
                placeholder="Price"
                className="input input-bordered bg-white text-black focus:outline-sky-200"
                required
                name="price"
              />
            </div>
       
          {/* description */}
          <div className="form-control col-span-2">
            <label className="label">
              <span className=" text-base font-semibold ">Description</span>
            </label>
            <textarea
              name="description"
              className=" bg-white text-black textarea"
              rows={5}
            ></textarea>
          </div>

          <div className="mt-6  w-full  col-span-2 flex justify-center">
            <button className="btn-primary">Add Item</button>
          </div>
        </form></div>
      </section>
    </main>
  );
};

export default BecomeSeller;
