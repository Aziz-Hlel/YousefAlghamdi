import ProtoTypes from "prop-types";
import { Link } from "react-router-dom";
function SingleList({ listing, place, img, link }: { listing: any, place: any, img: any, link: any }) {
  return (
    <Link to={link} className=" lg:flex-1 hover:cursor-pointer transition-transform duration-300 hover:scale-105">
      <div className=" w-full h-full " >

          <img src={img} alt="#" className="  object-cover  min-w-full min-h-full transition-transform duration-300 hover:scale-105"
          />

          <h4 className="homec-listing__title z-20 top-8/12 pl-5 text-sm  ">
            <span>{listing}+ Listing</span>
            {place}
          </h4>
          <div className=" h-full homec-listing__title bg-gray-200 opacity-75  w-full  bg-gradient-to-t from-gray-500 to-gray-50">
          </div>
      </div>
    </Link>
  );
}



export default SingleList;
