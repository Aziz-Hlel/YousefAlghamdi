import { useAuth } from "@src/providers/AuthProvider.context";
import Http from "@src/services/Http";
import roles from "@src/types/roles.type";
import apiGateway from "@src/utils/apiGateway";
import { Alert, ConfirmationAlertAsync } from "@src/utils/createAlert";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMyPropertiesContext } from "../Dashboard2/MyProperties/MyPropertiesProvider.context";
import statesTypes from "@src/types/states.types";
import Iproperty from "@src/models/property.type";
import { useEffect } from "react";


type IDashboardPropertyCard = {
  componentTitle: "Pending Properties" | "My properties" | "Unavailable Properties" | "All Properties";
  property: Iproperty;
  _id: string;
  ownerId: string;
  state: string;
  image: string;
  listing_type: string;
  title: string;
  location: string;
};


function DashboardPropertyCard({ property, componentTitle, ownerId, state, image, listing_type, title, location, }: IDashboardPropertyCard) {

  const { user } = useAuth();
  const { fetchProperties } = useMyPropertiesContext()
  const navigate = useNavigate();

  const location2 = useLocation();


  useEffect(() => {
    if (location2.state?.shouldRefresh) {
      fetchProperties(1); // your refetch logic here

      // clear the flag so it doesn't rerun on next render
      navigate(location2.pathname, { replace: true, state: {} });
    }
  }, [location2.state]);




  const handleDeleteProperty = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const response = await ConfirmationAlertAsync({
      title: "Delete Property",
      text: "Are you sure you want to delete this property?",
      icon: "warning",
    })
    if (response.isConfirmed) {
      const response = await Http.delete(`${apiGateway.property.delete}/${property._id}`);
      if (response?.status === 200) {
        (user?.role === roles.ADMIN || user?.role === roles.AGENT) ?
          Alert({
            title: "Property Deleted",
            icon: "success",
            text: "Property deleted successfully",
          })
          :
          Alert({
            title: "Request Sent",
            icon: "success",
            text: "Request to delete property sent successfully",
          })
        fetchProperties(1)
      }
      else alert("something went wrong")

    }

  };

  const handleUnavailable = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const response = await ConfirmationAlertAsync({
      title: "Unavailable Property",
      text: "Are you sure you want to make this property unavailable?",
      confirmButtonText: "Yes, make it unavailable",
      icon: "warning",
    })
    if (response.isConfirmed) {
      const response = await Http.patch(`${apiGateway.property.unavailable}/${property._id}`, {});
      if (response?.status === 200) {
        (user?.role === roles.ADMIN || user?.role === roles.AGENT) ?
          Alert({
            title: "Property Unavailable",
            icon: "success",
            text: "Property is now unavailable",
          })
          :
          Alert({
            title: "Request Sent",
            icon: "success",
            text: "Request to make property unavailable sent successfully",
          })
        fetchProperties(1)
      }
      else alert("something went wrong")
    }
  }


  const handleFeatured = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    e.preventDefault();
    const response = await ConfirmationAlertAsync({
      title: "Featured Property",
      text: "Are you sure you want to add it to featured properties ?",
      confirmButtonText: "Yes, i want to add it",
      icon: "warning",
    })
    if (response.isConfirmed) {
      const response = await Http.patch(`${apiGateway.property.feature.update}/${property._id}`, {});
      if (response?.status === 200) {
        (property.featured) ?
          Alert({
            title: "Property unfeatured",
            icon: "success",
            text: "Property is now unfeatured",
          })
          :
          Alert({
            title: "Property featured",
            icon: "success",
            text: "Property is now featured",
          })
        fetchProperties(1)
      }
      else alert("something went wrong")
    }
  }



  return (
    <div className="">
      <div className="homec-dashboard-property mg-top-30">
        <div className="homec-dashboard-property__label">{state}</div>
        {/* Property IMG */}
        <div className="homec-dashboard-property__img">
          <img src={image} alt="#" />
          {/* Property Content */}
          <div className="homec-dashboard-property__content">
            <div className="homec-dashboard-property__badge">For {listing_type}</div>
            <h3 className="homec-dashboard-property__title">{title}</h3>
            <div className="homec-property__text">
              <img src="/img/location-icon.svg" alt="#" />
              <p>{location}</p>
            </div>
            {
              user?.role === roles.ADMIN && componentTitle === "Pending Properties" && property?.agentId === null
              && <div className="">No agent assigned to the client yet</div>
            }
          </div>
        </div>
        {/* Property Button */}
        <div className="homec-dashboard-property__buttons ">

          {(user?.role === roles.ADMIN || user?.role === roles.AGENT) && <Link to={"inspect-user/" + ownerId} state={{ fromProperties: true }}>
            <button className="homec-dashboard-property__btn px-2 flex justify-center items-center" >
              <div className="flex  justify-center  items-center">


                <svg
                  width="23"
                  height="14"
                  viewBox="0 0 23 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11.6793 0.0471191C7.48656 0.0471191 3.68437 2.341 0.878736 6.06688C0.649796 6.37213 0.649796 6.79859 0.878736 7.10384C3.68437 10.8342 7.48656 13.1281 11.6793 13.1281C15.872 13.1281 19.6742 10.8342 22.4799 7.10833C22.7088 6.80308 22.7088 6.37662 22.4799 6.07137C19.6742 2.341 15.872 0.0471191 11.6793 0.0471191ZM11.9801 11.1933C9.19687 11.3684 6.8985 9.07452 7.07357 6.28684C7.21722 3.98847 9.08016 2.12553 11.3785 1.98188C14.1617 1.80681 16.4601 4.10069 16.285 6.88837C16.1369 9.18225 14.2739 11.0452 11.9801 11.1933ZM11.8409 9.06554C10.3416 9.15981 9.1026 7.92533 9.20136 6.426C9.27767 5.18704 10.2832 4.18599 11.5222 4.10518C13.0215 4.01091 14.2605 5.24539 14.1617 6.74472C14.0809 7.98818 13.0754 8.98923 11.8409 9.06554Z" />
                </svg>

                {/* <div className="hidden md:block md:ml-2">inspect client</div> */}

              </div>
            </button>
          </Link>}

          {componentTitle !== "Unavailable Properties" &&


            <button className="homec-dashboard-property__btn px-2  homec-dashboard-property__btn--edit  flex justify-center items-center">

              <Link to={`edit-property/${property._id}`}>

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



            </button>

          }
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

          {/* Unavailable button */}
          {(user?.role === roles.ADMIN || user?.role === roles.AGENT) && (state === statesTypes.active || state === statesTypes.unavailable) &&
            <button className="homec-dashboard-property__btn px-2 homec-dashboard-property__btn--delete flex justify-center items-center" onClick={handleUnavailable}>

              <div className="flex  justify-center  items-center fill-black stroke-black hover:fill-white hover:stroke-white" >
                <svg
                  width="20"
                  height="21"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 215.152 215.152"
                  xmlSpace="preserve"
                  strokeWidth="8"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <g>
                      {" "}
                      <path d="M107.573,0C61.849,0,24.649,37.206,24.649,82.938c0,32.665,13.675,65.706,39.545,95.549 c19.32,22.288,38.47,34.917,39.275,35.443c1.246,0.815,2.675,1.222,4.104,1.222s2.857-0.407,4.104-1.222 c0.806-0.526,19.957-13.155,39.278-35.443c25.872-29.844,39.548-62.885,39.548-95.55C190.503,37.206,153.301,0,107.573,0z M107.566,198.447C92.281,187.083,39.649,143.54,39.649,82.938C39.649,45.477,70.12,15,107.573,15 c37.457,0,67.93,30.477,67.93,67.938C175.503,143.401,122.842,187.059,107.566,198.447z" />{" "}
                      <path d="M130.904,59.592c-2.93-2.928-7.679-2.929-10.606,0l-12.72,12.719L94.857,59.588c-2.929-2.928-7.678-2.929-10.606,0 c-2.93,2.929-2.93,7.678-0.001,10.607l12.721,12.722L84.25,95.636c-2.93,2.929-2.93,7.678-0.001,10.607 c1.465,1.464,3.384,2.197,5.304,2.197c1.919,0,3.839-0.732,5.303-2.196l12.721-12.72l12.721,12.722 c1.465,1.464,3.384,2.197,5.304,2.197c1.919,0,3.839-0.732,5.303-2.196c2.93-2.929,2.93-7.678,0.001-10.607l-12.721-12.722 l12.72-12.718C133.833,67.271,133.833,62.521,130.904,59.592z" />{" "}
                    </g>{" "}
                  </g>
                </svg>

              </div>
            </button>}



          {/* Featured button */}
          {
            user?.role === roles.ADMIN && property.advanced.state === statesTypes.active && <button className="group px-2  flex justify-center items-center  " onClick={handleFeatured}>

              <div className="flex  justify-center  items-center " >

                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="21"
                >
                  <path
                    d="M11.317 3.612c.226-.368.339-.552.484-.615a.5.5 0 01.397 0c.145.063.258.247.483.615l1.985 3.236c.085.139.128.208.186.259a.5.5 0 00.176.099c.073.023.154.023.317.024l3.905.015c.462.001.692.002.824.1a.5.5 0 01.2.356c.016.163-.103.361-.341.756l-1.885 3.13c-.09.15-.136.225-.153.305a.5.5 0 000 .216c.017.08.063.155.153.305l1.885 3.13c.238.395.357.593.342.756a.5.5 0 01-.2.356c-.133.098-.363.099-.825.1l-3.905.015c-.163 0-.244.001-.317.024a.497.497 0 00-.176.1c-.058.05-.1.12-.186.258l-1.985 3.236c-.225.368-.338.552-.483.615a.5.5 0 01-.397 0c-.145-.063-.258-.247-.484-.615l-1.985-3.236c-.085-.139-.127-.208-.185-.259a.498.498 0 00-.176-.099c-.073-.023-.155-.023-.317-.024l-3.906-.015c-.461-.001-.692-.002-.823-.1a.5.5 0 01-.201-.356c-.015-.163.104-.361.342-.756l1.885-3.13c.09-.15.135-.225.153-.306a.5.5 0 000-.215c-.018-.08-.063-.155-.153-.305l-1.885-3.13c-.238-.395-.357-.593-.342-.756a.5.5 0 01.2-.356c.132-.098.363-.099.824-.1l3.906-.015c.162 0 .244-.001.317-.024a.5.5 0 00.176-.1c.058-.05.1-.12.185-.258l1.985-3.236z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={"  " + (property.featured ? "fill-amber-400 stroke-amber-200" : "fill-gray-700 stroke-black")}
                  />
                </svg>

              </div>
            </button>

          }
        </div>
      </div >


      {/* 
      // * Owner info component below the property
      */}
      {
        componentTitle === "All Properties" && typeof property.clientId === "object" &&
        <>
          <div className=" border border-black w-full bg-[#f5f4ff]  lg:px-12 ">

            <div className="flex h-fit">
              <h6 className=" mb-0">Owner :  </h6>
              <span>{`${property.clientId.firstName} ${property.clientId.lastName} (${property.clientId.role})`}</span>
            </div>

            {property.clientId.role !== roles.AGENT &&
              <>
                <div className="flex h-fit">
                  <div className=" mb-0 px-1 ">Email :  </div>
                  <span>{`${property.clientId.email}`}</span>
                </div>

                <div className="flex h-fit">
                  <div className=" mb-0  px-1">Phone :  </div>
                  <span>{`${property.clientId.phoneNumber}`}</span>
                </div>
              </>
            }

          </div>


        </>
      }

    </div>
  );
}


export default DashboardPropertyCard;
