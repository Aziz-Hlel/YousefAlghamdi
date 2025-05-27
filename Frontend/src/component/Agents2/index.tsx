import { useTranslation } from "react-i18next";
import AboutShapeImg from "../About/AboutShapeImg";
import AgentCardV2_2 from "../Cards/AgentCardV2_2";
import { useAgents } from "@src/providers/AgentsProvider.context";
import { capitalizePhrase } from "@src/utils/capitalize_decapitalized";
import getText from "@src/i18n/data/getText";


const Agents = () => {

  const { agents } = useAgents();

  const { t } = useTranslation(['home', 'common']);
  { capitalizePhrase(t(getText.common.test)) }


  return (
    <section className="homec-about homec-bg-third-color pd-top-120 pd-btm-120">
      <div className="homec-shape">
        <AboutShapeImg img="/img/anim-shape-1.svg" design="homec-shape-1" />
        <AboutShapeImg img="/img/anim-shape-2.svg" design="homec-shape-2" />
        <AboutShapeImg img="/img/anim-shape-3.svg" design="homec-shape-3" />
        <AboutShapeImg img="/img/anim-shape-1.svg" design="homec-shape-1" />
        <AboutShapeImg img="/img/anim-shape-2.svg" design="homec-shape-2" />
        <AboutShapeImg img="/img/anim-shape-3.svg" design="homec-shape-3" />
      </div>

      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {capitalizePhrase(t(getText.home.Agents.title))}


          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto mb-6 rounded-full" />
          <p className="text-gray-600 text-lg">
            {capitalizePhrase(t(getText.home.Agents.description))}
          </p>
        </div>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"> */}
        <div className="lg:flex gap-8  lg:justify-center  grid grid-cols-1 sm:grid-cols-2
      ">
          {agents && Object.keys(agents)?.map((agentId, index) => {
            const agent = agents[agentId];
            return <AgentCardV2_2
              key={agent._id}
              agentId={agent._id}
              img={agent.agentInfo.imageGallery.mainImage.url}
              name={`${agent.firstName} ${agent.lastName}`}
              position={capitalizePhrase(t(getText.home.Agents.realEstateBroker))}
              detailsLink={agent.phoneNumber}
            />

          })}




        </div>
      </div>
    </section>
  );
}

export default Agents;
