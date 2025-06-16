import Carousel from "react-multi-carousel";
import { responsivePropertySlider } from "../../utils/responsiveSlider";
import CustomDotRound from "../CustomDot/CustomDotRound";
// import LatestPropertyCard from "../Cards/LatestPropertyCard";
import LatestPropertyCard from "../Cards/LatestPropertyCard2";
import TitleWithBtn from "../Title/TitleWithBtn";
import { useFeaturedPropertiesContext } from "./FeaturedPropertiesProvider.context";
import { useTranslation } from 'react-i18next';
import getText from "@src/i18n/data/getText";
import { capitalizePhrase } from "@src/utils/capitalize_decapitalized";

function LatestPropertyV2() {


  const { properties } = useFeaturedPropertiesContext();
  const { t } = useTranslation(['home', 'common']);
  { capitalizePhrase(t(getText.common.test)) }
  return (

    <div>
      <section
        className="homec-properties homec-bg-cover homec-bg-third-color pd-top-90 pd-btm-120"
        style={{ backgroundImage: "url('/img/bg-shape-one.svg')" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <TitleWithBtn
                btn={true}
                styleCategory={{}}
                styleTitle={{}}
                title={t(getText.home.LatestPropertyV2.title)}
                link="/property"
                btnText={capitalizePhrase(t(getText.home.LatestPropertyV2.seeAllProperties))}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Carousel
                responsive={responsivePropertySlider}
                showDots={true}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={3000}
                removeArrowOnDeviceType={[
                  "superLargeDesktop",
                  "desktop",
                  "tablet",
                  "mobile",
                ]}
                customDot={<CustomDotRound />

                }
              >
                {properties?.map((property, index) => (

                  <LatestPropertyCard
                    property={property}
                    key={property.id}
                    classes={""}
                    view="grid"
                    style={{ width: "95%", marginBottom: "60px" }}

                  />
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </section >
    </div >


  );
}

export default LatestPropertyV2;
