import Header from "../Header";
import Footer from "../Footer";
import DownloadApp from "../DownloadApp";
import Breadcrumbs from "../Breadcrumbs";
import HistoryLinks from "../Breadcrumbs/HistoryLinks";
import PropertyAddCard from "../Cards/PropertyAddCard2";
import { useEffect, useState } from "react";
import Preloader from "../Loader";
import GoTopBtn from "../Button/GoTopBtn";
import { listing_types } from "@src/types/listing_types.types";

const AddProperty = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  let component = undefined;
  if (isLoading) {
    component = <Preloader />;
  } else {
    component = (
      <>

        <Breadcrumbs title="Add Property" titlePosition="bottom" background={undefined} overlay={undefined}>
          <HistoryLinks link="/home" text="Home" isActive={undefined} />
          <HistoryLinks
            link="/add-property"
            text="Add Property"
            isActive={true}
          />
        </Breadcrumbs>

        <section className="homec-error pd-top-90 pd-btm-120">
          <div className="container">
            <div className="row">

              <PropertyAddCard
                img="/img/property-rent.png"
                why={listing_types.rent}
                link={"/submit-property/" + listing_types.rent} />

              <PropertyAddCard
                img="/img/property-rent.png"
                why={listing_types.commercialRent}
                link={"/submit-property/" + listing_types.commercialRent}
              />

              <PropertyAddCard
                img="/img/property-sale.png"
                why={listing_types.sale}
                link={"/submit-property/" + listing_types.sale}
                btn="second"
              />

              <PropertyAddCard
                img="/img/property-sale.png"
                why={listing_types.commercialSale}
                link={"/submit-property/" + listing_types.commercialSale}
                btn="second"
              />

            </div>
          </div>
        </section>

        <DownloadApp />
        <GoTopBtn />
      </>
    );
  }
  return component;
}

export default AddProperty;
