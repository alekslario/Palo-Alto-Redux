import { useState, useRef } from "react";
import Link from "next/link";
import contactServer from "../utils/contactServer";
import $ from "../components/Account/_Account";
import Input from "../components/_App/Input";
import SubmitButton from "../components/_App/SubmitButton";
import { handleLogin } from "../utils/auth";
import HoneyPot, { useHoneyRef } from "../components/_App/HoneyPot";
const Register = () => {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState("");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);
  const surnameRef = useRef(null);
  const [honeyRef, isBot] = useHoneyRef(1000);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isBot()) return;
    setLoading(true);
    const response = await contactServer({
      data: {
        email: emailRef.current.value,
        password: passwordRef.current.value,
        name: nameRef.current.value,
        surname: surnameRef.current.value,
      },
      route: "register",
      setStatus,
      method: "POST",
    });
    setLoading(false);
    const token = response?.data?.token;
    if (token) {
      handleLogin(token);
    }
  };

  return (
    <$.PageWrapper>
      <$.Content>
        {status &&
          status.text &&
          status.status !== 200 &&
          status.status !== 201 && <$.Error>{status.text}</$.Error>}
        <form onSubmit={handleSubmit}>
          <$.Title>Create Account</$.Title>
          <Input
            placeholder="First name"
            id="formName"
            type="text"
            required
            labelText="Name"
            ref={nameRef}
            maxLength="40"
            minLength="2"
            name="fname"
            autocomplete="name"
          />
          <Input
            placeholder="Last name"
            id="formSurname"
            type="text"
            required
            maxLength="40"
            minLength="2"
            labelText="Surname"
            ref={surnameRef}
          />
          <Input
            placeholder="Email"
            id="formEmail"
            type="email"
            required
            labelText="Email"
            ref={emailRef}
          />
          <Input
            placeholder="Password"
            id="formPassword"
            type="password"
            minLength="6"
            maxLength="60"
            required
            labelText="Password"
            ref={passwordRef}
          />
          <HoneyPot ref={honeyRef} id="register_page" />
          <SubmitButton type="submit" loading={loading}>
            CREATE
          </SubmitButton>
        </form>
        <Link href="/">
          <a
            css={`
              color: ${({ theme }) => theme.colors.beta};
              cursor: pointer;
            `}
          >
            Return to Store
          </a>
        </Link>
      </$.Content>
    </$.PageWrapper>
  );
};

export default Register;
