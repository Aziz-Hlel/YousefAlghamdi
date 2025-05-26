import { useState } from "react";
import According from "./According";
import support_img from "@img/support/support_img.png";


function FaqSection() {

  
  const [collapse, setCollapse] = useState(1);
  const handleCollapse = (id) => {
    setCollapse(id === collapse ? false : id);
  };
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
                  FAQ
                </span>
              </div>
              <h2 className="homec-section__title">
                If you want to know Frequently Ask Questions
              </h2>
            </div>
            <div
              className="homec-accordion accordion accordion-flush"
              id="homec-accordion"
            >
              <According
                heading="What services does YGP Real Estate provide?"
                desc=" YGP is a full-service brokerage that helps clients *buy, sell, or rent* ready and off-plan properties across the UAE. We also offer landlord representation, property-management packages, and investment advisory services to maximise rental yields and capital growth."
                collapse={collapse}
                handleCollapse={handleCollapse}
                id={1}
              />
              <According
                heading="Can non-UAE residents purchase property through YGP?"
                desc=" Yes. Foreign buyers can purchase freehold property in designated zones. YGP handles the entire cross-border process for you—from virtual viewings and due-diligence checks to drafting the Sales & Purchase Agreement (SPA) and coordinating trustee-office transfers—so you can complete the transaction even if you are outside the UAE.  "
                collapse={collapse}
                handleCollapse={handleCollapse}
                id={2}
              />

              <According
                heading="How long does a typical property purchase take with YGP?"
                desc=" Once you select a property, the end-to-end process usually spans *10–15 working days* for cash deals and *30–45 working days* if bank financing is involved. We manage every step—price negotiation, SPA signing, No-Objection Certificate (NOC) collection, mortgage coordination (if required), and trustee transfer—so you can receive your title deed with minimal hassle.  "
                collapse={collapse}
                handleCollapse={handleCollapse}
                id={3}
              />
              <According
                serial={4}
                heading="How do I list my property or book a viewing?"
                desc="1️⃣ Call or WhatsApp +971 52 500 2822 or email info@ygp.ae . 2️⃣ Share basic details (title deed, Oqood, photos). 3️⃣ A dedicated agent will visit to verify the unit, sign the Form A listing agreement, and arrange professional photos. 4️⃣ Your listing goes live on ygp.ae and major portals within 24 hours, and viewings are scheduled at your convenience—often the same day."
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
              <img src={support_img} alt="#" />
              <div className="homec-support-img__content">
                <img src="img/support-icon-white.svg" alt="#" />
                <h4 className="homec-support-img__title">
                  24/7 Support <span>Have any Questions Contact Us?</span>
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
