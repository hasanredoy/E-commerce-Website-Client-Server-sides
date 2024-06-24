import {Helmet} from "react-helmet";

const DynamicPageTitle = ({dynamicTitle}) => {
  return (
    <Helmet>
      <title>{dynamicTitle} | GadgetShop</title>
    </Helmet>
  );
};

export default DynamicPageTitle;