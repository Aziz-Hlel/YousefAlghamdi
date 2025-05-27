import ProtoTypes from "prop-types";
import { Link } from "react-router-dom";

function AgentCardV2_2({ agentId, img, name, position, detailsLink: phoneNumber }: { agentId: string, img: string, name: string, position: string, detailsLink: any }) {
  return (
    <div className="group cursor-default" >
      <div className="relative overflow-hidden rounded-xl mb-4">
        <img
          src={img}
          alt="Team member"
          className="w-96 aspect-[3/4] object-cover object-center transform group-hover:scale-105 transition duration-300 ease-in-out"
        />

      </div>
      <div className="text-center">
        <h4 className="text-xl font-bold text-gray-800">{name}</h4>
        <p className="text-indigo-600 font-medium">{position}</p>
        <a href={`tel:${phoneNumber}`} className=" w-full"  >
          <div className=" text-center" dir="ltr">
            <div className="  flex  justify-center items-center rounded-full  w-full h-fit p-1.5 bg-[#ECEAFF] group-hover:bg-[#7166F0] hover:cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-telephone h-5 fill-gray-400 group-hover:fill-white duration-300 " viewBox="0 0 16 16">
                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
              </svg>
              <span className=" group-hover:text-white duration-300 text-gray-400">{phoneNumber}</span>
            </div>
          </div>

        </a>
      </div>
    </div>
  );
}

AgentCardV2_2.propTypes = {
  img: ProtoTypes.string.isRequired,
  propertiesLink: ProtoTypes.string.isRequired,
  name: ProtoTypes.string.isRequired,
  position: ProtoTypes.string.isRequired,
  detailsLink: ProtoTypes.string.isRequired,
};

export default AgentCardV2_2;
