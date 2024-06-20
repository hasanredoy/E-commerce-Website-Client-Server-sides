import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useFetch from "../../../../hooks/useFetch";
import usePostImage from "../../../../hooks/usePostImage";
import { useState } from "react";

const AddItem = () => {
  const axiosHook = useFetch();
  const { user } = useAuth();
  //  function for adding gadget
  const [image , setImage]=useState([])
 console.log(image);
  const imageUrl =  usePostImage(image)
  console.log(imageUrl);
  const handleAddItem = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const title = form.title.value;
    const category = form.category.value;
    const price = form.price.value;
    const rating = form.rating.value;
    const company = form.company.value;
    const description = form.description.value;



    // collecting all data in object for posting 
    const itemData = {
      category,
      company,
      description,
      price,
      product_name: name,
      rating,
      title,
      image:imageUrl,
      seller_email: user?.email,
      seller_name: user?.displayName,
    };
    // console.log(itemData);
// posting gadget data in db 
if(imageUrl){
 axiosHook.post(`/add-gadgets`, itemData).then((res) => {
      console.log(res.data);
      if (res.data?.insertedId ) {
        Swal.fire({
          title: `${name} added successfully`,
          icon: "success",
        });
      }
    });
}
   
  };
  return (
    <div className=" bg-base-200 rounded-xl  p-5 lg:p-10  shadow-lg ">
      <div className=" flex justify-end"></div>
      <h1 className=" text-lg md:text-2xl font-bold text-center mb-5">
        Please Fill Item Info Blew.
      </h1>

      <form
        className=" grid grid-cols-1 lg:grid-cols-2 gap-4"
        onSubmit={handleAddItem}
      >
        {/* name  */}
        <div className="form-control">
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
        <div className="form-control">
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
        {/* price  */}
        <div className="form-control">
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
           onChange={(e)=>setImage(e.target.files[0])}
            type="file"
            
            required
            name="image"
          />
        </div>
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
          <button className="btn border-0  bg-[#17a774] text-white font-bold text-lg">
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
