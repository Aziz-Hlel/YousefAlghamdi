import Carousel from "react-multi-carousel";
import ThumbnailsCard from "../Cards/ThumbnilsCard";
import { responsiveLogoSlider2 } from "../../utils/responsiveSlider";
import ButtonGroup from "../CustomDot/CustomArrow";
import { useSinglePropertyContext } from "./PropertySingleProvider.context";
import apiGateway from "@src/utils/apiGateway";

function ThumbnailsSlider() {

  const { property } = useSinglePropertyContext();


  return (
    <div className="mg-top-10">
      <Carousel
        responsive={responsiveLogoSlider2}
        showDots={false}
        infinite={true}
        arrows={false}
        customButtonGroup={<ButtonGroup next={undefined} previous={undefined} />}
      >

        {
          property.imgs.map((img, index) =>
            <ThumbnailsCard key={index} img={apiGateway.images + img} />
          )
        }
        <ThumbnailsCard img="https://placehold.co/270x180" />
        <ThumbnailsCard img="https://placehold.co/270x180" />
        <ThumbnailsCard img="https://placehold.co/270x180" />
        <ThumbnailsCard img="https://placehold.co/270x180" />
        <ThumbnailsCard img="https://placehold.co/270x180" />
        <ThumbnailsCard img="https://placehold.co/270x180" />
        <ThumbnailsCard img="https://placehold.co/270x180" />
        <ThumbnailsCard img="https://placehold.co/270x180" />
        <ThumbnailsCard img="https://placehold.co/270x180" />
        <ThumbnailsCard img="https://placehold.co/270x180" />
        <ThumbnailsCard img="https://placehold.co/270x180" />
      </Carousel>
    </div>
  );
}

export default ThumbnailsSlider;
