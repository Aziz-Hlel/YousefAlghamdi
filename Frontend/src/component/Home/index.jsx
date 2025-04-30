import { useEffect, useState } from "react";
import Footer from "../Footer";
import GoTopBtn from "../Button/GoTopBtn";
import About from "../About2/About";
import Agents from "../Agents2";
import Blog from "../Blog";
import DownloadApp from "../DownloadApp2";
import Features2 from "../Features2";
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
  const sponsors = [
    { id: 1, name: 'Acme Corp', logoUrl: apiGateway.images + "property_img1.png" },
    { id: 2, name: 'Globex', logoUrl: apiGateway.images + "property_img1.png" },
    { id: 3, name: 'Initech', logoUrl: apiGateway.images + "property_img1.png" },
    { id: 4, name: 'Umbrella Corp', logoUrl: apiGateway.images + "property_img1.png" },
    { id: 5, name: 'Stark Industries', logoUrl: apiGateway.images + "property_img1.png" },
    { id: 6, name: 'Wayne Enterprises', logoUrl: apiGateway.images + "property_img1.png" },
    { id: 7, name: 'Cyberdyne Systems', logoUrl: apiGateway.images + "property_img1.png" },
    { id: 8, name: 'Oscorp', logoUrl: apiGateway.images + "property_img1.png" },
    { id: 9, name: 'Tyrell Corp', logoUrl: apiGateway.images + "property_img1.png" },
    { id: 10, name: 'LexCorp', logoUrl: apiGateway.images + "property_img1.png" },
    { id: 11, name: 'Massive Dynamic', logoUrl: apiGateway.images + "property_img1.png" },
    { id: 12, name: 'Soylent Corp', logoUrl: apiGateway.images + "property_img1.png" }
  ];
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
        <div className="py-10 sm:px-4    bg-gray-50">
            <Sponsors sponsors={sponsors} speed={200} className="py-4" />
        </div>
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
