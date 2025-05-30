import { useState } from "react";
import According from "./According";
import { useTranslation } from "react-i18next";
import { capitalizePhrase } from "@src/utils/capitalize_decapitalized";
import getText from "@src/i18n/data/getText";


function FaqSection() {
  const [collapse, setCollapse] = useState(1);
  const handleCollapse = (id: any) => {
    setCollapse(id === collapse ? false : id);
  };
  const { t } = useTranslation(['common', 'home']);

  return (
    <section
      className="homec-bg-cover pd-top-90 pd-btm-120"
      style={{
        backgroundImage: "url('img/bg-shape-five.svg')",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <div className="container homec-container-medium">
        <div className="row homec-container-medium__row align-items-center">
          <div
            className="col-lg-6 col-md-6 col-12 mg-top-30"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div className="homec-section__head">
              <div className="homec-section__shape">
                <span
                  className="homec-section__badge homec-section__badge--shape homec-section__badge--shape--v2"
                  style={{ backgroundImage: "url('img/shape-3.svg')" }}
                >
                  {capitalizePhrase(t(getText.home.FaqSection.faq))}
                </span>
              </div>
              <h2 className="homec-section__title">
                {capitalizePhrase(t(getText.home.FaqSection.title))}
              </h2>
            </div>
            <div
              className="homec-accordion accordion accordion-flush"
              id="homec-accordion"
            >
              <According
                heading={capitalizePhrase(t(getText.home.FaqSection.contents[1].question))}
                desc={capitalizePhrase(t(getText.home.FaqSection.contents[1].answer))}
                collapse={collapse}
                handleCollapse={handleCollapse}
                id={1}
              />
              <According
                heading={capitalizePhrase(t(getText.home.FaqSection.contents[2].question))}
                desc={capitalizePhrase(t(getText.home.FaqSection.contents[2].answer))}
                collapse={collapse}
                handleCollapse={handleCollapse}
                id={2}
              />

              <According
                heading={capitalizePhrase(t(getText.home.FaqSection.contents[3].question))}
                desc={capitalizePhrase(t(getText.home.FaqSection.contents[3].answer))}
                collapse={collapse}
                handleCollapse={handleCollapse}
                id={3}
              />
              <According

                heading={capitalizePhrase(t(getText.home.FaqSection.contents[4].question))}
                desc={capitalizePhrase(t(getText.home.FaqSection.contents[4].answer))}
                collapse={collapse}
                handleCollapse={handleCollapse}
                id={4}
              />
            </div>
          </div>
          <div
            className="col-lg-6 col-md-6 col-12 mg-top-30"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            {/* Support Img   */}
            <div className="homec-support-img">
              <img src="/images/support_img.png" alt="#" />
              <div className="homec-support-img__content">
                <img src="img/support-icon-white.svg" alt="#" />
                <h4 className="homec-support-img__title">
                  {capitalizePhrase(t(getText.home.FaqSection.support))} <span>{capitalizePhrase(t(getText.home.FaqSection.questions))}</span>
                </h4>
              </div>
            </div>
            {/* End Support Img  */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FaqSection;
