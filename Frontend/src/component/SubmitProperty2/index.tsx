import Header from "../Header";
import Breadcrumbs from "../Breadcrumbs";
import HistoryLinks from "../Breadcrumbs/HistoryLinks";
import DownloadApp from "../DownloadApp";
import Footer from "../Footer";
import Preloader from "../Loader";
import { useEffect, useState } from "react";
import PropertyFrom from "../Form/PropertyFrom2";

const SubmitProperty = () => {
  const [isLoading, setisLoadingg] = useState(true);
  useEffect(() => {
    setisLoadingg(false);
  }, []);

  let component = undefined;
  if (isLoading) {
    component = <Preloader />;
  } else {
    component = (

      <>
        <Breadcrumbs
          title="Submit Property"
          titlePosition="bottom"
          background="url(/img/bread-overlay.jpg)" overlay={undefined} >
          <HistoryLinks link="/home" text="Home" isActive={undefined} />
          <HistoryLinks
            link="/submit-property"
            text="Submit Property"
            isActive={true}
          />
        </Breadcrumbs>
        <PropertyFrom />
        <DownloadApp />
      </>

    );

  }
  return component;
}

export default SubmitProperty;
