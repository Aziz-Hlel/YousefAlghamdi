import { useEffect, useState } from "react";
import Footer from "../Footer";
import GoTopBtn from "../Button/GoTopBtn";
import About from "../About2/About";
import Agents from "../Agents";
import Blog from "../Blog";
import DownloadApp from "../DownloadApp2";
import Features2 from "../Features2";
import Header from "../Header";
import HomecHero from "../HomecHero2/";
import LatestProperty from "../LatestProperty";
import CitiesListing from "../CitiesListing2";
import Preloader from "../Loader";
import FaqSection from "../Faq/FaqSection";
import LatestPropertyV2 from "../LatestProperty/LatestPropertyV2";


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
        <HomecHero />
        <CitiesListing />
        <LatestPropertyV2 />
        <Features2 />
        <About />
        <Agents />
        <FaqSection />
        <DownloadApp />
      </>
    );
  }
  return component;
}

export default Home;
