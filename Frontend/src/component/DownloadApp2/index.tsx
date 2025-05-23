import AboutShapeImg from "../About/AboutShapeImg";
import DownloadAppBtn from "../Button/DownloadAppBtn";
import screen_app from "../../assets/img/app-screen.png"
import getText from "@src/i18n/data/getText";
import { capitalizePhrase } from "@src/utils/capitalize_decapitalized";
import { useTranslation } from "react-i18next";


function DownloadApp() {

  const { t } = useTranslation(['home', 'common']);
  { capitalizePhrase(t(getText.common.test)) }

  return (

    <section
      className="download-app homec-bg-cover homec-bg-primary-color pd-top-15 pd-btm-15"
      style={{ backgroundImage: "url('img/download-vector.svg')" }}
    >
      <div className="homec-shape">
        <AboutShapeImg img="/img/anim-shape-10.svg" design="homec-shape-11" />
        <AboutShapeImg img="/img/anim-shape-10.svg" design="homec-shape-12" />
        <AboutShapeImg img="/img/anim-shape-10.svg" design="homec-shape-13" />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="download-app__middle">
              <div className="download-app__content">
                <div
                  className="homec-section__head section-white mg-btm-30"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <h2 className="homec-section__title">
                   { capitalizePhrase(t(getText.home.DownloadApp.title)) }
                  </h2>
                  <p className="sec-head__text">
                    { capitalizePhrase(t(getText.home.DownloadApp.description)) }
                  </p>
                </div>
                {/* App Download Button  */}
                <div
                  className="download__app-button"
                  data-aos="fade-up"
                  data-aos-delay="500"
                >
                  <DownloadAppBtn
                    link="#"
                    download={ capitalizePhrase(t(getText.home.DownloadApp.download.downloadOnTHe)) }
                    location={ capitalizePhrase(t(getText.home.DownloadApp.download.appStore)) }
                  />
                  <DownloadAppBtn
                    link="#"
                    download={ capitalizePhrase(t(getText.home.DownloadApp.download.getItOn)) }
                    location={ capitalizePhrase(t(getText.home.DownloadApp.download.googlePlay)) }
                  />
                </div>

                {/* End App Download Button */}
              </div>
              {/* Download Image */}
              <div
                className="download-app__img"
                data-aos="fade-up"
                data-aos-delay="700"
              >
                <img src={screen_app} alt="#" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DownloadApp;
