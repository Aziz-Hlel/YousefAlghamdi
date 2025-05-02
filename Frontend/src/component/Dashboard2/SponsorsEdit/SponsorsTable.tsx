import Pagination from "../../Pagination2";
import { useState } from "react";
import apiGateway from "@src/utils/apiGateway";
import { pickRandomPhoto } from "@src/pickRandomPhoto";
import Http from "@src/services/Http";
import { useSponsorsContext } from "./Sponsors.provider";
import SponsorsCard from "./DashboardSponsors";
import Layout from "../MyProperties/Layout2";
import { Link, Outlet } from "react-router-dom";


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

function SponsorsTable() {

  const { sponsors, totalCount, getSponsors, listRef } = useSponsorsContext();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = Math.ceil(totalCount / 6)
  console.log("total count", totalCount);

  const handelPage = (page: number) => {
    console.log('page', page);

    setCurrentPage(page);
    getSponsors(page);
  };

  // const [userInspected, setUserInspected] = useState<IUser>(initUser);
  const [viewInvoice, setViewInvoice] = useState(false);
  const toggleModal = async (clientId?: string) => {
    setViewInvoice(!viewInvoice);

    if (!clientId) return

    const response = await Http.get(apiGateway.user.getById + clientId);

    // setUserInspected(response?.data.result);

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

      <Layout title={"Sponsors"} ref={listRef}>

        <Outlet />

        <div className=" w-full flex justify-end pt-2">

        </div>
        {sponsors?.map((sponsor) => (
          <SponsorsCard
            _id={sponsor._id}
            key={sponsor._id}
            logo={sponsor.logo}
            name={sponsor.name}
            url={sponsor.url}
          />
        ))}


        <Pagination
          totalPage={totalPage}
          currentPage={currentPage}
          handlePage={handelPage}
        />


      </Layout>

      <div className=" w-full flex justify-end pt-2">
        <Link to={"add-sponsor"}>
          <button className=" homec-btn homec-btn__first">

            add sponsor

          </button>
        </Link>
      </div>
    </>
  );
}

export default SponsorsTable;
