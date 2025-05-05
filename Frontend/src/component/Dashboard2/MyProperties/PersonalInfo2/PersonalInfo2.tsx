import { useState } from "react";
import { useAuth } from "@src/providers/AuthProvider.context";
import roles from "@src/types/roles.type";
import agent1 from "@src/assets/img/agents/agent4.jpg"
import AgentAddOns from "./AgentAddOns";
import UpdatePersonalInfo from "@src/component/ModalPersonalInfo/updatePersonalInfo";

const AboutComp = ({ about }: { about: string }) => {



  return (
    <div className="homec-agent-detail__sticky">
      <div className="homec-agent-detail__inside">
        <div className="homec-agent-detail__sticky--heading">
          <h2 className="homec-agent-detail__sticky--title">About Me</h2>
        </div>
        <p className="homec-agent-detail__sticky--text">
          {about}
        </p>
      </div>
    </div>
  );
};

function PersonalInfo() {
  const [modalOpen, setModalOpen] = useState(false);

  const { user } = useAuth()

  if (!user) return null;

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  return (
    <div className="col-lg-9 col-md-8 col-12 mg-top-30">
      <div className="homec-dashboard__inner homec-border">
        <h3 className="homec-dashboard__heading">Personal Info</h3>
        <div className="row">
          <UpdatePersonalInfo
            isModalOpen={modalOpen}
            toggleModal={toggleModal}
          />
          <div className="col-lg-6 col-12 ">
            <div className="homec-agent-detail__img w-full h-full flex justify-center ">

              {/* <img src="https://placehold.co/360x390" alt="#" /> */}

              <div className=" w-8/12   h-72 object-fill flex  justify-center  items-center  bg-[#f7f7fd] cursor-pointer rounded-md overflow-hidden  bg-center  bg-cover  bg-no-repeat "
                style={{
                  backgroundImage: (agent1 ? `url(${agent1})` : "url('https://placehold.co/1720x1420')"),
                }}
              >

              </div>
            </div>
          </div>
          <div className="col-lg-6 col-12">
            <div className="homec-agent-detail__body">
              <h3 className="homec-agent-detail__title">{`${user.firstName} ${user.lastName}`}</h3>
              <p>{user.role !== roles.USER && user.role}</p>
            </div>
            <ul className="homec-agent-detail__list mg-top-30">
              <li>
                <img src="/img/agent-phone.svg" alt="#" /> {user.phoneNumber}
              </li>
              <li>
                <img src="/img/agent-email.svg" alt="#" />{" "}
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </li>
              {/* <li>
                <img src="/img/agent-location.svg" alt="#" /> 2972 Westheimer Rd.
                Santa Ana, Illinois 85486{" "}
              </li> */}
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
            <span>Edit Profile</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default PersonalInfo;
