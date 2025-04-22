import { responsiveSmallAgentsSlider } from "../../utils/responsiveSlider";
import ImageCard from "../Cards/ImageCard2";
import Carousel from "react-multi-carousel";
import apiGateway from "@src/utils/apiGateway";
import { pickRandomPhoto } from "@src/pickRandomPhoto";
import { useSinglePropertyContext } from "@src/providers/SingleProperty.context";
import useRandomPhoto from "@src/useRandomPhoto";



function SingleSlider() {
  const randomPhoto = useRandomPhoto()

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
        property && property.imgs.map((img, index) =>
          <ImageCard
            formkey={index}
            price={property.filterFields.price}
            duration={property.listing_type === "rent" || property.listing_type === "commercial rent" ? "Month" : ""}
            title={property.title}
            text="1901 Thornridge Cir. Shiloh, Hawaii 81063"
            img={apiGateway.images + randomPhoto} />
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
