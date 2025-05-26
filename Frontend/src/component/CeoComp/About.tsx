import AboutCard from "../Cards/AboutCard";
import AboutShapeImg from "./AboutShapeImg";
import about_img from "./../../assets/img/about/about_img.jpg"
import ceo_img from "./../../assets/img/about/ceo_img.jpg"
import getText from "@src/i18n/data/getText";
import { useTranslation } from "react-i18next";
import { capitalizePhrase } from "@src/utils/capitalize_decapitalized";


function CEO() {

  const { t } = useTranslation(['home', 'common']);
  { capitalizePhrase(t(getText.common.test)) }


  return (
    <section className="homec-about homec-bg-third-color pd-top-90 pd-btm-120">
      <div className="homec-shape">
        <AboutShapeImg img="/img/anim-shape-1.svg" design="homec-shape-1" />
        <AboutShapeImg img="/img/anim-shape-2.svg" design="homec-shape-2" />
        <AboutShapeImg img="/img/anim-shape-3.svg" design="homec-shape-3" />
        <AboutShapeImg img="/img/anim-shape-1.svg" design="homec-shape-1" />
        <AboutShapeImg img="/img/anim-shape-2.svg" design="homec-shape-2" />
        <AboutShapeImg img="/img/anim-shape-3.svg" design="homec-shape-3" />
      </div>
      <div className="container">
        <div className="row align-items-center">
          <div
            className="col-lg-6 offset-lg-0 col-md-10 offset-md-1 col-12 mg-top-30"
            data-aos="fade-right"
            data-aos-delay="400"
          >
            {/* Homec Image Group */}
            <div className="homec-image-group homec-image-group--v2">
              <div className="homec-image-group__main">
                <img src={about_img} alt="#" />
                <div className="homec-experiences">
                  <h4 className="homec-experiences__title">
                    {capitalizePhrase(t(getText.home.CEO.NumbyearsOfExperience))} <span> {capitalizePhrase(t(getText.home.CEO.ofExperience))}</span>
                  </h4>
                </div>
              </div>
              <div className="homec-ceo-quote">
                <div className="homec-ceo-quote__img">
                  <div className="homec-overlay"></div>

                  <img src={ceo_img} alt="#" />

                </div>
                <h4 className="homec-ceo-quote__title">
                  {capitalizePhrase(t(getText.home.CEO.ceoName))}
                  <span>{capitalizePhrase(t(getText.home.CEO.ceo))}<a className=" text-sm font-extralight " href="tel:+971525002822" dir="ltr">+971 525002822</a></span>

                </h4>
              </div>
            </div>
            {/* End Homec Image Group */}
          </div>
          <div className="col-lg-6 col-12 mg-top-30">
            <div className="homec-about-content homec-about-content--v2">
              {/* Section Title */}
              <div className="homec-section__head">
                <div className="homec-section__shape">
                  <span
                    className="homec-section__badge homec-section__badge--shape"
                    style={{ backgroundImage: "url('img/section-shape.svg')" }}
                    data-aos="fade-down"
                    data-aos-delay="300"
                  >
                    {capitalizePhrase(t(getText.home.CEO.aboutYGP))}
                  </span>
                </div>
                <h2
                  className="homec-section__title"
                  data-aos="fade-in"
                  data-aos-delay="400"
                >
                  {capitalizePhrase(t(getText.home.CEO.WelcomeMessage))}

                </h2>
              </div>
              <div
                className="homec-about-content__inner mg-top-20"
                data-aos="fade-in"
                data-aos-delay="500"
              >
                <p className="homec-about-content__text">
                  {capitalizePhrase(t(getText.home.CEO.message))}

                </p>


              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CEO;
