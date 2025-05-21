import { useAgents } from "@src/providers/AgentsProvider.context";
import Http from "@src/services/Http";
import apiGateway from "@src/utils/apiGateway";
import { Alert, ConfirmationAlertAsync } from "@src/utils/createAlert";
import ProtoTypes from "prop-types";
import { Link } from "react-router-dom";

type ITableData = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

}

function TableData({ _id, firstName, lastName, email, phone }: ITableData) {

  const { refreshAgents } = useAgents();

  const handledelete = async () => {

    const userResponse = await ConfirmationAlertAsync({ icon: "warning", title: "Delete Agent", text: "Are you sure you want to delete this agent?" })
    if (userResponse.isConfirmed) {
      const response = await Http.delete(`${apiGateway.agent.delete}/${_id}`)
      if (response?.status === 200) {
        Alert({ icon: "success", title: "Agent Deleted", text: "Agent deleted successfully" })
        refreshAgents()
      } else {
        Alert({ icon: "error", title: "Error", text: "Failed to delete agent" })
      }
    }

  }


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
      <td className="homec-invoice-table__column5 gap-2">
        <Link to={"edit-agent/" + _id}
          data-bs-toggle="modal"
          data-bs-target="#invoice_view"
          className="homec-invoice-table--btn h-10"
        >
          Edit
        </Link>
        <div onClick={handledelete}
          className=" h-10 text-white cursor-pointer hover:text-black  bg-red-500 rounded-md py-2 px-1">
          Delete
        </div>
      </td>

    </tr>
  );
}


export default TableData;
