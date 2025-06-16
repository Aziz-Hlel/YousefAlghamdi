
import { Link } from "react-router-dom";

type IHeroSliderSlide = {
  link: string,
  img: string,
  price: string,
  pricePeriod: string,
  title: string,
  propertyText: string,
  propertyImg: string,
  propertyList: any,
}

function HeroSliderSlide({ link, img, price, pricePeriod, title, propertyText, propertyImg, propertyList, }: IHeroSliderSlide) {
  return (
    <div className="swiper-slide px-2" style={{ marginBottom: "50px" }}>
      {/* Single property */}
      <Link to={link} className="homec-property homec-property__card">
        {/* Property Head */}
        <div className="homec-property__head">
          <div className="homec-overlay"></div>
          <div className="w-[29rem]  h-[28rem] flex  justify-center  items-center  bg-[#f7f7fd] cursor-pointer rounded-md overflow-hidden  bg-center  bg-cover  bg-no-repeat "
            style={{
              backgroundImage: (img ? `url(${img})` : "url('https://placehold.co/1720x1420')"),
            }}

          >

          </div>
        </div>
        {/* Property Body  */}
        <div className="homec-property__body">
          <div className="homec-property__body--inside">
            <div className="homec-property__price">
              ${price} <span>/{pricePeriod}</span>
            </div>
            <h3 className="homec-property__title">{title}</h3>
            <div className="homec-property__text">
              <img src={propertyImg} alt="#" />
              <p>{propertyText}</p>
            </div>
            {/* Property List */}
            <ul className="homec-property__list homec-border-top list-none">
              {propertyList?.map((property: any, index: number) => (
                <li key={index} >
                  <img src={property.img} alt="#" />
                  {property.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Link>
      {/* End Single property */}
    </div>
  );
}





export default HeroSliderSlide;
