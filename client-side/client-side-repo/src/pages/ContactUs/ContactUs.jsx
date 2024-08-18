import { IoIosMailOpen } from "react-icons/io";
import { LuPhoneCall } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import banner from '../../assets/contact.png'
import useAuth from '../../hooks/useAuth';
import DynamicPageTitle from "../../reuseable/DynamicPageTitle";
const ContactUs = () => {
  const {user}=useAuth()
  const handleMessage=(e)=>{
   e.preventDefault()
  }
  return (
    <div className=' flex flex-col gap-5 container lg:flex-row w-[95%] lg:w-[90%] mx-auto my-10'>
      <DynamicPageTitle dynamicTitle={"Contact"}></DynamicPageTitle>
      <div className=" mx-auto">
      <img src={banner} alt="" />
      </div>
      <div className=' w-full lg:w-[70%]'>
          <h1 className=' text-xl lg:text-2xl font-bold text-center'>Hi <span className=' text-primary'>{user?.displayName}</span> </h1>
          <h2 className=' my-5 text-base lg:text-lg font-semibold text-center'>Please Don&apos;t Shy Contact Us <span className=' text-primary '>24/7</span> When You Want.</h2>
          <div className="divider"></div>
          <div className=" flex flex-col my-10 md:flex-row  px-3 ">
            {/* email and phone */}
            <div className="flex flex-col justify-center lg:justify-start  items-center md:items-start  space-y-3 w-full md:w-1/2">
             <h1 className=" text-base lg:text-lg font-semibold"> Contact Via Email Or Phone </h1>
             <h3 className=" flex items-center gap-2 text-sm md:text-base "><LuPhoneCall></LuPhoneCall> Phone: +880175222000</h3>
             <h3  className=" flex items-center gap-2 text-sm md:text-base"><IoIosMailOpen></IoIosMailOpen> Email : +880175222000</h3>
            </div>
            <div className="divider divider-vertical  md:divider-horizontal">or</div>
            {/* direct contact  */}
            <div className=" flex lg:ml-10 flex-col justify-center lg:justify-start  items-center md:items-start  space-y-3 w-full md:w-1/2">
             <h1 className=" text-base lg:text-lg font-semibold">Contact us Directly </h1>
             <h3 className=" flex   gap-2 text-sm md:text-base "><IoLocationOutline className="pt-1 md:pt-0 text-3xl"></IoLocationOutline> 3/5 street - Aushkandi, Nabigonj, Sylhet, Bangladesh</h3>
            
            </div>
          </div>
          <div className="divider">or</div>
          <div>
          <h1 className=" my-5 text-base text-center lg:text-lg font-semibold">Message Us </h1>
          <div>
          <form onSubmit={handleMessage} className="flex flex-col w-full">
            
              <textarea
                name="message"
                required
                rows="5"
                placeholder="Message..."
                className=" border mx-2  p-4 rounded-md resize-none "
              ></textarea>
               <div className=" flex justify-center my-5">
               <button
                type="submit"
                className="btn-primary"
              >
                Send 
              </button>
               </div>
            </form>
          </div>
          </div>

      </div>
    </div>
  );
};

export default ContactUs;