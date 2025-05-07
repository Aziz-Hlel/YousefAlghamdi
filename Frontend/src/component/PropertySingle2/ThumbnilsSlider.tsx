import Carousel from "react-multi-carousel";
import ThumbnailsCard from "../Cards/ThumbnilsCard";
import { responsiveLogoSlider2 } from "../../utils/responsiveSlider";
import ButtonGroup from "../CustomDot/CustomArrow";
import apiGateway from "@src/utils/apiGateway";
import { useSinglePropertyContext } from "@src/providers/SingleProperty.context";
import useRandomPhoto from "@src/useRandomPhoto";


function ThumbnailsSlider() {

  const { property } = useSinglePropertyContext();

  const randomPhotos = [
    useRandomPhoto(),
    useRandomPhoto(),
    useRandomPhoto(),
    useRandomPhoto(),
    useRandomPhoto(),
    useRandomPhoto(),
    useRandomPhoto(),
  ]
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
          property && property.imageGallery.images.map((img, index) =>
            <ThumbnailsCard key={index} img={img.url} />
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
