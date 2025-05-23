import AgentCardV2 from "../Cards/AgentCardV2";
import AboutShapeImg from "../About/AboutShapeImg";
import agents from "../../data/agents";
import AgentCardV2_2 from "../Cards/AgentCardV2_2";

const Agents = () => {




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
        <div className="row">
          <div className="col-lg-8 offset-lg-2 col-md-8 offset-md-2 col-12">
            <div className="homec-section__head text-center mg-btm-30">

              <h2
                className="homec-section__title"
                data-aos="fade-in"
                data-aos-delay="400"
              >
                Meet Our Properties Agents
              </h2>
            </div>
          </div>
        </div>
        <div className="flex  items-center flex-col lg:flex-row ">

          {agents?.map((agent) => (
            <AgentCardV2_2
              formkey={agent.id}
              img={agent.img}
              name={agent.name}
              position={agent.position}
              propertiesLink={agent.propertiesLink}
              detailsLink={agent.detailsLink}
              key={agent.id}
            />

          ))}

        </div>
      </div>
    </section>
  );
}

export default Agents;
