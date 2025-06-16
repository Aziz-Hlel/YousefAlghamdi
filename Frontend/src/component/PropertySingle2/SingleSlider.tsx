import { responsiveSmallAgentsSlider } from "../../utils/responsiveSlider";
import ImageCard from "../Cards/ImageCard2";
import Carousel from "react-multi-carousel";
import { useSinglePropertyContext } from "@src/providers/SingleProperty.context";
import { useTranslation } from "react-i18next";
import getText from "@src/i18n/data/getText";
import { capitalizePhrase } from "@src/utils/capitalize_decapitalized";



function SingleSlider() {

  const { t } = useTranslation(['data','common', 'pagesTitle']);

  const { property } = useSinglePropertyContext();
  if (!property) return <></>
  return (
    <Carousel
      responsive={responsiveSmallAgentsSlider}
      infinite={true}
      autoPlay={true}
      showDots={false}
      customTransition="linear .5"
      autoPlaySpeed={3000}
      removeArrowOnDeviceType={[
        "superLargeDesktop",
        "desktop",
        "tablet",
        "mobile",
      ]}
    >
      {
        property && property.imageGallery.images.map((img, index) =>
          <ImageCard
            key={index}
            price={property.filterFields.price}
            duration={(property.listing_type.includes("rent") && property.listing_period) ? capitalizePhrase(t(getText.data[property.listing_period as keyof typeof getText.data])) : ""}
            title={property.title}
            text={property.addresse}
            img={img.url!} />
        )}

    </Carousel>
  );
}

export default SingleSlider;
