import { useState, useRef } from "react";
import Link from "next/link";
import sendPayload from "../../utils/sendPayload";
import $ from "../../components/Account/_Login";
import Input from "../../components/_App/Input";
import { useRouter } from "next/router";
import { useStore } from "../../utils/contextStore";
const Register = () => {
  const [status, setStatus] = useState("");
  const [store, dispatch] = useStore();
  const router = useRouter();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);
  const surnameRef = useRef(null);

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await sendPayload(
      {
        email: emailRef.current.value,
        password: passwordRef.current.value,
        name: nameRef.current.value,
        surname: surnameRef.current.value
      },
      "register",
      setStatus
    );
    const token = response?.data?.token;
    if (token) {
      dispatch({ type: "LOGIN", token });
      router.push("/");
    }
  };

  return (
    <$.PageWrapper>
      <$.Content>
        {status && <$.Error>{status}</$.Error>}
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
          <$.SubmitButton type="submit">CREATE</$.SubmitButton>
        </form>
        <Link href="/account/register">
          <a
            css={`
              color: ${({ theme }) => theme.colors.beta};
              cursor: pointer;
            `}
          >
            Create account
          </a>
        </Link>
      </$.Content>
    </$.PageWrapper>
  );
};

export default Register;
