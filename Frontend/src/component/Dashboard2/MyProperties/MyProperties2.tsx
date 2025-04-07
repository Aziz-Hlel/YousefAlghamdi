import Layout from "./Layout2";
import DashboardPropertyCard from "../../Cards/DashboardPropertyCard2";
import Pagination from "../../Pagination2";
import { use, useState } from "react";
import properties from "../../../data/property";
import { useMyPropertiesContext } from "./MyPropertiesProvider.context";
import apiGateway from "@src/utils/apiGateway";
import { pickRandomPhoto } from "@src/pickRandomPhoto";

function MyProperties() {

  const { properties, totalCount, fetchProperties } = useMyPropertiesContext();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = Math.ceil(totalCount / 6)

  const handelPage = (page: number) => {
    console.log('page', page);

    setCurrentPage(page);
    fetchProperties(page);
  };

  return (
    <>
      <Layout title="My Properties">
        {properties?.map((property) => (
          <DashboardPropertyCard
            key={property._id}
            status={property.advanced.state}
            image={apiGateway.images + pickRandomPhoto()}
            why={property.listing_type}
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
