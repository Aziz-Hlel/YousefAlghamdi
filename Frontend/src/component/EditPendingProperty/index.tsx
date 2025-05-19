import Header from "../Header";
import Footer from "../Footer";
import DownloadApp from "../DownloadApp";
import Breadcrumbs from "../Breadcrumbs2";
import HistoryLinks from "../Breadcrumbs2/HistoryLinks";
import Preloader from "../Loader";
import { useEffect, useState } from "react";
import { SinglePropertyProvider } from "@src/providers/SingleProperty.context";
import { useParams } from "react-router-dom";
import PropertyFrom from "../Form/PropertyFrom2.edit";

const EditPendingProperty = () => {
  const [isLoading, setisLoadingg] = useState(true);
  const { propertyId } = useParams();

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
          background="url(/img/bread-overlay.jpg)"
          overlay={false}
        >

          <HistoryLinks link="/home" text="Home" isActive={false} />
          <HistoryLinks
            link="/edit-property"
            text="Edit Property"  
            isActive={true}
          />
        </Breadcrumbs>

        <SinglePropertyProvider id={propertyId}>
          <PropertyFrom />
        </SinglePropertyProvider>

        <DownloadApp />
      </>
    );
  }
  return component;
}

export default EditPendingProperty;
