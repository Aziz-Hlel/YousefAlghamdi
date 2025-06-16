import ProtoTypes from "prop-types";

function ThumbnailsCard({ img }:{  img: string }) {
  return (
    <div style={{ margin: "10px" }}>
      <div className="single-thumbs">
        <img src={img} alt="thumbs" />
      </div>
    </div>
  );
}

ThumbnailsCard.propTypes = {
  img: ProtoTypes.string.isRequired,
};

export default ThumbnailsCard;
