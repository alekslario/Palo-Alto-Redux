import { useState, useRef } from "react";
import Link from "next/link";
import sendPayload from "../../utils/sendPayload";
import $ from "../../components/Account/_Account";
import Input from "../../components/_App/Input";
import { handleLogin } from "../../utils/auth";
const Login = () => {
  const [status, setStatus] = useState("");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await sendPayload(
      {
        email: emailRef.current.value,
        password: passwordRef.current.value
      },
      "login",
      setStatus
    );
    const token = response?.data?.token;
    if (token) {
      handleLogin(token);
    }
  };

  return (
    <$.PageWrapper>
      <$.Content>
        {status && <$.Error>{status}</$.Error>}
        <form onSubmit={handleSubmit}>
          <$.Title>Login</$.Title>
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
          <$.SubmitButton type="submit">Login</$.SubmitButton>
        </form>
        <Link href="/">
          <a
            css={`
              color: ${({ theme }) => theme.colors.beta};
              cursor: pointer;
            `}
          >
            Forgot your password? •&nbsp;
          </a>
        </Link>

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

export default Login;
