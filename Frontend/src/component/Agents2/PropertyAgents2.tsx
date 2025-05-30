import getText from "@src/i18n/data/getText";
import Iproperty from "@src/models/property.type";
import { useAuth } from "@src/providers/AuthProvider.context";
import Http from "@src/services/Http";
import apiGateway from "@src/utils/apiGateway";
import { capitalizePhrase } from "@src/utils/capitalize_decapitalized";
import { Alert } from "@src/utils/createAlert";
import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";

function PropertyAgents({ image, name, position, phoneNumber, property }: {
  image: string;
  name: string;
  position: string;
  phoneNumber: any;
  property: Iproperty,
}) {

  const { user } = useAuth();

  const { t } = useTranslation(['common']);
  const [input, setInput] = useState({
    firstName: user ? user.firstName : "",
    lastName: user ? user.lastName : "",
    email: user ? user.email : "",
    message: "",
    subject: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = (e: any) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleWhatsApp = (phoneNumber: string) => {


    const message = encodeURIComponent(
      `Hello, I'm interested in the property "${property.title}" (Ref: ${property.id}).` +
      `\n\nI would like to request more information about this listing.` +
      `\n\nProperty link: ${window.location.origin}/property-single/${property.id}` +
      `\n\nThank you.`
    );

    const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${message}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

  };

  const handleEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true)

    const response = await Http.post(apiGateway.services.emailProperty, { ...input, propertyId: property.id });
    response?.status === 200 && setInput({ firstName: user ? user.firstName : "", lastName: user ? user.lastName : "", email: user ? user.email : "", subject: "", message: "" });
     response?.status === 200 && Alert({ icon: "success", title: capitalizePhrase(t(getText.alerts.contactUs.successAlert.title)), text: capitalizePhrase(t(getText.alerts.contactUs.successAlert.text)) });
    response?.status !== 200 && Alert({ icon: "error", title: capitalizePhrase(t(getText.alerts.contactUs.errorAlert.title)), text: capitalizePhrase(t(getText.alerts.contactUs.errorAlert.text)) });

    setIsSubmitting(false)

  }

  return (
    <div className="col-lg-4 col-12">
      {/*  Property Agent Card  */}
      <div
        className="homec-property-ag homec-property-ag--side homec-bg-cover"
        style={{ backgroundImage: "url('/img/property-ag-bg.svg')" }}
      >
        <h3 className="homec-property-ag__title">{capitalizePhrase(t(getText.common.propertyAgent))}</h3>
        {/*  Property Profile  */}
        <div className="homec-property-ag__author">
          <div className="homec-property-ag__author--img">
            <img src={image} alt="#" />
          </div>
          <div className="homec-property-ag__author--content">
            <h4 className="homec-property-ag__author--title">
              {name}
              <span>{position}</span>
              <a dir="ltr" className=" text-base font-sans" href={`tel:${phoneNumber}`}>{phoneNumber}</a>
            </h4>
          </div>
        </div>
        {/* End Property Profile  */}
        <form action="#" className="homec-property-ag__form" onSubmit={handleEmail}>
          {
            !user &&
            <>
              <div className="form-group">
                <input
                  type="text"
                  name="firstName"
                  value={input.firstName}
                  required
                  onChange={(e) => handleChange(e)}
                  placeholder="First name"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="lastName"
                  value={input.lastName}
                  required
                  onChange={(e) => handleChange(e)}
                  placeholder="Last name"
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  value={input.email}
                  required
                  onChange={(e) => handleChange(e)}
                />
              </div>

            </>

          }
          <div className="form-group">
            <input
              type="subject"
              name="subject"
              placeholder="Subject"
              value={input.subject}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <textarea
              name="message"
              placeholder="Message"
              required
              value={input.message}
              onChange={(e) => handleChange(e)}
            ></textarea>
          </div>
          <button
            type="submit"
            className="homec-btn homec-btn__second homec-property-ag__button"
            style={{ zIndex: "0" }}
            disabled={isSubmitting}
          >
            <span >{isSubmitting ? capitalizePhrase(t(getText.common.submitting)) : capitalizePhrase(t(getText.common.sendMessageNow))}</span>
          </button>
          <div className=" h-14 w-full cursor-pointer  gap-2 rounded-md bg-green-400 hover:bg-green-500 flex justify-center items-center text-white"
            onClick={() => handleWhatsApp(phoneNumber)}>
            <svg className="whatsapp-icon" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <path d="M26.576 5.363a14.818 14.818 0 00-10.511-4.354C7.856 1.009 1.2 7.664 1.2 15.874c0 2.732.737 5.291 2.022 7.491l-.038-.07-2.109 7.702 7.879-2.067c2.051 1.139 4.498 1.809 7.102 1.809h.006c8.209-.003 14.862-6.659 14.862-14.868a14.82 14.82 0 00-4.349-10.507zM16.062 28.228h-.005-.001c-2.319 0-4.489-.64-6.342-1.753l.056.031-.451-.267-4.675 1.227 1.247-4.559-.294-.467a12.23 12.23 0 01-1.889-6.565c0-6.822 5.531-12.353 12.353-12.353s12.353 5.531 12.353 12.353-5.53 12.353-12.353 12.353zm6.776-9.251c-.371-.186-2.197-1.083-2.537-1.208-.341-.124-.589-.185-.837.187-.246.371-.958 1.207-1.175 1.455-.216.249-.434.279-.805.094a10.23 10.23 0 01-2.997-1.852l.01.009a11.236 11.236 0 01-2.037-2.521l-.028-.052c-.216-.371-.023-.572.162-.757.167-.166.372-.434.557-.65.146-.179.271-.384.366-.604l.006-.017a.678.678 0 00-.033-.653l.002.003c-.094-.186-.836-2.014-1.145-2.758-.302-.724-.609-.625-.836-.637-.216-.01-.464-.012-.712-.012-.395.01-.746.188-.988.463l-.001.002a4.153 4.153 0 00-1.299 3.102v-.004a7.233 7.233 0 001.527 3.857l-.012-.015a16.693 16.693 0 006.251 5.564l.094.043c.548.248 1.25.513 1.968.74l.149.041a5.103 5.103 0 002.368.143l-.031.004a3.837 3.837 0 002.497-1.749l.009-.017a3.122 3.122 0 00.214-1.784l.003.019c-.092-.155-.34-.247-.712-.434z" />
            </svg>
            whatsapp
          </div>
        </form>
      </div>
      {/* End Property Agent Card */}
    </div>
  );
}




export default PropertyAgents;
