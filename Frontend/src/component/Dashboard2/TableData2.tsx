import ProtoTypes from "prop-types";
import { Link } from "react-router-dom";

type ITableData = {
  _id:string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

}

function TableData({ _id, firstName, lastName, email, phone }: ITableData) {
  return (
    <tr>
      <td className="homec-invoice-table__column1">
        <p className="homec-invoice-table__text">{firstName}</p>
      </td>
      <td className="homec-invoice-table__column2">
        <p className="homec-invoice-table__text">{lastName}</p>
      </td>
      <td className="homec-invoice-table__column3">
        <p className="homec-invoice-table__text">{email}</p>
      </td>
      <td className="homec-invoice-table__column4">
        <p className="homec-invoice-table__text">{phone}</p>
      </td>
      <td className="homec-invoice-table__column5">
        <Link to={"edit-agent/" + _id}
          data-bs-toggle="modal"
          data-bs-target="#invoice_view"
          className="homec-invoice-table--btn h-10"
        >
          Edit
        </Link>
      </td>
    </tr>
  );
}


export default TableData;
