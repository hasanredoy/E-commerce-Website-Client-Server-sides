import Heading from "../../reuseable/Heading";
import './whyChooseUs.css'
const WhyChooseUs = () => {
  return (
    <section>
      <Heading description={'Take a look!'} title={'Why Choose Us.'}></Heading>

      {/* stats section  */}
      <div className=" smartphone">
   <div className=" content text-black">
   <h3 className=" text-lg md:text-xl font-bold mb-3">Top-Quality Products</h3>
        <p className=" text-sm lg:text-base">We offer only the best gadgets from trusted brand.

</p>
   </div>
      </div>
      <div className="features-section">
  <div className="feature-item">
    <div className="text-block">
      <h3>Top-Quality Products</h3>
      <p>We offer only the best gadgets from trusted brands...</p>
    </div>
    <div className="icon-block">
    </div>
  </div>
  <div className="feature-item">
    <div className="icon-block">
    </div>
    <div className="text-block">
      <h3>Competitive Pricing</h3>
      <p>Enjoy unbeatable prices on the latest tech...</p>
    </div>
  </div>
</div>
    </section>
  );
};

export default WhyChooseUs;