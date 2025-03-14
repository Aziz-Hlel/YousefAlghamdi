import Carousel from "react-multi-carousel";
import ThumbnilsCard from "../Cards/ThumbnilsCard";
import { responsiveLogoSlider2 } from "../../utils/responsiveSlider";
import ButtonGroup from "../CustomDot/CustomArrow";
import { useSinglePropertyContext } from "./PropertySingleProvider.context";
import apiGateway from "@src/apiGateway";

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
            <ThumbnilsCard img={apiGateway.localhost.images + img} />
          )
        }
        <ThumbnilsCard img="https://placehold.co/270x180" />
        <ThumbnilsCard img="https://placehold.co/270x180" />
        <ThumbnilsCard img="https://placehold.co/270x180" />
        <ThumbnilsCard img="https://placehold.co/270x180" />
        <ThumbnilsCard img="https://placehold.co/270x180" />
        <ThumbnilsCard img="https://placehold.co/270x180" />
        <ThumbnilsCard img="https://placehold.co/270x180" />
        <ThumbnilsCard img="https://placehold.co/270x180" />
        <ThumbnilsCard img="https://placehold.co/270x180" />
        <ThumbnilsCard img="https://placehold.co/270x180" />
        <ThumbnilsCard img="https://placehold.co/270x180" />
      </Carousel>
    </div>
  );
}

export default ThumbnailsSlider;
