import { IoIosMailOpen } from "react-icons/io";
import { LuPhoneCall } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import { FaLocationArrow } from "react-icons/fa";
import banner from '../../assets/contact.png'
import useAuth from '../../hooks/useAuth';
import DynamicPageTitle from "../../reuseable/DynamicPageTitle";
const ContactUs = () => {
  const {user}=useAuth()
  const handleMessage=(e)=>{
   e.preventDefault()
  }
  return (
    <div className=' my-5 lg:my-20 flex flex-col gap-5 container mx-auto lg:flex-row'>
      <DynamicPageTitle dynamicTitle={"Contact"}></DynamicPageTitle>
      <div className=" mx-auto">
      <img src={banner} alt="" />
      </div>
      <div className=' w-full lg:w-[70%]'>
          <h1 className=' text-4xl font-bold text-center'>Hi <span className=' text-sky-500'>{user?.displayName}</span> </h1>
          <h2 className=' my-5 text-2xl font-bold text-center'>Please Don&apos;t Shy Contact Us <span className=' text-yellow-400'>24/7</span> When You Want.</h2>
          <div className="divider"></div>
          <div className=" flex flex-col my-10 md:flex-row px-3 ">
            {/* email and phone */}
            <div className="flex flex-col justify-center lg:justify-start  items-center md:items-start  space-y-3 w-full md:w-1/2">
             <h1 className=" text-xl lg:text-2xl font-black"> Contact Via Email Or Phone </h1>
             <h3 className=" flex items-center gap-2 text-base md:text-lg font-medium"><LuPhoneCall></LuPhoneCall> Phone: +880175222000</h3>
             <h3  className=" flex items-center gap-2 text-base md:text-lg font-medium"><IoIosMailOpen></IoIosMailOpen> Email : +880175222000</h3>
            </div>
            <div className="divider divider-vertical  md:divider-horizontal">or</div>
            {/* direct contact  */}
            <div className=" flex flex-col justify-center lg:justify-start  items-center md:items-start  space-y-3 w-full md:w-1/2">
             <h1 className=" text-xl lg:text-2xl font-black">Contact us Directly </h1>
             <h3 className=" flex   gap-2 text-base md:text-lg font-medium"><IoLocationOutline className="pt-1 md:pt-0 text-3xl"></IoLocationOutline> 3rd street - Aushkandi, Nabigonj , Sylhet , Bangladesh</h3>
            
            </div>
          </div>
          <div className="divider">or</div>
          <div>
          <h1 className=" my-5 text-xl text-center md:text-2xl font-black">Message Us </h1>
          <div>
          <form onSubmit={handleMessage} className="flex flex-col w-full">
            
              <textarea
                name="message"
                required
                rows="5"
                placeholder="Message..."
                className=" border mx-2  p-4 rounded-md resize-none "
              ></textarea>
              <button
                type="submit"
                className="py-4 flex  justify-center items-center gap-2 my-8 font-semibold rounded-md text-white bg-[#039577]"
              >
                Send <FaLocationArrow className=" rotate-[43deg]"></FaLocationArrow>
              </button>
            </form>
          </div>
          </div>

      </div>
    </div>
  );
};

export default ContactUs;