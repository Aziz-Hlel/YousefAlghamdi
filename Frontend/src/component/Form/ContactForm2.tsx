import getText from "@src/i18n/data/getText";
import Http from "@src/services/Http";
import apiGateway from "@src/utils/apiGateway";
import { capitalizePhrase } from "@src/utils/capitalize_decapitalized";
import { Alert } from "@src/utils/createAlert";
import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";

function ContactForm() {
  const [input, setInput] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    subject: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const { t } = useTranslation(['common', 'alertUs',]);


  const handleChange = (e: any) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const response = await Http.post(apiGateway.services.email, { ...input });
    response?.status === 200 && Alert({ icon: "success", title: capitalizePhrase(t(getText.alerts.contactUs.successAlert.title)), text: capitalizePhrase(t(getText.alerts.contactUs.successAlert.text)) });
    response?.status === 200 && setInput({ name: "", email: "", phoneNumber: "", subject: "", message: "" });
    response?.status !== 200 && Alert({ icon: "error", title: capitalizePhrase(t(getText.alerts.contactUs.errorAlert.title)), text: capitalizePhrase(t(getText.alerts.contactUs.errorAlert.text)) });
    setSubmitting(false);
  };


  return (
    <form method="post" className="homec-property-ag__form" onSubmit={handleSubmit} >
      <div className="form-group">
        <input
          type="text"
          name="name"
          placeholder={capitalizePhrase(t(getText.common.fullName))}
          value={input.name}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          name="email"
          placeholder={capitalizePhrase(t(getText.common.yourEmail))}
          value={input.email}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="phoneNumber"
          placeholder={capitalizePhrase(t(getText.common.yourPhone))}
          value={input.phoneNumber}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="subject"
          placeholder={capitalizePhrase(t(getText.common.subject))}
          value={input.subject}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="form-group">
        <textarea
          name="message"
          placeholder={capitalizePhrase(t(getText.common.description))}
          required
          value={input.message}
          onChange={(e) => handleChange(e)}
        ></textarea>
      </div>

      <button type="submit" className="homec-btn homec-btn__second homec-property-ag__button" disabled={submitting}>

        <span>{!submitting ? capitalizePhrase(t(getText.contactUs.sendMessageNow)) : capitalizePhrase(t(getText.common.submitting)) + "..."}</span>

      </button>

    </form>
  );
}

export default ContactForm;
