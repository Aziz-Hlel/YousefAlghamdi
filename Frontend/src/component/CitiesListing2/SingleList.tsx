import ProtoTypes from "prop-types";
import { Link } from "react-router-dom";
function SingleList({ listing, place, img, link }: { listing: any, place: any, img: any, link: any }) {
  return (
    <Link to={link} className=" lg:flex-1 hover:cursor-pointer transition-transform duration-300 hover:scale-105">
        <div className="shrink-0 relative rounded-xl overflow-hidden w-full h-full before:absolute before:inset-x-0 before:z-1 before:size-full before:bg-linear-to-t before:from-gray-900/70">

          <img src={img} alt="#" className="  object-cover  min-w-full min-h-full transition-transform duration-300 hover:scale-105"
          />

          <h4 className="homec-listing__title z-20 top-9/12 pl-5 text-sm  ">
            <span>{listing}+ Listing</span>
            {place}
          </h4>
          <div className=" h-full homec-listing__title ">
          </div>
      </div>
    </Link>
  );
}



export default SingleList;
