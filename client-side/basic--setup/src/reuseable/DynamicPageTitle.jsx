import {Helmet} from "react-helmet";

// eslint-disable-next-line react/prop-types
const DynamicPageTitle = ({dynamicTitle}) => {
  return (
    <Helmet>
      <title>{dynamicTitle} | GadgetShop</title>
    </Helmet>
  );
};

export default DynamicPageTitle;