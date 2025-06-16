import { useAuth } from "@src/providers/AuthProvider.context";
import roles from "@src/types/roles.type";
import { Link } from "react-router-dom";
import { useSponsorsContext } from "./Sponsors.provider";
import apiGateway from "@src/utils/apiGateway";
import { pickRandomPhoto } from "@src/pickRandomPhoto";
import { Alert, ConfirmationAlertAsync } from "@src/utils/createAlert";
import Http from "@src/services/Http";
import getText from "@src/i18n/data/getText";
import { capitalizePhrase } from "@src/utils/capitalize_decapitalized";
import { useTranslation } from "react-i18next";


type IDashboardPropertyCard = {
  _id: string;
  logoUrl: string;
  name: string;
  url: string;
};


function SponsorsCard({ _id, logoUrl, name, url, }: IDashboardPropertyCard) {

  const { getSponsors } = useSponsorsContext()
  const { t } = useTranslation(["common", "dashboard", "alerts"]);

  const handleDeleteProperty = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const response = await ConfirmationAlertAsync({
      title: capitalizePhrase(t(getText.alerts.sponsors.delete.confimationAlert.title)),
      text: capitalizePhrase(t(getText.alerts.sponsors.delete.confimationAlert.description)),
      icon: "warning",
    })
    if (response.isConfirmed) {
      const response = await Http.delete(`${apiGateway.sponsor.delete}/${_id}`);
      if (response?.status === 200)

        Alert({
          title: capitalizePhrase(t(getText.alerts.sponsors.delete.sucsessAlert.title)),
          icon: "success",
          text: capitalizePhrase(t(getText.alerts.sponsors.delete.sucsessAlert.description)),
        })
      else alert("something went wrong");

      getSponsors()


    }
  }





  return (
    <div className="homec-dashboard-property mg-top-30">

      {/* Property IMG */}
      <div className="homec-dashboard-property__img">
        <img src={logoUrl} alt="#" title={name} />
        {/* Property Content */}
        <div className="homec-dashboard-property__content">
          <div className="homec-dashboard-property__badge"> {`-  ${capitalizePhrase(t(getText.dashboard.sponsors.sponsor))}`}</div>
          <h3 className="homec-dashboard-property__title">{name}</h3>
          <div className="homec-property__text">

            <a href={url} target="_blank" rel="noopener noreferrer" >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className=" " width="16" color="#7065F0">
                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M11 4H4V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V13"
                    stroke="#7065F0"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                  <path
                    d="M9 15L20 4"
                    stroke="#7065F0"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                  <path
                    d="M15 4H20V9"
                    stroke="#7065F0"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </g>
              </svg>
            </a>

            <p>{url}</p>
          </div>

        </div>
      </div>
      {/* Property Button */}
      <div className="homec-dashboard-property__buttons ">



        <button className="homec-dashboard-property__btn px-2  homec-dashboard-property__btn--edit  flex justify-center items-center">

          {
            <Link to={`edit-sponsor/${_id}`}>

              <div className="flex  justify-center  items-center">

                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11.5401 12.732C11.3622 12.9097 11.1425 13.0456 10.9043 13.125L8.6037 13.8918C8.43767 13.9472 8.26451 13.9753 8.08933 13.9753C7.65479 13.9753 7.24626 13.8061 6.93903 13.4988C6.50051 13.0602 6.34998 12.4224 6.54609 11.8341L7.31296 9.53366C7.39231 9.2954 7.52823 9.07547 7.7059 8.8978L12.6748 3.92896H2.95305C1.85675 3.92896 0.964844 4.82086 0.964844 5.91716V17.4849C0.964844 18.5812 1.85675 19.4731 2.95305 19.4731H14.5208C15.6171 19.4731 16.509 18.5812 16.509 17.4849V7.76315L11.5401 12.732Z" />
                  <path d="M8.47256 9.66509C8.41302 9.72463 8.3682 9.79718 8.34159 9.87704L7.57472 12.1775C7.50976 12.3724 7.56048 12.5872 7.70569 12.7324C7.85094 12.8777 8.06574 12.9284 8.26058 12.8634L10.5611 12.0966C10.641 12.07 10.7135 12.0251 10.7731 11.9656L17.5468 5.19185L15.2463 2.89136L8.47256 9.66509Z" />
                  <path d="M18.1844 1.22954C17.8315 0.876613 17.2593 0.876613 16.9064 1.22954L16.0117 2.12419L18.3123 4.42472L19.2069 3.53007C19.5598 3.17714 19.5598 2.60494 19.2069 2.25202L18.1844 1.22954Z" />
                </svg>

                {/* <div className="hidden md:block md:ml-2">inspect property</div> */}

              </div>

            </Link>


          }
        </button>
        <button className="homec-dashboard-property__btn px-2 homec-dashboard-property__btn--delete flex justify-center items-center" onClick={handleDeleteProperty}>

          <div className="flex  justify-center  items-center">

            <svg
              width="16"
              height="21"
              viewBox="0 0 16 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.86625 0.952615C4.86628 0.803061 4.92128 0.659637 5.01915 0.55386C5.11703 0.448082 5.24978 0.388606 5.38824 0.388501L10.6078 0.388184C10.7462 0.38853 10.879 0.448171 10.9768 0.554033C11.0746 0.659895 11.1296 0.803342 11.1297 0.952933V2.34732H4.86625V0.952615ZM13.4482 19.9103C13.4348 20.1302 13.3442 20.3363 13.1949 20.4863C13.0455 20.6364 12.8487 20.7191 12.6447 20.7176H3.29125C3.08734 20.717 2.89117 20.6331 2.74216 20.4827C2.59315 20.3323 2.50232 20.1266 2.48791 19.9069L1.68751 7.2596H14.3024L13.4483 19.9102L13.4482 19.9103ZM15.5276 6.11414H0.46875V4.80382C0.468974 4.45629 0.596861 4.12307 0.824333 3.8773C1.05181 3.63154 1.36027 3.49333 1.682 3.49302L14.3142 3.49258C14.6359 3.49311 14.9442 3.63145 15.1717 3.87724C15.3991 4.12303 15.5269 4.4562 15.5272 4.8037V6.11402L15.5276 6.11414ZM5.57347 17.7026C5.57347 17.7778 5.58718 17.8523 5.61382 17.9217C5.64047 17.9912 5.67952 18.0543 5.72874 18.1075C5.77797 18.1607 5.83642 18.2029 5.90074 18.2317C5.96506 18.2604 6.03399 18.2753 6.10361 18.2753C6.17323 18.2753 6.24217 18.2604 6.30649 18.2317C6.37081 18.2029 6.42925 18.1607 6.47848 18.1075C6.52771 18.0543 6.56676 17.9912 6.5934 17.9217C6.62005 17.8523 6.63376 17.7778 6.63376 17.7026V9.67202C6.63264 9.521 6.57633 9.37657 6.47709 9.27018C6.37785 9.16379 6.24371 9.10407 6.10389 9.10402C5.96407 9.10397 5.82989 9.16359 5.73058 9.2699C5.63127 9.37621 5.57486 9.5206 5.57365 9.67163V17.7026H5.57347ZM9.35602 17.7026C9.35602 17.8545 9.41188 18.0002 9.51132 18.1076C9.61075 18.215 9.74562 18.2753 9.88624 18.2753C10.0269 18.2753 10.1617 18.215 10.2612 18.1076C10.3606 18.0002 10.4165 17.8545 10.4165 17.7026V9.67202C10.4153 9.52098 10.359 9.37652 10.2598 9.27012C10.1605 9.16372 10.0264 9.10399 9.88651 9.10394C9.74667 9.10389 9.61248 9.16352 9.51315 9.26984C9.41383 9.37617 9.35742 9.52058 9.3562 9.67163L9.35602 17.7026Z"
              />
            </svg>

            {/* <div className="hidden md:block md:ml-2">delete property</div> */}

          </div>

        </button>



      </div>
    </div >
  );
}


export default SponsorsCard;
