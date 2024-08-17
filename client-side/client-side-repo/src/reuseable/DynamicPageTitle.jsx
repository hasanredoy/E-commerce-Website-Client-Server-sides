import {Helmet} from "react-helmet";

// eslint-disable-next-line react/prop-types
const DynamicPageTitle = ({dynamicTitle}) => {
  return (
    <Helmet>
      <title>{dynamicTitle} | Gadget Shop</title>
    </Helmet>
  );
};

export default DynamicPageTitle;