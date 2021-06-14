import { useState } from "react";
import contactServer from "../../utils/contactServer";
import $ from "./_ContactForm";
import Input from "../_App/Input";
import HoneyPot, { useHoneyRef } from "../_App/HoneyPot";

const ContactForm = () => {
  const [{ name, email, message }, setState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [honeyRef, isBot] = useHoneyRef();
  const [status, setStatus] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isBot()) {
      return setStatus({
        text: "Message sent successfully.",
        status: "200",
      });
    }

    await contactServer({
      data: { name, email, message },
      route: "contact",
      setStatus,
    });
  };

  const handleChange = ({ target: { name, value } }) => {
    let accepted = false;
    switch (name) {
      case "name":
        accepted = /^[a-zA-Z0-9_\s\-]{0,45}$/gi.test(value);
        break;
      case "email":
        accepted = /^[a-zA-Z0-9@\.\-_]{0,75}$/gi.test(value);
        break;
      case "message":
        accepted = /^[a-zA-Z0-9_\s\-\.,!?]{0,300}$/gi.test(value);
    }
    if (accepted) setState((prevState) => ({ ...prevState, [name]: value }));
  };
  return (
    <$.PageWrapper>
      <$.ContactPage>
        {status && status.text && <$.Error>{status.text}</$.Error>}
        <form onSubmit={handleSubmit}>
          <$.Notice>Contact</$.Notice>
          <$.Wrapper>
            <Input
              placeholder="Name"
              id="contactAuthor"
              name="name"
              autoComplete="given-name"
              value={name}
              onChange={handleChange}
              labelText="Name"
            />
            <Input
              id="contactEmail"
              name="email"
              autoComplete="email"
              placeholder="Email"
              value={email}
              onChange={handleChange}
              labelText="Email"
            />
            <HoneyPot ref={honeyRef} id="contact_page" />
            <$.HiddenLabel htmlFor="contactBody">Message</$.HiddenLabel>
            <$.TextArea
              id="contactBody"
              placeholder="Message"
              name="message"
              rows="15"
              value={message}
              onChange={handleChange}
            />
          </$.Wrapper>
          <$.SubmitButton type="submit">SEND</$.SubmitButton>
        </form>
      </$.ContactPage>
    </$.PageWrapper>
  );
};

export default ContactForm;
