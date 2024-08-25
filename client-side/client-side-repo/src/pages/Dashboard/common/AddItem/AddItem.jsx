import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useFetch from "../../../../hooks/useFetch";
import usePostImage from "../../../../hooks/usePostImage";
import { useState } from "react";
import useUserListedGadgets from "../../../../hooks/useUserListedGadgets";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../../../reuseable/LoadingSpinner";
import { FaX } from "react-icons/fa6";
import DynamicPageTitle from "../../../../reuseable/DynamicPageTitle";
import Heading from "../../../../reuseable/Heading";

const AddItem = () => {
  const axiosHook = useFetch();
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);

  // get specific gadget for users
  const [gadgets,refetch,isPending] = useUserListedGadgets();
  // console.log(gadgets);

  //  function for adding gadget
  const [image, setImage] = useState([]);
  //  posting image
  const imageUrl = usePostImage(image);

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
    const parseFloatPrice =  parseInt(price)
    // collecting all data in object for posting
    const itemData = {
      category,
      company,
      description,
      price:parseFloatPrice,
      product_name: name,
      rating,
      title,
      image: imageUrl,
      seller_email: user?.email,
      seller_name: user?.displayName,
    };
    // console.log(itemData);
    // posting gadget data in db
    if (imageUrl) {
      axiosHook.post(`/add-gadgets`, itemData).then((res) => {
        // console.log(res.data);
        if (res.data?.insertedId) {
          setShowForm(!showForm)
          refetch()
          Swal.fire({
            title: `${name} added successfully`,
            icon: "success",
          });
        }
      });
    }
  };

// delete gadget 
const handleDelete =(id,name)=>{
  // console.log(id);
  Swal.fire({
    title: "Are you sure?",
    text: "You Want To delete This item?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#046351",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes"
  }).then((result) => {
    if (result.isConfirmed) {
      axiosHook.delete(`/gadgets/${id}`)
  .then((res)=>{
    if(res.data.deletedCount>0){
      refetch()
    Swal.fire({
      title: `${name} deleted Successfully`,
      icon: "success"
    });
    }
  })
  .catch(err=>{
    console.log(err);
  }) 
     
    }
  });
  
  
  }

  if(isPending){
   return  <LoadingSpinner></LoadingSpinner>
  }
  // if user not listed any thing before return add item form 
  if(gadgets.length===0&&!isPending){
    return  <div className=" bg-base-300 rounded-xl m-5  p-5 lg:p-10  shadow-lg ">
    <h1 className=" text-lg md:text-2xl font-bold text-center mb-5">
      Please Fill Item Info Blew.
    </h1>

    <form
            className=" "
            onSubmit={handleAddItem}
          >
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
                onChange={(e) => setImage(e.target.files[0])}
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
              <button className="btn-primary">
                Add Item
              </button>
            </div>
       
          </form>
  </div>
  }
  return (
    <div className=" md:p-5">
      <DynamicPageTitle dynamicTitle={"Add item | Dashboard"}></DynamicPageTitle>
     <section>
     {!showForm ? (
        <div>
       
          <Heading description={'Welcome Back'} title={'  Here are your all listed item'}></Heading>
          <div className="divider"></div>
          <div className=" flex justify-between items-center px-2 lg:px-10 my-7">
            <div className="flex  justify-between w-full items-center ">
              <h1 className=" text-base lg:text-lg font-bold">
                Total Items: {gadgets?.length}
              </h1>
              <button
              onClick={()=>setShowForm(!showForm)}
              className=" btn bg-[#046351] text-white border-l-4 border-b-4 border-[#2efed8]">
                Add More
              </button>
            </div>
          </div>

          {/* table div  */}
          <div className="text-black overflow-x-auto mx-auto my-10 rounded-md bg-gray-300">
            <table className="table">
              {/* head */}
              <thead className=" text-white  bg-[#046351]">
                <tr>
                  <th></th>
                  <th className=" text-base lg:text-lg font-medium lg:font-bold">
                    Image
                  </th>
                  <th className=" text-base lg:text-lg font-medium lg:font-bold">
                    Item Name
                  </th>
                  <th className=" text-base lg:text-lg font-medium lg:font-bold">
                    Price
                  </th>
                  <th className=" text-base lg:text-lg font-medium lg:font-bold">
                    Details
                  </th>
                  <th className=" text-base lg:text-lg font-medium lg:font-bold">
                    Edit
                  </th>
                  <th className=" text-base lg:text-lg font-medium lg:font-bold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {gadgets?.map((item, index) => (
                  <tr key={item._id}>
                    <th className="border-r border-b border-gray-500">{index + 1}</th>
                    <td className="border-r border-b border-gray-500">
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="  w-16 h-16">
                            <img src={item?.image} />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="border-r border-b border-gray-500">
                      <span className="  text-sm lg:text-base font-medium">
                        {item?.product_name}
                      </span>
                    </td>
                    <td className="border-r border-b border-gray-500">
                      <span className="  text-sm lg:text-base font-medium">
                        {item?.price} $
                      </span>
                    </td>
                    <th className="border-r border-b border-gray-500">
                      <Link to={`/item/${item?._id}`}>
                        <button className=" btn bg-[#046351] text-white border-l-4 border-b-4 border-[#2efed8]">
                          View Details
                        </button>
                      </Link>
                    </th>
                    <th className="border-r border-b border-gray-500">
                      <Link to={`/dashboard/update/${item?._id}`}>
                        <button className=" btn">
                          <FaEdit></FaEdit>
                        </button>
                      </Link>
                    </th>
                    <td className=" text-center border-b border-gray-500">
                      <button
                         onClick={()=>handleDelete(item?._id,item?.product_name)}
                        className=" text-white  bg-red-600  rounded-full p-3"
                      >
                        <FaTrash></FaTrash>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className=" bg-base-300 relative mt-2 rounded-xl  p-5 lg:p-10  shadow-lg ">    <button 
          onClick={()=>setShowForm(!showForm)}
          className="  absolute top-1 right-1 p-1 bg-gray-300"><FaX className=" text-lg"></FaX></button>

      
          <h1 className=" text-lg md:text-2xl font-bold text-center mb-5">
            Please Fill Item Info Blew.
          </h1>

          <form
            className=" "
            onSubmit={handleAddItem}
          >
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
                onChange={(e) => setImage(e.target.files[0])}
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
              <button className="btn-primary">
                Add Item
              </button>
            </div>
       
          </form>
        </div>
      )}
     </section>
    </div>
  );
};

export default AddItem;
