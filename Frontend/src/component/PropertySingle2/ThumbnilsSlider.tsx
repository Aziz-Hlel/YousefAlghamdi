import Carousel from "react-multi-carousel";
import ThumbnailsCard from "../Cards/ThumbnilsCard";
import { responsiveLogoSlider2 } from "../../utils/responsiveSlider";
import ButtonGroup from "../CustomDot/CustomArrow";
import apiGateway from "@src/utils/apiGateway";
<<<<<<< HEAD:Frontend/src/component/PropertySingle2/ThumbnilsSlider.tsx
import { pickRandomPhoto } from "@src/pickRandomPhoto";
import { useSingleProperty } from "../context/SinglePropertyContext/PropertySingleProvider.context";
=======
import { useSinglePropertyContext } from "@src/providers/SingleProperty.context";
import useRandomPhoto from "@src/useRandomPhoto";
>>>>>>> dc239cbfd9fc1df60c3cf675db39597723751e71:Frontend/src/component/Property Single2/ThumbnilsSlider.tsx


function ThumbnailsSlider() {

  const { property } = useSingleProperty();

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
          property && property.imgs.map((img, index) =>
            <ThumbnailsCard formkey={index} img={apiGateway.images + randomPhotos[0]} />
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
