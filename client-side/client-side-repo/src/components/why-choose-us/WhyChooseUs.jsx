import { useEffect } from "react";
import Heading from "../../reuseable/Heading";
import "./whyChooseUs.css";
import AOS from 'aos';
import 'aos/dist/aos.css';


const WhyChooseUs = () => {
  useEffect(()=>{
    AOS.init()
  },[])
  return (
    <section>
      <Heading description={"Take a look!"} title={"Why Choose Us."}></Heading>

      {/* stats section  */}
   <section className=" flex justify-center gap-10 flex-col lg:flex-row">
       {/* stat 1  */}
       <div data-aos='zoom-in' data-aos-duration='1000' data-aos-delay='100' className=" smartphone relative p-6">
        <div className=" content text-black">
          <h3 className=" text-lg md:text-xl font-bold mb-3">
            Top-Quality Products
          </h3>
          <p className=" text-sm lg:text-base">
            We offer only the best gadgets from trusted brands.
          </p>
        </div>
        <div  className=" flex bottom-2 gap-10 absolute text-black z-30">
    <div >◼</div>
    <div >⬤</div>
    <div >▶</div>
  </div>
      </div>
      {/* stat 2 */}
      <div data-aos='zoom-in' data-aos-duration='1000' data-aos-delay='100' className=" smartphone relative p-6">
        <div className=" content text-black">
          <h3 className=" text-lg md:text-xl font-bold mb-3">
          Competitive Pricing
          </h3>
          <p className=" text-sm lg:text-base">
          Enjoy unbeatable prices on the latest tech.
          </p>
        </div>
        
        <div  className=" flex bottom-2 gap-10 absolute text-black z-30">
    <div >◼</div>
    <div >⬤</div>
    <div >▶</div>
  </div>
      </div>
      {/* stat 3 */}
      <div data-aos='zoom-in' data-aos-duration='1000' data-aos-delay='100' className=" relative smartphone p-6">
        <div className=" content text-black">
          <h3 className=" text-lg md:text-xl font-bold mb-3">
          Latest Technology
          </h3>
          <p className=" text-sm lg:text-base">
          Stay ahead of the curve with our selection of cutting-edge tech. 
          </p>
        </div>
        <div  className=" flex bottom-2 gap-10 absolute text-black z-30">
    <div >◼</div>
    <div >⬤</div>
    <div >▶</div>
  </div>
      </div>
   </section>
    </section>
  );
};

export default WhyChooseUs;
