import { useEffect, useState } from "react";
import Header from "../Header";
import Breadcrumbs from "../Breadcrumbs";
import HistoryLinks from "../Breadcrumbs/HistoryLinks";
import Footer from "../Footer";
import GoTopBtn from "../Button/GoTopBtn";
import Preloader from "../Loader";
import SingleSlider from "./SingleSlider";
import ThumbnailsSlider from "./ThumbnilsSlider";
import PropertyDetails from "./PropertyDetails";
import { useParams } from "react-router-dom";
import Iproperty from "src/models/estate.type";
import Http from "@src/services/Http";
import apiGateway from "@src/apiGateway";
import { useGetProperty } from "@src/useApi/useGetProperty";


function PropertySingle() {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const { property } = useGetProperty(id ?? "");

  console.log("estate", property)
  useEffect(() => {
    setIsLoading(false);
  }, []);
  
  let component = undefined;
  if (isLoading) {
    component = <Preloader />;
  } else {
    component = (
      <>
        <Header v2={null} />
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
        <Footer />
        <GoTopBtn />
      </>
    );
  }

  return component;
}

export default PropertySingle;
