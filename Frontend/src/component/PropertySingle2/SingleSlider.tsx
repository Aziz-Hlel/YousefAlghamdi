import { responsiveSmallAgentsSlider } from "../../utils/responsiveSlider";
import ImageCard from "../Cards/ImageCard2";
import Carousel from "react-multi-carousel";
import apiGateway from "@src/utils/apiGateway";
import { pickRandomPhoto } from "@src/pickRandomPhoto";
<<<<<<< HEAD:Frontend/src/component/PropertySingle2/SingleSlider.tsx
import { useSingleProperty } from "../context/SinglePropertyContext/PropertySingleProvider.context";
=======
import { useSinglePropertyContext } from "@src/providers/SingleProperty.context";
import useRandomPhoto from "@src/useRandomPhoto";
>>>>>>> dc239cbfd9fc1df60c3cf675db39597723751e71:Frontend/src/component/Property Single2/SingleSlider.tsx



function SingleSlider() {
  const randomPhoto = useRandomPhoto()

<<<<<<< HEAD:Frontend/src/component/PropertySingle2/SingleSlider.tsx
  const { property } = useSingleProperty();

=======
  const { property } = useSinglePropertyContext();
  if (!property) return <></>
>>>>>>> dc239cbfd9fc1df60c3cf675db39597723751e71:Frontend/src/component/Property Single2/SingleSlider.tsx
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
