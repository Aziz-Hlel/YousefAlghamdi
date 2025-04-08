import { useState } from "react";
import Layout from "./Layout";
import TableData from "./TableData2";
import InvoiceView from "../Modal";
import Pagination from "../Pagination";
import { Outlet } from "react-router-dom";

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



  return (
    <Layout title="Agents">
      {/* <InvoiceView
        isOpen={viewInvoice}
        handleModal={toggleModal}
        invoice={{
          name: "Abdullah Mamun",
          number: "+0938 4937 23",
          email: "Youremailad@gmail.com",
          location: "2972 Westheimer Rd. Santa Ana, Illinois 85486 ",
          orderId: "Abdullah Mamun",
          amount: 600,
          paymentMethod: "Paypal",
          transactionId: "34344354532",
          packages: "Pro",
          purchaseDate: "2023-02-23",
          expiredDate: "2023-02-23",
        }}
      /> */}
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

            <TableData
              _id="1"
              firstName="Pro"
              lastName="2023-02-23"
              email="2023-02-23"
              phone={"600"}
              openModal={toggleModal}
            />
            <TableData
              _id="1"
              firstName="Pro"
              lastName="2023-02-23"
              email="2023-02-23"
              phone={"600"}
              openModal={toggleModal}
            />
            <TableData
              _id="1"
              firstName="Pro"
              lastName="2023-02-23"
              email="2023-02-23"
              phone={"600"}
              openModal={toggleModal}
            />
            <TableData
              _id="1"
              firstName="Pro"
              lastName="2023-02-23"
              email="2023-02-23"
              phone={"600"}
              openModal={toggleModal}
            />
            <TableData
              _id="1"
              firstName="Pro"
              lastName="2023-02-23"
              email="2023-02-23"
              phone={"600"}
              openModal={toggleModal}
            />
            <TableData
              _id="1"
              firstName="Pro"
              lastName="2023-02-23"
              email="2023-02-23"
              phone={"600"}
              openModal={toggleModal}
            />
            <TableData
              _id="1"
              firstName="Pro"
              lastName="2023-02-23"
              email="2023-02-23"
              phone={"600"}
              openModal={toggleModal}
            />
            <TableData
              _id="1"
              firstName="Pro"
              lastName="2023-02-23"
              email="2023-02-23"
              phone={"600"}
              openModal={toggleModal}
            />
          </tbody>
        </table>
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
