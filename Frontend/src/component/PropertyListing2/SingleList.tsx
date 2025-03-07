import ProtoTypes from "prop-types";
function SingleList({ listing, place, img, link }: { listing: any, place: any, img: any, link: any }) {
  return (
    <div className="  hover:cursor-pointer">
      <div className=" " >

          <img src={img} alt="#" className="w-full object-cover h-full object-center block transition-transform duration-300 hover:scale-105"
          />
        <div className=""></div>
        <h4 className="homec-listing__title">
          <span>{listing}+ Listing</span>
          {place}
        </h4>
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
