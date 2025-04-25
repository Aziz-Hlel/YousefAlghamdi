import DownloadApp from "../DownloadApp";
import Footer from "../Footer";
import HistoryLinks from "../Breadcrumbs/HistoryLinks";
import Breadcrumbs from "../Breadcrumbs";
import Header from "../Header";
import GoTopBtn from "../Button/GoTopBtn";
import AgentDetailCard from "../Cards/AgentDetailCard2";
import PropertyAgents from "../Agents/PropertyAgents2";
import { useEffect, useState } from "react";
import Pagination from "../Pagination";
import LatestPropertyCard from "../Cards/LatestPropertyCard";
import PropertyBar from "../Property/PropertyBar";
import Preloader from "../Loader";
import React from "react";
import { useAgents } from "@src/providers/AgentsProvider.context";
import { useParams } from "react-router-dom";
import ErrorPage from "../Error";

function AgentDetail() {

  // Loading Handeler

  const [isLoading, setisLoadingg] = useState(true);
  useEffect(() => {
    setisLoadingg(false);
  }, []);
  const { agentId } = useParams();
  const { agents } = useAgents();

  if (agentId !== undefined && !Object.keys(agents).includes(agentId))
    return <ErrorPage />

  const agent = agents[agentId!];
  let component: any = undefined;
  if (isLoading) {
    component = <Preloader />;
  } else {
    component = (
      <>

        <Breadcrumbs title="Our Agents Details" titlePosition="bottom" background={""} overlay={false} >
          <HistoryLinks link="/home" text="Home" isActive={false} />
          <HistoryLinks
            link="/agent-detail"
            text="Agents Details"
            isActive={true}
          />
        </Breadcrumbs>
        <section className="pd-top-70 pd-btm-100">
          <div className="container">
            <div className="row">

              <AgentDetailCard
                image="https://placehold.co/360x390"
                position="Real Estate Broker"
                phone="#"
                linkedin="#"
                twitter="#"
                instagram="#"
              />
              <PropertyAgents
                image="https://placehold.co/500x500"
                name={`${agent.firstName} ${agent.lastName}`}
                position="Real Estate Broker"
              />
            </div>


          </div>
        </section>
        <DownloadApp />
        <GoTopBtn />
      </>
    );
  }
  return component;
}

export default AgentDetail;
