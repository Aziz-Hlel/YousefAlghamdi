import ProtoTypes from "prop-types";

interface IimageCard {
  price: number | string;
  duration?: string;
  title: string;
  text: string;
  img: string;
}
function ImageCard({ price, duration, title, text, img }: IimageCard) {
  return (
    <div className="homec-image-gallery">
      {/* Amount Card  */}
      <div className="homec-amount-card homec-amount-card__sticky">
        <h4 className="homec-amount-card__amount">
          ${price}
          <span> {duration && duration}</span>
        </h4>
      </div>
      {/* End Amount Card  */}
      <div className="homec-overlay ">

      </div>
      <img src={img} alt="#" className=" h-[400px] object- w-[1170px]" />
      <div className="homec-image-gallery__bottom">
        <div className="homec-image-gallery__content">
          <h3 className="homec-image-gallery__title">{title}</h3>
          <p className="homec-image-gallery__text">
            <img src="/img/map-icon.svg" alt="#" />
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}

ImageCard.propTypes = {
  price: ProtoTypes.string.isRequired,
  duration: ProtoTypes.string.isRequired,
  title: ProtoTypes.string.isRequired,
  text: ProtoTypes.string.isRequired,
  img: ProtoTypes.string.isRequired,
};

export default ImageCard;
