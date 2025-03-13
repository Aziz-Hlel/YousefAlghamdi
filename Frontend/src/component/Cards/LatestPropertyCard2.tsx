import { Link } from "react-router-dom";

interface ILatestPropertyCard {
  _id: string,
  img: string,
  likeLink: string,
  detailsLink: string,
  price: number,
  period: string,
  whatFor: string,
  propertyLink: string,
  name: string,
  address: string,
  detailsList: any,
  style: any,
  classes: string,
  view: string,

}

const atrToImg = {
  room: "img/room-icon.svg",


}

function LatestPropertyCard({ _id, img, likeLink, detailsLink, price, period, whatFor, propertyLink, name, address, detailsList, style, classes, view, }: ILatestPropertyCard) {



  return (
    <div
      className={` ${classes ? classes : "col-lg-4 col-md-6 col-12 mg-top-30"}`}
      data-aos="fade-up"
      data-aos-delay="800"
      style={style}
    >
      {/* Single property */}
      <div
        className={`homec-property ${view === "list" && "homec-property__list-style"
          }`}
      >
        {/* Property Head  */}
        <div className="homec-property__head">
          <Link to={"/property-single/" + _id}>
            <img src={img} alt="#" />
          </Link >
          {/* Top Sticky  */}
          <div className="homec-property__hsticky">
            <a href={likeLink} className="homec-heart">
              <svg
                width="23"
                height="20"
                viewBox="0 0 23 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.5745 3.73257L11.1008 4.69447L11.6272 3.73258C11.9704 3.10535 12.5438 2.26267 13.3886 1.60933C14.2595 0.935774 15.2355 0.6 16.3044 0.6C19.29 0.6 21.6017 3.03446 21.6017 6.3966C21.6017 8.18186 20.8932 9.70959 19.5597 11.3187C18.211 12.9462 16.2694 14.6033 13.8617 16.6552L14.2508 17.1119L13.8617 16.6552L13.8611 16.6557C13.0479 17.3487 12.1237 18.1363 11.1625 18.9769L11.1623 18.977C11.1457 18.9916 11.1241 18.9999 11.1008 18.9999C11.0776 18.9999 11.056 18.9916 11.0394 18.9771L11.0391 18.9768C10.0784 18.1367 9.15452 17.3493 8.34203 16.6569L8.34054 16.6556L8.34053 16.6556C5.93251 14.6035 3.99081 12.9463 2.64202 11.3188C1.30844 9.70958 0.6 8.18186 0.6 6.3966C0.6 3.03446 2.91167 0.6 5.89732 0.6C6.96614 0.6 7.94219 0.935773 8.81311 1.60933C9.6579 2.26267 10.2313 3.10532 10.5745 3.73257Z"
                  strokeWidth="1.2"
                />
              </svg>
            </a>

          </div>
          {/* End Top Sticky  */}
        </div>
        {/* Property Body */}
        <div className="homec-property__body">
          <div className="homec-property__topbar">
            <div className="homec-property__price">
              ${price} <span>/{period}</span>
            </div>

            <div className=" flex justify-center items-center gap-2 ">
              <span className="homec-property__salebadge pr-0 mr-0">{whatFor}</span>
              {(name === "Brand New Shopping Mall" || name === "Countryside Lake View")
                && <span className="  bg-violet-200 text-xs py-1 px-2 rounded-xl">To rent</span>}
            </div>

          </div>
          <h3 className="homec-property__title">
            <Link to={"/property-single/" + _id}>
              {name.length > 22 ? name : name}
            </Link>
          </h3>
          <div className="homec-property__text">
            <img src="img/location-icon.svg" alt="#" />
            <p>{address}</p>
          </div>
          {/* Property List */}
          <ul className="homec-property__list homec-border-top list-none">
            {detailsList?.map((details: any, index: number) => (
              <li key={details.name + index}>
                <img src={details.img} alt="#" />
                {details.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* End Single property */}
    </div >
  );
}


export default LatestPropertyCard;
