import Layout from "./Layout2";
import DashboardPropertyCard from "../../Cards/DashboardPropertyCard2";
import Pagination from "../../Pagination2";
import { use, useState } from "react";
import properties from "../../../data/property";
import { useMyPropertiesContext } from "./MyPropertiesProvider.context";
import apiGateway from "@src/utils/apiGateway";
import { pickRandomPhoto } from "@src/pickRandomPhoto";
import UserView from "@src/component/CU_Agent";
import Http from "@src/services/Http";


type IUser = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  createdAt: string;
  role: string;
  agentId: string;
}
const initUser = {
  _id: "",
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: 0,
  createdAt: "",
  role: "",
  agentId: "",
}

function MyProperties({ title }: { title: string }) {

  const { properties, totalCount, fetchProperties, listRef } = useMyPropertiesContext();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = Math.ceil(totalCount / 6)
  console.log("total count", totalCount);

  const handelPage = (page: number) => {
    console.log('page', page);

    setCurrentPage(page);
    fetchProperties(page);
  };

  const [userInspected, setUserInspected] = useState<IUser>(initUser);
  const [viewInvoice, setViewInvoice] = useState(false);
  const toggleModal = async (clientId?: string) => {
    setViewInvoice(!viewInvoice);

    if (!clientId) return

    const response = await Http.get(apiGateway.user.getById + clientId);

    setUserInspected(response?.data.result);

  };

  const randomPhotos = [
    pickRandomPhoto(),
    pickRandomPhoto(),
    pickRandomPhoto(),
    pickRandomPhoto(),
    pickRandomPhoto(),
    pickRandomPhoto(),

  ];

  return (
    <>
      <Layout title={title} ref={listRef}>
        {properties?.map((property, index) => (
          <DashboardPropertyCard
            _id={property._id}
            ownerId={property.clientId}
            key={property._id}
            status={property.advanced.state}
            image={apiGateway.images + randomPhotos[index]}
            listing_type={property.listing_type}
            title={property.title}
            location={property.city + ", " + property.delegation + ", " + property.addresse}
            // price={property.filterFields.price}
            onInspectClient={toggleModal}
            tempToSeeIfUser={title}
          />
        ))}

        {/* <UserView
          isOpen={viewInvoice}
          handleModal={toggleModal}
          user={{ ...userInspected }}
        /> */}
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
