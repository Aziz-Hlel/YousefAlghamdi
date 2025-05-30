import Preloader from "../Loader";
import { useEffect, useState } from "react";
import PropertyFrom from "../Form/PropertyFrom2";
import { useTranslation } from "react-i18next";
import getText from "@src/i18n/data/getText";
import { capitalizePhrase } from "@src/utils/capitalize_decapitalized";
import DownloadApp from "../DownloadApp2";
import Breadcrumbs from "../Breadcrumbs2";
import HistoryLinks from "../Breadcrumbs2/HistoryLinks";

const SubmitProperty = () => {
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
        <Breadcrumbs
          title={capitalizePhrase(t(getText.pagesTitle.submitProperty))}
          titlePosition="bottom"
          background="url(/img/bread-overlay.jpg)" >
          <HistoryLinks link="/home" text={capitalizePhrase(t(getText.pagesTitle.home))} isActive={undefined} />
          <HistoryLinks
            link="/submit-property"
            text={capitalizePhrase(t(getText.pagesTitle.submitProperty))}
            isActive={true}
          />
        </Breadcrumbs>
        <PropertyFrom />
        <DownloadApp />
      </>

    );

  }
  return component;
}

export default SubmitProperty;
