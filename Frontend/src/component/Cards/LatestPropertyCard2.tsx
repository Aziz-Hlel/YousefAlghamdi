import getText from "@src/i18n/data/getText";
import Iproperty from "@src/models/property.type";
import { capitalizePhrase } from "@src/utils/capitalize_decapitalized";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface ILatestPropertyCard {
  property: Iproperty;
  style: any,
  classes: string,
  view: string,

}

const atrToImg = {
  rooms: "/img/room-icon.svg",
  bathroom: "/img/bath-icon.svg",
  square: "/img/size-icon.svg",

}




function LatestPropertyCard({ property, style, classes, view, }: ILatestPropertyCard) {



  const { t } = useTranslation(['data', 'home', 'common']);

  let listingDisplay = capitalizePhrase(t(getText.data[property.listing_type as keyof typeof getText.data]))

  // property.listing_type.includes("rent") && (listingDisplay += " " + t(getText.data[property.listing_period as keyof typeof getText.data]));
  // property.listing_type.includes("rent") ? console.log("include rent ");


  return (
    <div
      className={` ${classes ? classes : "col-lg-4 col-md-6 col-12 mg-top-30"}`}
      data-aos="fade-up"
      data-aos-delay="800"
      style={style}
    >
      {/* Single property */}
      < div
        className={`homec-property [@media(min-width:500px)]:w-fit md:w-auto ${view === "list" && "homec-property__list-style"
          }`
        }
      >
        {/* Property Head  */}
        < div className="homec-property__head " >
          <Link to={"/property-single/" + property.id}>

            <img src={property.imageGallery.images[0].url} alt="#" className="  w-fit" />
            {/* Top Sticky  */}
            {/* <div className="homec-property__hsticky">
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

            </div> */}
          </Link>
          {/* End Top Sticky  */}
        </div >
        {/* Property Body */}
        < div className="homec-property__body [@media(min-width:500px)]:w-fit md:w-auto" >
          <div className="homec-property__topbar">
            <div className="homec-property__price">
              ${property.filterFields.price} <span>{property.listing_type.includes("rent") && "/" + t(getText.data[property.listing_period as keyof typeof getText.data])}</span>
            </div>

            <div className=" flex justify-center items-center  [@media(min-width:500px)]:w-fit md:w-auto ">
              {property.listing_type.includes("sale") ?
                <span className="homec-property__salebadge pr-0 mr-0">{listingDisplay}</span> :
                <span className="  bg-violet-200 text-xs py-1 px-2 rounded-xl">{listingDisplay}</span>}

            </div>

          </div>
          <h3 className="homec-property__title">
            <Link to={"/property-single/" + property.id}>
              {property.title}
            </Link>
          </h3>
          <div className="homec-property__text">
            <img src="/img/location-icon.svg" alt="#" />
            <p>{`${capitalizePhrase(t(getText.data[property.city as keyof typeof getText.data]))}, ${capitalizePhrase(t(getText.data[property.delegation as keyof typeof getText.data]))}, ${property.addresse}`}</p>
          </div>
          {/* Property List */}
          <ul className="homec-property__list homec-border-top list-none ">

            {property.filterFields.rooms && <li className=" h-fit mx-0 p-0">
              <img src={atrToImg.rooms} alt="#" className=" " />
              <span className=" sm:text-sm sm:font-medium">
                {property.filterFields.rooms} {capitalizePhrase(t(getText.data.rooms))}
              </span>

            </li>}
            {property.filterFields.bathrooms && <li>
              <img src={atrToImg.bathroom} alt="#" className=" " />
              <span className=" sm:text-sm sm:font-medium">
                {property.filterFields.bathrooms} {capitalizePhrase(t(getText.data.bathrooms))}
              </span>
            </li>}
            {property.filterFields.area && <li>
              <img src={atrToImg.square} alt="#" className=" " />
              <span className=" sm:text-sm sm:font-medium">

                {property.filterFields.area} {t(getText.data.m2)}
              </span>
            </li>}
            {/* {detailsList?.map((details: any, index: number) => (
              <li key={details.name + index}>
                <img src={details.img} alt="#" />
                {details.name}
              </li>
            ))} */}
          </ul>
        </div >
      </div >
      {/* End Single property */}
    </div >
  );
}


export default LatestPropertyCard;
