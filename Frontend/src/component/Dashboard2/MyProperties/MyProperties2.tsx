import Layout from "./Layout2";
import DashboardPropertyCard from "../../Cards/DashboardPropertyCard2";
import Pagination from "../../Pagination2";
import { useState, useTransition } from "react";
import { useMyPropertiesContext } from "./MyPropertiesProvider.context";
import { capitalizePhrase } from "@src/utils/capitalize_decapitalized";
import getText from "@src/i18n/data/getText";
import { useTranslation } from "react-i18next";


function MyProperties({ title }: { title: "Pending Properties" | "My properties" | "Unavailable Properties" | "All Properties" }) {


  const { properties, totalCount, fetchProperties, listRef } = useMyPropertiesContext();

  const { t } = useTranslation(['data', 'common', 'dashboard']);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = Math.ceil(totalCount / 6)

  const handelPage = (page: number) => {

    setCurrentPage(page);
    fetchProperties(page);
  };

  const textTranlationKey = {
    "Pending Properties": capitalizePhrase(t(getText.dashboard.pendingProperties)),
    "My properties": capitalizePhrase(t(getText.dashboard.myProperties)),
    "Unavailable Properties": capitalizePhrase(t(getText.dashboard.unavailableProperties)),
    "All Properties": capitalizePhrase(t(getText.dashboard.allProperties)),
  }

  const titleTranslated = textTranlationKey[title] || title;


  return (
    <>
      <Layout title={titleTranslated} ref={listRef}>
        {properties?.map((property) => (
          <DashboardPropertyCard
            componentTitle={title}
            property={property}
            _id={property.id}
            ownerId={typeof property.clientId === "string" ? property.clientId : property.clientId.id}
            key={property.id}
            state={property.advanced.state}
            image={property.imageGallery.images[0]?.url ?? "#"}
            listing_type={capitalizePhrase(t(getText.data[property.listing_type as keyof typeof getText.data]))}
            title={property.title}
          // price={property.filterFields.price}
          />
        ))}

        <Pagination
          totalPage={totalPage}
          currentPage={currentPage}
          handlePage={handelPage}
        />
      </Layout>
    </>
  );
}

export default MyProperties;
