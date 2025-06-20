import { useEffect, useState } from "react";
import Footer from "../Footer";
import GoTopBtn from "../Button/GoTopBtn";
import CEO from "../CeoComp/About";
import Agents from "../Agents2";
import DownloadApp from "../DownloadApp2";
import Features2 from "../WhyUs";
import Header from "../Header";
import HomecHero from "../HomecHero2";
import HomecHeroV2 from "../HomecHero2/HomecHeroV2";
import Preloader from "../Loader";
import FaqSection from "../Faq2/FaqSection";
import LatestPropertyV2 from "../LatestProperty2/LatestPropertyV22";
import Sponsors from "../Sponsors/Sponsors";
import apiGateway from "@src/utils/apiGateway";
import FeaturedPropertiesProvider from "../LatestProperty2/FeaturedPropertiesProvider.context";
import CEOMobile from "../CeoComp/CEOMobile";
import { useMediaQuery } from "@src/utils/useMediaQuery";

function Home() {
  const [isLoading, setisLoadingg] = useState(true);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  useEffect(() => {
    setisLoadingg(false);
  }, []);

  let component = undefined;
  if (isLoading) {
    component = <Preloader />;
  } else {
    component = (
      <>
        <HomecHeroV2 />
        <FeaturedPropertiesProvider>
          <LatestPropertyV2 />
        </FeaturedPropertiesProvider>

        <Sponsors />

        <Features2 />
        {isDesktop ? <CEO /> : <CEOMobile />}
        <Agents />
        <FaqSection />
        <DownloadApp />
      </>
    );
  }
  return component;
}

export default Home;
