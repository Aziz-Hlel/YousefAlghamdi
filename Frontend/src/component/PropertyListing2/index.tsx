import HomeSearch from "../Filter/HomeSearch";
import Title from "../Title";
import SingleList from "./SingleList";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import TitleBtn from "../Button/TitleBtn";

function PropertyListing() {
  return (
    <section className="pd-top-120 pd-btm-120 xl:-translate-y-20 z-50">
      <div className="container homec-listing__container ">
        <div className="row">
          <div className="col-12">
            <Title
              firstText="View All 329 New Listings"
              secondText="Explore a Neighborhood or City"
              marginSize="60"
              styleFirst={undefined}
              styleSecond={undefined}
            />
            <HomeSearch />
          </div>
        </div>

        <div className="row  " >
          <div className="col-12" data-aos="fade-up" data-aos-delay="600">
            {/* Homec Listing  */}
            <div className=" mg-top-40 container w-full cursor-pointer ">
              <div className=" w-full flex  gap-6 cursor-pointer " >
             
                  <SingleList 
                    listing="4"
                    place="Dubai central"
                    img="https://placehold.co/274x567"
                    link="#"
                  />
             
                  <SingleList
                    listing="4"
                    place="Deira"
                    img="https://placehold.co/274x567"
                    link="#"
                  />

                  <SingleList
                    listing="4"
                    place="Bur Dubai"
                    img="https://placehold.co/274x567"
                    link="#"
                  />

                  <SingleList
                    listing="4"
                    place="Al Awir"
                    img="https://placehold.co/274x567"
                    link="#"
                  />

                  <SingleList
                    listing="4"
                    place="Al Qusais"
                    img="https://placehold.co/274x567"
                    link="#"
                  />
                
              </div>
            </div>
            {/* Homec listing end  */}
          </div>
        </div>
        <div className="row">
          <TitleBtn link="property" text="See all City" delay="700" />
        </div>
      </div>
    </section>
  );
}

export default PropertyListing;
