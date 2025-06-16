import { useState } from "react";
import { useAuth } from "@src/providers/AuthProvider.context";
import roles from "@src/types/roles.type";
import UpdatePersonalInfo from "@src/component/ModalPersonalInfo/updatePersonalInfo";
import { useAgents } from "@src/providers/AgentsProvider.context";
import { useTranslation } from "react-i18next";
import getText from "@src/i18n/data/getText";
import { capitalizePhrase } from "@src/utils/capitalize_decapitalized";



function PersonalInfo() {
  const [modalOpen, setModalOpen] = useState(false);

  const { t } = useTranslation(['common', 'dashboard']);

  const { user } = useAuth();
  const { agents } = useAgents();
  if (!user) return null;

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  return (
    <div className="col-lg-9 col-md-8 col-12 mg-top-30">
      <div className="homec-dashboard__inner homec-border">
        <h3 className="homec-dashboard__heading">{capitalizePhrase(t(getText.dashboard.personalInfo.title))}</h3>
        <div className="row">
          <UpdatePersonalInfo
            isModalOpen={modalOpen}
            toggleModal={toggleModal}
          />
          {(user.role === roles.AGENT) && <div className="col-lg-6 col-12 ">
            <div className="homec-agent-detail__img w-full h-full flex justify-center ">

              {/* <img src="https://placehold.co/360x390" alt="#" /> */}

              <div className=" w-8/12   h-72 object-fill flex  justify-center  items-center  bg-[#f7f7fd] cursor-pointer rounded-md overflow-hidden  bg-center  bg-cover  bg-no-repeat "
                style={{ backgroundImage: `url(${agents[user!.id].agentInfo!.imageGallery.mainImage.url})` }} />
            </div>
          </div>}
          <div className="col-lg-6 col-12">
            <div className="homec-agent-detail__body">
              <h3 className="homec-agent-detail__title">{`${user.firstName} ${user.lastName}`}</h3>
              <p>{user.role !== roles.USER && capitalizePhrase(t(getText.common.roles[user.role as keyof typeof getText.common.roles]))}</p>
            </div>
            <ul className="homec-agent-detail__list mg-top-30">
              <li >
                <img src="/img/agent-phone.svg" alt="#" />
                <span dir="ltr">{user.phoneNumber}</span>
              </li>
              <li>
                <img src="/img/agent-email.svg" alt="#" />{" "}
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </li>

            </ul>
          </div>
        </div>
      </div>
      <div className="row mg-top-30">
        <div className="col-12 d-flex justify-content-end">
          <a
            className="homec-btn homec-btn__second"
            data-bs-toggle="modal"
            data-bs-target="#profile_view"
            onClick={toggleModal}
          >
            <span>{capitalizePhrase(t(getText.dashboard.personalInfo.btn))}</span>
          </a>
        </div>
      </div>
    </div >
  );
}

export default PersonalInfo;
