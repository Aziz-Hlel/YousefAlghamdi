import Layout from "./Layout";
import TableData from "./TableData2";
import { Link, Outlet } from "react-router-dom";
import { useAgents } from "@src/providers/AgentsProvider.context";
import { useTranslation } from "react-i18next";
import getText from "@src/i18n/data/getText";
import { capitalizePhrase } from "@src/utils/capitalize_decapitalized";

const AgentsTable = () => {


  const { agents } = useAgents();
    const { t } = useTranslation(['data', 'common', 'dashboard']);



  return (
    <Layout title= {capitalizePhrase(t(getText.dashboard.agents.title))}>

      <Outlet />
      <div className="homec-invoices">
        <table className="homec-invoice-table">
          <thead className="homec-invoice-table__head">
            <tr>
              <th className="homec-invoice-table__column1">{capitalizePhrase(t(getText.common.firstName))}</th>
              <th className="homec-invoice-table__column2">{capitalizePhrase(t(getText.common.lastName))}</th>
              <th className="homec-invoice-table__column3">{capitalizePhrase(t(getText.common.email))}</th>
              <th className="homec-invoice-table__column4">{capitalizePhrase(t(getText.common.phoneNumber))}</th>
              <th className="homec-invoice-table__column5">{`${capitalizePhrase(t(getText.common.edit))}/${capitalizePhrase(t(getText.common.delete))}`}</th>
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
                key={agentId}
              />

            })}

          </tbody>
        </table>
      </div>
      <div className=" w-full flex justify-end pt-2">

        <Link to={"add-agent"}>
          <button className=" homec-btn homec-btn__first">

            {capitalizePhrase(t(getText.dashboard.agents.agentCU.btns.addAgent))}

          </button>
        </Link>
      </div>
      {/* <Pagination
        totalPage={totalPage}
        handlePage={handelPage}
        currentPage={currentPage}
      /> */}
    </Layout>
  );
}

export default AgentsTable;
