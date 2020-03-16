import { useState, useRef } from "react";
import Link from "next/link";
import sendPayload from "../../utils/sendPayload";
import $ from "../../components/Account/_Login";
import Input from "../../components/_App/Input";
import { useRouter } from "next/router";
import { useStore } from "../../utils/contextStore";
const Login = () => {
  const [status, setStatus] = useState("");
  const [store, dispatch] = useStore();
  const router = useRouter();
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
      dispatch({ type: "LOGIN", token });
      router.push("/");
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
