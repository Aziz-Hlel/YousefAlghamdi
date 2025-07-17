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

const Currency = () => {

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1000"
      height="870"
      version="1.2"
      viewBox="0 0 1000 870"
      className="h-8 w-4 fill-[#7166F0] "
    >
      <path
        id="Layer copy"
        d="M88.3 1c.4.6 2.6 3.3 4.7 5.9 15.3 18.2 26.8 47.8 33 85.1 4.1 24.5 4.3 32.2 4.3 125.6v87H88.5c-38.2 0-42.6-.2-50.1-1.7-11.8-2.5-24-9.2-32.2-17.8-6.5-6.9-6.3-7.3-5.9 13.6.5 17.3.7 19.2 3.2 28.6 4 14.9 9.5 26 17.8 35.9 11.3 13.6 22.8 21.2 39.2 26.3 3.5 1 10.9 1.4 37.1 1.6l32.7.5v86.7l-46.1-.3-46.3-.3-8-3.2c-9.5-3.8-13.8-6.6-23.1-14.9L0 453.5l.4 19.1c.5 17.7.6 19.7 3.1 28.7 8.7 31.8 29.7 54.5 57.4 61.9 6.9 1.9 9.6 2 38.5 2.4l30.9.4v89.6c0 54.1-.3 94-.8 100.8-.5 6.2-2.1 17.8-3.5 25.9-6.5 37.3-18.2 65.4-35 83.6l-3.4 3.7h169.1c101.1 0 176.7-.4 187.8-.9 19.5-1 63-5.3 72.8-7.4 3.1-.6 8.9-1.5 12.7-2.1 8.1-1.2 21.5-4 40.8-8.9 27.2-6.8 52-15.3 76.3-26.1 7.6-3.4 29.4-14.5 35.2-18 3.1-1.8 6.8-4 8.2-4.7 3.9-2.1 10.4-6.3 19.9-13.1 4.7-3.4 9.4-6.7 10.4-7.4 4.2-2.8 18.7-14.9 25.3-21 25.1-23.1 46.1-48.8 62.4-76.3 2.3-4 5.3-9 6.6-11.1 3.3-5.6 16.9-33.6 18.2-37.8.6-1.9 1.4-3.9 1.8-4.3 2.6-3.4 17.6-50.6 19.4-60.9.6-3.3.9-3.8 3.4-4.3 1.6-.3 24.9-.3 51.8-.1 53.8.4 53.8.4 65.7 5.9 6.7 3.1 8.7 4.5 16.1 11.2 9.7 8.7 8.8 10.1 8.2-11.7-.4-12.8-.9-20.7-1.8-23.9-3.4-12.3-4.2-14.9-7.2-21.1-9.8-21.4-26.2-36.7-47.2-44l-8.2-3-33.4-.4-33.3-.5.4-11.7c.4-15.4.4-45.9-.1-61.6l-.4-12.6 44.6-.2c38.2-.2 45.3 0 49.5 1.1 12.6 3.5 21.1 8.3 31.5 17.8l5.8 5.4v-14.8c0-17.6-.9-25.4-4.5-37-7.1-23.5-21.1-41-41.1-51.8-13-7-13.8-7.2-58.5-7.5-26.2-.2-39.9-.6-40.6-1.2-.6-.6-1.1-1.6-1.1-2.4s-1.5-7.1-3.5-13.9c-23.4-82.7-67.1-148.4-131-197.1-8.7-6.7-30-20.8-38.6-25.6-3.3-1.9-6.9-3.9-7.8-4.5-4.2-2.3-28.3-14.1-34.3-16.6-3.6-1.6-8.3-3.6-10.4-4.4C593.2 23.8 534 9.3 488.8 4.8c-7.4-.7-17.2-1.8-21.7-2.2C446.7.3 418.4 0 257.7 0 121.9 0 87.8.3 88.3 1M419 44.3c33.8 2 54.6 4.6 78.9 10.5 74.2 17.6 126.4 54.8 164.3 117 3.5 5.8 18.3 36 20.5 42.1 10.5 28.3 15.6 45.1 20.1 67.3 1.1 5.4 2.6 12.6 3.3 16 .7 3.3 1 6.4.7 6.7-.5.4-100.9.6-223.3.5l-222.5-.2-.3-128.5c-.1-70.6 0-129.3.3-130.4l.4-1.9h71.1c39 0 78 .4 86.5.9m297.5 350.3c.7 4.3.7 77.3 0 80.9l-.6 2.7-227.5-.2-227.4-.3-.2-42.4c-.2-23.3 0-42.7.2-43.1.3-.5 97.2-.8 227.7-.8h227.2zm-10.2 171.7c.5 1.5-1.9 13.8-6.8 33.8-5.6 22.5-13.2 45.2-20.9 62-3.8 8.6-13.3 27.2-15.6 30.7-1.1 1.6-4.3 6.7-7.1 11.2-18 28.2-43.7 53.9-73 72.9-10.7 6.8-32.7 18.4-38.6 20.2-1.2.3-2.5.9-3 1.3-.7.6-9.8 4-20.4 7.8-19.5 6.9-56.6 14.4-86.4 17.5-19.3 1.9-22.4 2-96.7 2h-76.9V566.2l220.9-.4c121.5-.2 221.6-.5 222.4-.7.9-.1 1.8.5 2.1 1.2"
      ></path>
    </svg>
  )
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
            <div className="homec-property__price flex items-center">
              <Currency />
              {property.filterFields.price} <span>{property.listing_type.includes("rent") && "/" + t(getText.data[property.listing_period as keyof typeof getText.data])}</span>
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
