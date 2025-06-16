import PropertyAddCard from "../Cards/PropertyAddCard2";
import { useEffect, useState } from "react";
import Preloader from "../Loader";
import { listing_types } from "@src/types/listing_types.types";
import { useTranslation } from "react-i18next";
import getText from "@src/i18n/data/getText";
import { capitalizePhrase } from "@src/utils/capitalize_decapitalized";
import DownloadApp from "../DownloadApp2";
import Breadcrumbs from "../Breadcrumbs2";
import HistoryLinks from "../Breadcrumbs2/HistoryLinks";

const AddProperty = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation(['data', 'pagesTitle']);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  let component = undefined;
  if (isLoading) {
    component = <Preloader />;
  } else {
    component = (
      <>

        <Breadcrumbs title={capitalizePhrase(t(getText.pagesTitle.addProperty))} titlePosition="bottom" >
          <HistoryLinks link="/home" text={capitalizePhrase(t(getText.pagesTitle.home))} />
          <HistoryLinks
            link="/add-property"
            text={capitalizePhrase(t(getText.pagesTitle.addProperty))}
            isActive={true}
          />
        </Breadcrumbs>

        <section className="homec-error pd-top-90 pd-btm-120">
          <div className="container">
            <div className="row">

              <PropertyAddCard
                img="/img/property-rent.png"
                why={capitalizePhrase(t(getText.data[listing_types.rent as keyof typeof getText.data]))}
                link={"/submit-property/" + listing_types.rent} />

              <PropertyAddCard
                img="/img/property-rent.png"
                why={capitalizePhrase(t(getText.data[listing_types.commercialRent as keyof typeof getText.data]))}
                link={"/submit-property/" + listing_types.commercialRent}
              />

              <PropertyAddCard
                img="/img/property-sale.png"
                why={capitalizePhrase(t(getText.data[listing_types.sale as keyof typeof getText.data]))}
                link={"/submit-property/" + listing_types.sale}
                btn="second"
              />

              <PropertyAddCard
                img="/img/property-sale.png"
                why={capitalizePhrase(t(getText.data[listing_types.commercialSale as keyof typeof getText.data]))}
                link={"/submit-property/" + listing_types.commercialSale}
                btn="second"
              />

            </div>
          </div>
        </section>

        <DownloadApp />
      </>
    );
  }
  return component;
}

export default AddProperty;
