import DynamicPageTitle from "../../reuseable/DynamicPageTitle";
import Heading from "../../reuseable/Heading";
import seller from "../../assets/seller-image.png";

const BecomeSeller = () => {

  const handleSellerReq =()=>{}

  return (
    <main className="  w-[95%] lg:w-[90%] mx-auto my-20">
      <DynamicPageTitle dynamicTitle={"Become Seller"}></DynamicPageTitle>
      <Heading description={"Start selling"} title={"In our Shop!"}></Heading>
      <section>
        <div>
          <img src={seller} className=" w-full h-[400px]" alt="" />
        </div>
        <div></div>{" "}
        <form className=" " onSubmit={handleSellerReq}>
          {/* section for name and title  */}
          <section className=" flex w-full flex-col gap-5 lg:flex-row">
            {/* name  */}
            <div className="form-control flex-1">
              <label className="label">
                <span className=" text-base md:text-lg ">Product Name</span>
              </label>
              <input
                // defaultValue={product_name}
                type="text"
                placeholder="Product Name"
                className="input input-bordered bg-white text-black focus:outline-sky-200"
                required
                name="name"
              />
            </div>
            {/* title  */}
            <div className="form-control  flex-1">
              <label className="label">
                <span className=" text-base md:text-lg ">Product Title</span>
              </label>
              <input
                // defaultValue={title}
                type="text"
                placeholder="Product Title"
                className="input input-bordered bg-white text-black focus:outline-sky-200"
                required
                name="title"
              />
            </div>
          </section>
          {/* section for price and image  */}
          <section className=" flex w-full flex-col gap-5 lg:flex-row">
            {/* price  */}
            <div className="form-control flex-1">
              <label className="label">
                <span className=" text-base md:text-lg ">Price</span>
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
            {/* image */}
            <div className="form-control">
              <label className="label">
                <span className=" text-base md:text-lg ">Image URL</span>
              </label>
              <input
                // defaultValue={image}
                type="file"
                required
                name="image"
              />
            </div>
          </section>
          {/* category */}
          <div className="form-control">
            <label className="label">
              <span className=" text-base md:text-lg ">Product Category</span>
            </label>
            <input
              type="text"
              // defaultValue={category}

              placeholder="Product Category"
              className="input input-bordered bg-white text-black focus:outline-sky-200"
              required
              name="category"
            />
          </div>
          {/* rating */}
          <div className="form-control">
            <label className="label">
              <span className=" text-base md:text-lg ">Rating</span>
            </label>
            <input
              // defaultValue={rating}

              type="text"
              placeholder="Rating"
              className="input input-bordered bg-white text-black focus:outline-sky-200"
              required
              name="rating"
            />
          </div>
          {/* company */}
          <div className="form-control col-span-2">
            <label className="label">
              <span className=" text-base md:text-lg ">Company</span>
            </label>
            <input
              type="text"
              placeholder="Company"
              className="input input-bordered bg-white text-black focus:outline-sky-200"
              required
              name="company"
            />
          </div>

          {/* description */}
          <div className="form-control col-span-2">
            <label className="label">
              <span className=" text-base md:text-lg ">Description</span>
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
        </form>
      </section>
    </main>
  );
};

export default BecomeSeller;
