import ProtoTypes from "prop-types";
function AboutShapeImg({ img, design }) {
  return (
    <div className={`group block homec-shape-single ${design}`}>
      <img src={img} alt="#" className=" group-hover:scale-105" />
    </div>
  );
}

AboutShapeImg.propTypes = {
  img: ProtoTypes.string.isRequired,
  design: ProtoTypes.string.isRequired,
};

export default AboutShapeImg;
