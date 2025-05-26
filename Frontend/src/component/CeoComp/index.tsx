import CEO from "./About";
import { useEffect, useState } from "react";
import Preloader from "../Loader";
import FounderComp from "./FounderComp";
import Breadcrumbs from "../Breadcrumbs2";
import HistoryLinks from "../Breadcrumbs2/HistoryLinks";
import DownloadApp from "../DownloadApp2";
import getText from "@src/i18n/data/getText";
import { capitalizePhrase } from "@src/utils/capitalize_decapitalized";
import { useTranslation } from "react-i18next";

function AboutUs() {
  const [isLoading, setisLoadingg] = useState(true);

  const { t } = useTranslation(['common', 'pagesTitle','contactUs' ]);
  { capitalizePhrase(t(getText.common.test)) }

  useEffect(() => {
    setisLoadingg(false);
  }, []);

  let component = undefined;
  if (isLoading) {
    component = <Preloader />;
  } else {
    component = (
      <>
        <Breadcrumbs title={capitalizePhrase(t(getText.pagesTitle.aboutUs))} titlePosition="bottom" background="url(/img/bread-overlay.jpg)" overlay={false} >
          <HistoryLinks link="/home" text={capitalizePhrase(t(getText.pagesTitle.home))} isActive={false} />
          <HistoryLinks link="/about" text={capitalizePhrase(t(getText.pagesTitle.aboutUs))} isActive={true} />
        </Breadcrumbs>
        <CEO />
        <FounderComp />
        {/* <FeaturesV2 v2={true} /> */}
        {/* <FunFacts v2={true} key={5} /> */}
        {/* <AgentsV2 /> */}
        {/* <FaqSection /> */}
        <DownloadApp />
      </>
    );
  }
  return component;
}

export default AboutUs;
