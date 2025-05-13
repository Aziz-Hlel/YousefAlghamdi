import Layout from "./Layout2";
import DashboardPropertyCard from "../../Cards/DashboardPropertyCard2";
import Pagination from "../../Pagination2";
import { useState } from "react";
import { useMyPropertiesContext } from "./MyPropertiesProvider.context";


function MyProperties({ title }: { title: "Pending Properties" | "My properties" | "Unavailable Properties" | "All Properties" }) {

  const { properties, totalCount, fetchProperties, listRef } = useMyPropertiesContext();

  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = Math.ceil(totalCount / 6)

  const handelPage = (page: number) => {

    setCurrentPage(page);
    fetchProperties(page);
  };



  return (
    <>
      <Layout title={title} ref={listRef}>
        {properties?.map((property) => (
          <DashboardPropertyCard
            componentTitle={title}
            property={property}
            _id={property._id}
            ownerId={typeof property.clientId === "string" ? property.clientId : property.clientId._id}
            key={property._id}
            state={property.advanced.state}
            image={property.imageGallery.images[0]?.url ?? "#"}
            listing_type={property.listing_type}
            title={property.title}
            location={property.city + ", " + property.delegation + ", " + property.addresse}
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
