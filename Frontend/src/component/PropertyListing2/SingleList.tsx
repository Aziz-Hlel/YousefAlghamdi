import ProtoTypes from "prop-types";
function SingleList({ listing, place, img, link }: { listing: any, place: any, img: any, link: any }) {
  return (
    <div className="  hover:cursor-pointer transition-transform duration-300 hover:scale-105">
      <div className=" " >

          <img src={img} alt="#" className="w-full object-cover h-full object-center block transition-transform duration-300 hover:scale-105"
          />

        <h4 className="homec-listing__title z-20 top-8/12 pl-5 text-sm  ">
          <span>{listing}+ Listing</span>
          {place}
        </h4>
        <div className=" h-full homec-listing__title bg-gray-200 opacity-75  w-full  bg-gradient-to-t from-gray-500 to-gray-50">
        </div>
      </div>
    </div>
  );
}

SingleList.propTypes = {
  listing: ProtoTypes.string.isRequired,
  place: ProtoTypes.string.isRequired,
  img: ProtoTypes.string.isRequired,
  link: ProtoTypes.string.isRequired,
};

export default SingleList;
