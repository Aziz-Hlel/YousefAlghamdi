import { useEffect, useState } from "react";
import Preloader from "../Loader";
import Header from "../Header";
import Breadcrumbs from "../Breadcrumbs";
import GoTopBtn from "../Button/GoTopBtn";
import Footer from "../Footer";
import HistoryLinks from "../Breadcrumbs/HistoryLinks";
import PropertyGrid from "./PropertyGrid";
import { FormProvider } from "./FilterProvider.context";

const Property = () => {
  const [isLoading, setisLoadingg] = useState(true);
  useEffect(() => {
    setisLoadingg(false);
  }, []);






  let component = undefined;
  if (isLoading) {
    component = <Preloader />;
  } else {
    component = (
      <>

        {/* <Header v2={undefined} /> */}
        <Breadcrumbs title="Latest Properties" background={undefined} overlay={undefined} titlePosition={undefined}>

          <HistoryLinks link="home" text="Home" isActive={undefined} />
          <HistoryLinks
            link="property"
            text="Latest Properties"
            isActive={true} />

        </Breadcrumbs>

        <FormProvider>
          <PropertyGrid />
        </FormProvider>

        <GoTopBtn />
      </>
    );
  }

  return component;
}

export default Property;



