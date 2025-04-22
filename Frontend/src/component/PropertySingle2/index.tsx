import { useEffect, useState } from "react";
import Header from "../Header";
import Breadcrumbs from "../Breadcrumbs";
import HistoryLinks from "../Breadcrumbs/HistoryLinks";
import Footer from "../Footer";
import GoTopBtn from "../Button/GoTopBtn";
import Preloader from "../Loader";
import SingleSlider from "./SingleSlider";
import PropertyDetails from "./PropertyDetails";
import { useParams } from "react-router-dom";
import Iproperty from "@src/models/property.type";
import Http from "@src/services/Http";
import apiGateway from "@src/utils/apiGateway";
<<<<<<< HEAD:Frontend/src/component/PropertySingle2/index.tsx
import { useGetProperty } from "@src/useApi/useGetProperty";
import ThumbnailsSlider from "./ThumbnilsSlider";
import { SinglePropertyProvider } from "../context/SinglePropertyContext/PropertySingleProvider.context";
=======
import ThumbnailsSlider from "./ThumbnilsSlider";
import { SinglePropertyProvider } from "@src/providers/SingleProperty.context";
>>>>>>> dc239cbfd9fc1df60c3cf675db39597723751e71:Frontend/src/component/Property Single2/index.tsx


function PropertySingle() {
  const [isLoading, setIsLoading] = useState(true);
  const { propertyId } = useParams();

  useEffect(() => {
    propertyId && setIsLoading(false);
  }, [propertyId]);

  let component = undefined;
  if (isLoading) {
    component = <Preloader />;
  } else {
    component = (
      <>
<<<<<<< HEAD:Frontend/src/component/PropertySingle2/index.tsx
        <SinglePropertyProvider>
=======
        <SinglePropertyProvider id={propertyId }>
>>>>>>> dc239cbfd9fc1df60c3cf675db39597723751e71:Frontend/src/component/Property Single2/index.tsx

          {/* <Header v2={null} /> */}
          <Breadcrumbs title="Latest Properties" background={null} overlay={null} titlePosition={null}>
            <HistoryLinks link="home" text="Home" isActive={null} />
            <HistoryLinks
              link="property"
              text="Latest Properties"
              isActive={true}
            />
          </Breadcrumbs>
          <section className="pd-top-80 pd-btm-80">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <SingleSlider />
                  <ThumbnailsSlider />
                </div>
              </div>
            </div>
          </section>
          <PropertyDetails />
          <GoTopBtn />
        </SinglePropertyProvider>
      </>
    );
  }

  return component;
}

export default PropertySingle;
