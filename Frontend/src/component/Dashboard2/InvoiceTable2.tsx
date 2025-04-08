import { useState } from "react";
import Layout from "./Layout";
import TableData from "./TableData2";
import InvoiceView from "../Modal";
import Pagination from "../Pagination";
import { Link, Outlet } from "react-router-dom";
import { useAgents } from "@src/providers/AgentsProvider.context";

const AgentsTable = () => {
  // open invoice in modal
  const [viewInvoice, setViewInvoice] = useState(false);
  const toggleModal = () => {
    setViewInvoice(!viewInvoice);
  };

  // handle pages
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = 24;

  const handelPage = (page: any) => {
    if (page === "prev") {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } else if (page === "next") {
      if (currentPage < totalPage) {
        setCurrentPage(currentPage + 1);
      }
    } else {
      setCurrentPage(page);
    }
  };

  const agents = useAgents();


  return (
    <Layout title="Agents">

      <Outlet />
      <div className="homec-invoices">
        <table className="homec-invoice-table">
          <thead className="homec-invoice-table__head">
            <tr>
              <th className="homec-invoice-table__column1">First name</th>
              <th className="homec-invoice-table__column2">Last name</th>
              <th className="homec-invoice-table__column3">Email</th>
              <th className="homec-invoice-table__column4">Phone</th>
              <th className="homec-invoice-table__column5">Edit</th>
            </tr>
          </thead>
          <tbody className="homec-invoice-table__body">

            {Object.keys(agents).map((agentId) => {
              const agent = agents[agentId];
              return <TableData
                _id={agentId}
                firstName={agent.firstName}
                lastName={agent.lastName}
                email={agent.email}
                phone={agent.phoneNumber}
                openModal={toggleModal}
              />

            })}

          </tbody>
        </table>
      </div>
      <div className=" w-full flex justify-end pt-2">

        <Link to={"add-agent"}>
          <button className=" ">

            add agent
          </button>
        </Link>
      </div>
      <Pagination
        totalPage={totalPage}
        handlePage={handelPage}
        currentPage={currentPage}
      />
    </Layout>
  );
}

export default AgentsTable;
