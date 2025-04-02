import { responsiveSmallAgentsSlider } from "../../utils/responsiveSlider";
import ImageCard from "../Cards/ImageCard2";
import Carousel from "react-multi-carousel";
import { useSinglePropertyContext } from "./PropertySingleProvider.context";
import apiGateway from "@src/utils/apiGateway";

function SingleSlider() {

  const { property } = useSinglePropertyContext();

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
        property.imgs.map((img, index) =>
          <ImageCard
            key={index}
            price={property.filterFields.price}
            duration={property.filterFields.forRent ? "Month" : ""}
            title={property.title}
            text="1901 Thornridge Cir. Shiloh, Hawaii 81063"
            img={apiGateway.images + img} />
        )}

      {/* <ImageCard
        price="3,976"
        duration="Month"
        title="Modern House With Pool"
        text="1901 Thornridge Cir. Shiloh, Hawaii 81063"
        img="https://placehold.co/1170x600"
      />
      <ImageCard
        price="3,976"
        duration="Month"
        title="Affordable Green Villa House"
        text="1901 Thornridge Cir. Shiloh, Hawaii 81063"
        img="https://placehold.co/1170x600"
      />
      <ImageCard
        price="3,976"
        duration="Month"
        title="Modern House With Pool"
        text="1901 Thornridge Cir. Shiloh, Hawaii 81063"
        img="https://placehold.co/1170x600"
      />
      <ImageCard
        price="3,976"
        duration="Month"
        title="Affordable Green Villa House"
        text="1901 Thornridge Cir. Shiloh, Hawaii 81063"
        img="https://placehold.co/1170x600"
      /> */}
    </Carousel>
  );
}

export default SingleSlider;
