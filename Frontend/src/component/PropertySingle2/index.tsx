import { useEffect, useState } from "react";
import Header from "../Header";
import Breadcrumbs from "../Breadcrumbs";
import HistoryLinks from "../Breadcrumbs/HistoryLinks";
import Footer from "../Footer";
import Preloader from "../Loader";
import SingleSlider from "./SingleSlider";
import PropertyDetails from "./PropertyDetails";
import { useParams } from "react-router-dom";
import Iproperty from "@src/models/property.type";
import Http from "@src/services/Http";
import apiGateway from "@src/utils/apiGateway";
import ThumbnailsSlider from "./ThumbnilsSlider";
import { SinglePropertyProvider } from "@src/providers/SingleProperty.context";
import { useTranslation } from "react-i18next";
import getText from "@src/i18n/data/getText";
import { capitalizePhrase } from "@src/utils/capitalize_decapitalized";


function PropertySingle() {
  const [isLoading, setIsLoading] = useState(true);
  const { propertyId } = useParams();

  const { t } = useTranslation(['common','pageTitle']);

  useEffect(() => {
    propertyId && setIsLoading(false);
  }, [propertyId]);

  let component = undefined;
  if (isLoading) {
    component = <Preloader />;
  } else {
    component = (
      <>
        <SinglePropertyProvider id={propertyId}>

          {/* <Header v2={null} /> */}
          <Breadcrumbs title={capitalizePhrase(t(getText.pagesTitle.lastestProperties))} background={null} overlay={null} titlePosition={null}>
            <HistoryLinks link="home" text={capitalizePhrase(t(getText.pagesTitle.home))} isActive={null} />
            <HistoryLinks
              link="property"
              text={capitalizePhrase(t(getText.pagesTitle.lastestProperties))}
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
        </SinglePropertyProvider>
      </>
    );
  }

  return component;
}

export default PropertySingle;
