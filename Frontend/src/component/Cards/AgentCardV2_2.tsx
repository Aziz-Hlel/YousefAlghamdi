import ProtoTypes from "prop-types";
import { Link } from "react-router-dom";

function AgentCardV2_2({ img, propertiesLink, name, position, detailsLink }: { img: any, propertiesLink: any, name: any, position: any, detailsLink: any }) {
  return (
    <div
      className=" col-lg-4 col-md-6 col-12 mg-top-30 flex items-center justify-center  transition-transform transform hover:animate-hoverUp  "
      data-aos="fade-in"
      data-aos-delay="1000"
      
    >
      {/* Single agent */}
      <div className="group  bg-white w-72 py-2.5 pl-5  rounded-lg shadow-xl ease-in duration-1000  ">


        <div className="flex ">


          <div className="  rounded-2xl overflow-hidden">
            <img src={img} alt="#" className=" group-hover:scale-105 rounded-2xl" />
          </div>

          <div className=" flex flex-col  ml-5 gap-1.5">

            <div className="  rounded-full  w-fit h-fit p-1.5 bg-[#ECEAFF] hover:bg-[#7166F0] hover:cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" className=" fill-gray-400" viewBox="0 0 1920 1920" >
                <path d="M1168 601.321v74.955c72.312-44.925 155.796-71.11 282.643-71.11 412.852 0 465.705 308.588 465.705 577.417v733.213L1438.991 1920v-701.261c0-117.718-42.162-140.06-120.12-140.06-74.114 0-120.12 23.423-120.12 140.06V1920l-483.604-4.204V601.32H1168zm-687.52-.792v1318.918H0V600.53h480.48zm-120.12 120.12H120.12v1078.678h240.24V720.65zm687.52.792H835.267v1075.316l243.364 2.162v-580.18c0-226.427 150.51-260.18 240.24-260.18 109.55 0 240.24 45.165 240.24 260.18v580.18l237.117-2.162v-614.174c0-333.334-93.573-457.298-345.585-457.298-151.472 0-217.057 44.925-281.322 98.98l-16.696 14.173H1047.88V721.441zM240.24 0c132.493 0 240.24 107.748 240.24 240.24 0 132.493-107.747 240.24-240.24 240.24C107.748 480.48 0 372.733 0 240.24 0 107.748 107.748 0 240.24 0zm0 120.12c-66.186 0-120.12 53.934-120.12 120.12s53.934 120.12 120.12 120.12 120.12-53.934 120.12-120.12-53.934-120.12-120.12-120.12z" fillRule="evenodd" />
              </svg>
            </div>

            <div className="  rounded-full  w-fit h-fit p-1.5 bg-[#ECEAFF] hover:bg-[#7166F0] hover:cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" className="bi bi-instagram fill-gray-400 " viewBox="0 0 16 16">
                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
              </svg>
            </div>

            <div className="  rounded-full  w-fit h-fit p-1.5 bg-[#ECEAFF] hover:bg-[#7166F0] hover:cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" className="bi bi-telephone fill-gray-400 " viewBox="0 0 16 16">
                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
              </svg>
            </div>

            <div className="  rounded-full  w-fit h-fit p-1.5 bg-[#ECEAFF] hover:bg-[#7166F0] hover:cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" className="bi bi-twitter-x fill-gray-400" viewBox="0 0 16 16">
                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
              </svg>
            </div>


          </div>

          <h4 className=" absolute  bottom-0 bg-white translate-y-4 rounded-tl-xl  pl-5 pt-3 w-fit translate-x-16">

            <div className=" group-hover:text-[#7166F0]  text-xl">
              <div>{name}</div>

              <span className=" text-gray-500 text-sm font-thin" >{position}</span>
            </div>
          </h4>


        </div>
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
