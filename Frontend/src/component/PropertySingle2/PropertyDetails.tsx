import { useState } from "react";
import PropertyDetailsBtn from "../Button/PropertyDetailsBtn";
import DetailsTab from "./DetailsTab";
import DetailsTabFeatures from "./DetailsTabFeatures";
import FloorDetails from "../FloorDetails";
import PropertyVideo from "../PropertyVideo";
import PropertyLocation from "../PropertyLocation";
import PropertyReview from "../PropertyReview";
import apiGateway from "@src/utils/apiGateway";
import { useSinglePropertyContext } from "@src/providers/SingleProperty.context";
import { useAgents } from "@src/providers/AgentsProvider.context";
import { useTranslation } from "react-i18next";
import getText from "@src/i18n/data/getText";
import { capitalizePhrase } from "@src/utils/capitalize_decapitalized";
import OtherDetailsTabFeatures from "./OtherDetailsTabFeatures";
import PropertyAgents from "../Agents2/PropertyAgents2";

function PropertyDetails() {
  const [activeTab, setActiveTab] = useState("Property Details");
  const handleActive = (title: any) => {
    setActiveTab(title);
  };
  const { t } = useTranslation(['propertySingle', 'common']);


  const { property } = useSinglePropertyContext();

  const { agents } = useAgents();

  if (!property) return <></>

  const propertyAgent = property.agentId ? agents[property.agentId] : undefined;

  type IPropertyDetail = {
    [key: string]: string | number;
  };

  const propertyDetails: IPropertyDetail[] = [
    { Type: property ? property.category : "" },
    { City: property ? property.city : "" },
    { Area: property ? property.filterFields.area : "" },]

  property && property.filterFields.rooms && propertyDetails.push({ Rooms: property.filterFields.rooms });
  property && property.filterFields.bathrooms && propertyDetails.push({ bathrooms: property.filterFields.bathrooms });

  const nearestPlaces = Object.keys(property.nearestPlaces).map((key) => ({
    [key]: property.nearestPlaces[key],
  }))

  const additionalDetails = property?.additionalDetails
  console.log("property.additionalDetails", property);

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
                  text={capitalizePhrase(t(getText.propertySingle.description))}
                >

                  <DetailsTabFeatures
                    title={capitalizePhrase(t(getText.propertySingle.details.title))}
                    property={propertyDetails}
                  />


                  <OtherDetailsTabFeatures check={null}
                    title={capitalizePhrase(t(getText.propertySingle.nearestPlaces.title))}
                    property={nearestPlaces}
                  />

                  <OtherDetailsTabFeatures
                    title={capitalizePhrase(t(getText.propertySingle.additionalDetails))}
                    property={additionalDetails}
                    check={true}
                  />
                </DetailsTab>

              </div>
            </div>
          </div>
          {propertyAgent && <PropertyAgents
            image={propertyAgent.agentInfo.imageGallery.miniImage.url}
            name={propertyAgent.firstName + " " + propertyAgent.lastName}
            position={capitalizePhrase(t(getText.common.realEstateBroker))}
            phoneNumber={propertyAgent.phoneNumber}
            property={property}

          />}
        </div>
      </div>
    </section>
  );
}

export default PropertyDetails;
