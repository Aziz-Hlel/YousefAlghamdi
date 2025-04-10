import PropertyFrom from "../Form/PropertyFrom2";
import Header from "../Header";
import Footer from "../Footer";
import DownloadApp from "../DownloadApp";
import Breadcrumbs from "../Breadcrumbs2";
import HistoryLinks from "../Breadcrumbs2/HistoryLinks";
import Preloader from "../Loader";
import { useEffect, useState } from "react";
import GoTopBtn from "../Button/GoTopBtn";

const EditProperty = () => {
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
          title="Edit Property"
          titlePosition="bottom"
          background="url(img/bread-overlay.jpg)"
          overlay={false}
        >

          <HistoryLinks link="/home" text="Home" isActive={false} />
          <HistoryLinks
            link="/edit-property"
            text="Edit Property"
            isActive={true}
          />
        </Breadcrumbs>
        <PropertyFrom />
        <DownloadApp />
        <GoTopBtn />
      </>
    );
  }
  return component;
}

export default EditProperty;
