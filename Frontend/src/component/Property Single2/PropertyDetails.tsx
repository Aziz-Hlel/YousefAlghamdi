import { useState } from "react";
import PropertyDetailsBtn from "../Button/PropertyDetailsBtn";
import DetailsTab from "./DetailsTab";
import DetailsTabFeatures from "./DetailsTabFeatures";
import FloorDetails from "../FloorDetails";
import PropertyVideo from "../PropertyVideo";
import PropertyLocation from "../PropertyLocation";
import PropertyReview from "../PropertyReview";
import PropertyAgents from "../Agents/PropertyAgents";
import { useSinglePropertyContext } from "./PropertySingleProvider.context";
import OtherDetailsTabFeatures from "./OtherDetailsTabFeatures";
import apiGateway from "@src/apiGateway";

function PropertyDetails() {
  const [activeTab, setActiveTab] = useState("Property Details");
  const handleActive = (title: any) => {
    setActiveTab(title);
  };

  type IPropertyDetail = {
    [key: string]: string | number;
  };

  const { property } = useSinglePropertyContext();

  const propertyDetails: IPropertyDetail[] = [
    { "Type": property.type },
    { City: property.city },
    { Area: property.filterFields.area },]

  property.filterFields.rooms && propertyDetails.push({ Rooms: property.filterFields.rooms });
  property.filterFields.bathrooms && propertyDetails.push({ bathrooms: property.filterFields.bathrooms });

  const nearestPlaces = Object.keys(property.nearestPlaces).map((key) => ({
    [key]: property.nearestPlaces[key],
  }))

  const additionalDetails = Object.keys(property.additionalDetails).map((key) => key)

  return (
    <section
      className="pd-top-0 homec-bg-third-color pd-btm-80 homec-bg-cover"
      style={{ backgroundImage: "url('/img/property-single-bg.svg')" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-8 ol-12">


            <div className="homec-pdetails-tab">
              <div className="tab-content">
                <DetailsTab
                  isActive={activeTab === "Property Details"}
                  text={property.description}
                >

                  <DetailsTabFeatures
                    title="Details"
                    property={propertyDetails}
                  />


                  <OtherDetailsTabFeatures check={null}
                    title="Nearest Place"
                    property={nearestPlaces}
                  />

                  <OtherDetailsTabFeatures
                    title="Additional details"
                    property={additionalDetails}
                    check={true}
                  />
                </DetailsTab>
                <FloorDetails isActive={activeTab === "Floor Plans"} />
                <PropertyVideo
                  isActive={activeTab === "Property Video"}
                  img="https://placehold.co/785x410"
                  text="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden end to main to marked."
                />
                <PropertyLocation
                  address="70 Washington Square South, New York, NY 10012, United States"
                  text="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden end to main to marked."
                  isActive={activeTab === "Locations"}
                />
                <PropertyReview isActive={activeTab === "Review"} />
              </div>
            </div>
          </div>
          <PropertyAgents
            image={apiGateway.images + "agent_small.png"}
            name="Wade De Warren"
            position="Real Estate Broker"
          />
        </div>
      </div>
    </section>
  );
}

export default PropertyDetails;
