import Http from "@src/services/Http";
import apiGateway from "@src/utils/apiGateway";
import { Alert } from "@src/utils/createAlert";
import { FormEvent, useState } from "react";

function ContactForm() {
  const [input, setInput] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const handleChange = (e: any) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const response = await Http.post(apiGateway.services.email, { ...input });
    response?.status === 200 && Alert({ icon: "success", title: "Success", text: "Your inquiry has been received. An agent will contact you as soon as possible to provide further assistance." });
    response?.status === 200 && setInput({ name: "", email: "", phoneNumber: "", subject: "", message: "" });
    response?.status !== 200 && Alert({ icon: "error", title: "Error", text: "Message not sent! please try later" });
    setSubmitting(false);
  }


  return (
    <form method="post" className="homec-property-ag__form" onSubmit={handleSubmit} >
      <div className="form-group">
        <input
          type="text"
          name="name"
          placeholder="Full name"
          value={input.name}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={input.email}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="phoneNumber"
          placeholder="Your Phone"
          value={input.phoneNumber}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={input.subject}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="form-group">
        <textarea
          name="message"
          placeholder="Description"
          required
          value={input.message}
          onChange={(e) => handleChange(e)}
        ></textarea>
      </div>
      <button
        type="submit"
        className="homec-btn homec-btn__second homec-property-ag__button"
        disabled={submitting}
      >
        <span>{!submitting ? "Send Message Now" : "Submitting..."}</span>
      </button>
    </form>
  );
}

export default ContactForm;
