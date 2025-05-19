import DownloadApp from "../DownloadApp";
import CEO from "./About";
import { useEffect, useState } from "react";
import Preloader from "../Loader";
import FounderComp from "./FounderComp";
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
