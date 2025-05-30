import Breadcrumbs from "../Breadcrumbs2";
import HistoryLinks from "../Breadcrumbs2/HistoryLinks";
import Preloader from "../Loader";
import { useEffect, useState } from "react";
import { SinglePropertyProvider } from "@src/providers/SingleProperty.context";
import { useParams } from "react-router-dom";
import PropertyFrom from "../Form/PropertyFrom2.edit";
import { useTranslation } from "react-i18next";
import getText from "@src/i18n/data/getText";
import { capitalizePhrase } from "@src/utils/capitalize_decapitalized";
import DownloadApp from "../DownloadApp2";

const EditPendingProperty = () => {
  const [isLoading, setisLoadingg] = useState(true);
  const { propertyId } = useParams();
  const { t } = useTranslation(['data', 'common', 'dashboard']);

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
          title={capitalizePhrase(t(getText.pagesTitle.pendingProperties))}
          titlePosition="bottom"
          background="url(/img/bread-overlay.jpg)"
          overlay={false}
        >

          <HistoryLinks link="/home" text="Home" isActive={false} />
          <HistoryLinks
            link="/edit-property"
            text={capitalizePhrase(t(getText.pagesTitle.pendingProperties))}
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
