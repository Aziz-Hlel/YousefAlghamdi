import { useAgents } from "@src/providers/AgentsProvider.context";
import { useAuth } from "@src/providers/AuthProvider.context";
import Http from "@src/services/Http";
import roles from "@src/types/roles.type";
import apiGateway from "@src/utils/apiGateway";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useMyPropertiesContext } from "../Dashboard2/MyProperties/MyPropertiesProvider.context";
import { useTranslation } from "react-i18next";
import getText from "@src/i18n/data/getText";
import { capitalizePhrase } from "@src/utils/capitalize_decapitalized";


type IUser = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  createdAt: string;
  role: string;
  clientInfo?: {
    agentId?: string | null;
  };
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


const UserView = () => {


  const { userId } = useParams();
  const { user } = useAuth()
  const [userInspected, setUserInspected] = useState<IUser>(initUser);
  const navigate = useNavigate();
  const { fetchProperties } = useMyPropertiesContext()
  const { t } = useTranslation(['data', 'common', 'dashboard']);


  const toggleModal = async () => {

    // setViewInvoice(!viewInvoice);


    const response = await Http.get(apiGateway.user.getById + userId);
    response?.status !== 200 && navigate("../")

    setUserInspected(response?.data.result);
    setCurrentAgent(response?.data.result.clientInfo?.agentId ?? null)

  };


  useEffect(() => {
    if (!userId) return
    console.log("ousl");

    toggleModal()
  }, [userId])


  const {
    firstName,
    lastName,
    phoneNumber,
    email,
    createdAt,
  } = userInspected;


  const [currentAgent, setCurrentAgent] = useState<string | null>(null)
  const { agents } = useAgents();
  const location = useLocation();


  const changeAgentOfUser = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (currentAgent === userInspected.clientInfo?.agentId)
      navigate("../");
    else {
      await Http.patch(apiGateway.user.updateAgent, {
        userId: userInspected._id,
        agentId: currentAgent,
      })
      fetchProperties(1);
      navigate("../");


    }
  }



  console.log("currentAgent", currentAgent);

  return (
    <div
      className={`homec-modal show modal`}
      style={{ display: true ? "block" : "" }}
    >
      <div className="homec-modal__width modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <Link
            type="button"
            className="homec-moal__close"

            to={"../"}
          >
            <svg
              width="22"
              height="23"
              viewBox="0 0 22 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.96538 11.4998C8.84252 11.3642 8.73942 11.243 8.62945 11.1289C5.9368 8.31163 3.24501 5.49253 0.546342 2.68062C0.107304 2.2226 -0.122954 1.71338 0.0660637 1.06407C0.359901 0.0591085 1.48284 -0.323477 2.28531 0.307878C2.42192 0.415649 2.5422 0.546769 2.66335 0.6734C5.31733 3.44669 7.97132 6.22088 10.6227 8.99687C10.7336 9.11272 10.8212 9.25282 10.9501 9.42166C11.1253 9.24743 11.2482 9.13068 11.3651 9.00854C14.0491 6.20292 16.7349 3.39909 19.4147 0.58898C19.8485 0.134548 20.3288 -0.124101 20.956 0.0600065C21.9346 0.347394 22.3212 1.5634 21.6975 2.40222C21.6012 2.53154 21.4844 2.6447 21.3727 2.76055C18.7101 5.54552 16.0467 8.33138 13.3807 11.1128C13.2707 11.2277 13.1264 11.3067 12.9743 11.4208C13.1539 11.622 13.2544 11.7414 13.3618 11.8546C16.0553 14.6719 18.7471 17.4901 21.4449 20.3029C21.8942 20.7717 22.1314 21.2944 21.9269 21.9607C21.6202 22.9576 20.4783 23.3222 19.693 22.6747C19.5702 22.5732 19.4619 22.4511 19.3511 22.3344C16.6876 19.5503 14.0242 16.7653 11.3599 13.9803C11.2499 13.8654 11.1357 13.7558 11.0051 13.6247C10.8788 13.7495 10.7636 13.8564 10.6545 13.9696C7.94812 16.7976 5.24087 19.6212 2.54306 22.4547C2.10918 22.9109 1.61515 23.104 1.02662 22.9325C0.0841064 22.6586 -0.300803 21.4902 0.265392 20.6549C0.37193 20.4978 0.508538 20.3604 0.639133 20.2229C3.30171 17.4371 5.96515 14.653 8.62859 11.868C8.7377 11.754 8.84252 11.6345 8.96538 11.4998Z"
                fill="#EB5757"
              ></path>
            </svg>
          </Link>
          <div className="homec-modal__inner">
            <div className="homec-header__logo">
              <a href="">
                <img src="/img/logo.jpg" alt="#" className="" />
              </a>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-12">
                <ul className="homec-modal__list list-none">
                  <li>
                    <span>{`${capitalizePhrase(t(getText.common.firstName))} : `}</span> {firstName}
                  </li>
                  <li>
                    <span>{`${capitalizePhrase(t(getText.common.lastName))} : `}</span> {lastName}
                  </li>
                  <li>
                    <span>{`${capitalizePhrase(t(getText.common.phoneNumber))} : `}</span> {phoneNumber}
                  </li>
                  <li>
                    <span>{`${capitalizePhrase(t(getText.common.email))} : `}</span> <a href={`mailto:${email}`}>{email}</a>
                  </li>
                  <li>
                    <span>Created at:</span> {createdAt}
                  </li>

                  {user?.role === roles.ADMIN && userInspected?.role !== roles.AGENT &&
                    <li>
                      <span>{`${capitalizePhrase(t(getText.common.sponsoredAgent))} : `} </span>

                      <select name="sponsoredAgent" value={currentAgent ?? ""} onChange={(e) => {

                        console.log("e.target.value", e.target.value);
                        ; setCurrentAgent(e.target.value)
                      }}>
                        {!userInspected.clientInfo?.agentId && <option value=""></option>}
                        {Object.keys(agents).map((agent) =>
                          <option value={agent} key={agent}>
                            {`${agents[agent].firstName} ${agents[agent].lastName}`}
                          </option>
                        )}

                      </select>
                    </li>
                  }
                  <li>
                    <div className=" w-full  flex justify-end">

                      {user?.role === roles.ADMIN && <button type="button" className="homec-invoice-table--btn w-20 h-10" onClick={changeAgentOfUser} >
                        {capitalizePhrase(t(getText.common.save))}
                      </button>}

                    </div>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}


export default UserView;
