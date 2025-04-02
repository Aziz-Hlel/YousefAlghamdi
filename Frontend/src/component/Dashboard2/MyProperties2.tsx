import Layout from "./Layout2";
import DashboardPropertyCard from "../Cards/DashboardPropertyCard2";
import Pagination from "../Pagination2";
import { useState } from "react";
import properties from "../../data/property";

function MyProperties() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = 24;

  const handelPage = (page: number) => {

    setCurrentPage(page);
  };
  
  return (
    <>
      <Layout title="My Properties">
        {properties?.map((property) => (
          <DashboardPropertyCard
            key={property.id}
            status={property.status}
            image={property.img2}
            why={property.whatFor}
            title={property.name}
            location={property.address}
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
