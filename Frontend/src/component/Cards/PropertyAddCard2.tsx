import getText from "@src/i18n/data/getText";
import { capitalizePhrase } from "@src/utils/capitalize_decapitalized";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

type PropertyAddCardProps = {
  img: string,
  why: string,
  btn?: string,
  link: string
}


function PropertyAddCard({ img, why, btn, link }: PropertyAddCardProps) {

  const { t } = useTranslation(['data', 'addProperty','common']);


  return (
    <div
      className="col-lg-6 col-md-6 col-12 mg-top-30"
      data-aos="fade-up"
      data-aos-delay="600"
    >
      {/* Homec Add Property Card  */}
      <div className="homec-add-property homec-bg-third-color homec-border">
        {/* Homec Property Image   */}
        <div className="homec-add-property__img">
          <img src={img} alt="#" />
        </div>
        {/* Homec Property Content   */}
        <div className="homec-add-property__content">
          <h3 className="homec-add-property__title">{capitalizePhrase(t(getText.addProperty.addPropertyFor))} {why}</h3>
          <p className="homec-add-property__text">
            {capitalizePhrase(t(getText.common.noPublishPersonalInfo))} 
          </p>
          <div className="homec-add-property__button">
            <Link
              to={link}
              className={
                btn !== "second" ? "homec-btn" : "homec-btn homec-btn__second"
              }
            >
              <span>{capitalizePhrase(t(getText.addProperty.createFor))} {why}</span>
            </Link>
          </div>
        </div>
      </div>
      {/* End Homec Add Property Card  */}
    </div>
  );
}



export default PropertyAddCard;
