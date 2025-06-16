import { useEffect, useState } from "react";
import Preloader from "../Loader";
import SingleSlider from "./SingleSlider";
import { useParams } from "react-router-dom";
import ThumbnailsSlider from "./ThumbnilsSlider";
import { SinglePropertyProvider } from "@src/providers/SingleProperty.context";
import { useTranslation } from "react-i18next";
import getText from "@src/i18n/data/getText";
import { capitalizePhrase } from "@src/utils/capitalize_decapitalized";
import PropertyDetails from "./PropertyDetails";
import Breadcrumbs from "../Breadcrumbs2";
import HistoryLinks from "../Breadcrumbs2/HistoryLinks";


function PropertySingle() {
  const [isLoading, setIsLoading] = useState(true);
  const { propertyId } = useParams();

  const { t } = useTranslation(['common', 'pagesTitle']);

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
          <Breadcrumbs title={capitalizePhrase(t(getText.pagesTitle.lastestProperties))} >
            <HistoryLinks link="home" text={capitalizePhrase(t(getText.pagesTitle.home))} />
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
