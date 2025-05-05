import GoTopBtn from "../Button/GoTopBtn";
import Footer from "../Footer";
import DownloadApp from "../DownloadApp";
import About from "./About";
import FeaturesV2 from "../Features/FeaturesV2";
import FunFacts from "../FunFact";
import AgentsV2 from "../Agents/AgentsV2";
import FaqSection from "../Faq/FaqSection";
import { useEffect, useState } from "react";
import Preloader from "../Loader";
import FounderComp from "./FounderComp";
import Header from "../Header2";
import Breadcrumbs from "../Breadcrumbs2";
import HistoryLinks from "../Breadcrumbs2/HistoryLinks";

function AboutUs() {
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
        <Breadcrumbs title="About US" titlePosition="bottom" background="url(/img/bread-overlay.jpg)" overlay={false} >
          <HistoryLinks link="/home" text="Home" isActive={false} />
          <HistoryLinks link="/about" text="About US" isActive={true} />
        </Breadcrumbs>
        <About />
        <FounderComp />

        {/* <FeaturesV2 v2={true} /> */}
        {/* <FunFacts v2={true} key={5} /> */}
        {/* <AgentsV2 /> */}
        {/* <FaqSection /> */}
        <DownloadApp />
        <GoTopBtn />
      </>
    );
  }
  return component;
}

export default AboutUs;
