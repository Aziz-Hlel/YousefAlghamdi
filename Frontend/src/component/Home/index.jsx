import { useEffect, useState } from "react";
import Footer from "../Footer";
import GoTopBtn from "../Button/GoTopBtn";
import CEO from "../CEO/About";
import Agents from "../Agents2";
import Blog from "../Blog";
import DownloadApp from "../DownloadApp2";
import Features2 from "../WhyUs";
import Header from "../Header";
import HomecHero from "../HomecHero2";
import HomecHeroV2 from "../HomecHero2/HomecHeroV2";
import LatestProperty from "../LatestProperty";
import CitiesListing from "../CitiesListing2";
import Preloader from "../Loader";
import FaqSection from "../Faq/FaqSection";
import LatestPropertyV2 from "../LatestProperty/LatestPropertyV2";
import Sponsors from "../Sponsors/Sponsors";
import apiGateway from "@src/utils/apiGateway";

function Home() {
  const [isLoading, setisLoadingg] = useState(true);

  useEffect(() => {
    setisLoadingg(false);
  }, []);

  let component = undefined;
  if (isLoading) {
    component = <Preloader />;
  } else {
    component = (
      <>
        {/* <HomecHero /> */}
        <HomecHeroV2 />
        {/* <CitiesListing /> */}
        <LatestPropertyV2 />

        <Sponsors />

        <Features2 />
        <CEO />
        <Agents />
        <FaqSection />
        <DownloadApp />
      </>
    );
  }
  return component;
}

export default Home;
