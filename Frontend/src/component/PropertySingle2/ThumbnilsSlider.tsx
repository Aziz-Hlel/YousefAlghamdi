import Carousel from "react-multi-carousel";
import { responsiveLogoSlider2 } from "../../utils/responsiveSlider";
import ButtonGroup from "../CustomDot/CustomArrow";
import { useSinglePropertyContext } from "@src/providers/SingleProperty.context";
import ThumbnailsCard from "../Cards/ThumbnilsCard2";


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
          property && property.imageGallery.images.map((img, index) =>
            <ThumbnailsCard key={index} img={img.url ?? "#"} />
          )
        }
        {!property && <ThumbnailsCard img="https://placehold.co/270x180" />}

      </Carousel>
    </div>
  );
}

export default ThumbnailsSlider;
