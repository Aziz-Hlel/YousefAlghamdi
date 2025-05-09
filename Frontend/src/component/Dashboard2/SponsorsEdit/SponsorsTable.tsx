import Pagination from "../../Pagination2";
import { useState } from "react";
import { useSponsorsContext } from "./Sponsors.provider";
import SponsorsCard from "./DashboardSponsors";
import Layout from "../MyProperties/Layout2";
import { Link, Outlet } from "react-router-dom";



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
            logoUrl={sponsor.image.url}
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
