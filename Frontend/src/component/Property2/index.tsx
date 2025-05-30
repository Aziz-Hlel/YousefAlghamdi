import { useEffect, useState } from "react";
import Preloader from "../Loader";
import PropertyGrid from "./PropertyGrid";
import { FormProvider } from "./FilterProvider.context";
import { useTranslation } from "react-i18next";
import { capitalize } from "lodash";
import getText from "@src/i18n/data/getText";
import Breadcrumbs from "../Breadcrumbs2";
import HistoryLinks from "../Breadcrumbs2/HistoryLinks";

const Property = () => {
  const [isLoading, setisLoadingg] = useState(true);
  const { t } = useTranslation(['common', 'pagesTitle']);
  
  
  useEffect(() => {
    setisLoadingg(false);
  }, []);




  let component = undefined;
  if (isLoading) {
    component = <Preloader />;
  } else {
    component = (
      <>

        <Breadcrumbs title={capitalize(t(getText.pagesTitle.lastestProperties))}  >
        {/* <Header v2={undefined} /> */}

          <HistoryLinks link="home" text={capitalize(t(getText.pagesTitle.home))}  />
          <HistoryLinks
            link="property"
            text={capitalize(t(getText.pagesTitle.lastestProperties))}
            isActive={true} />

        </Breadcrumbs>

        <FormProvider>
          <PropertyGrid />
        </FormProvider>

      </>
    );
  }

  return component;
}

export default Property;



