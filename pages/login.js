import { useState, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import contactServer from "../utils/contactServer";
import $ from "../components/Account/_Account";
import Input from "../components/_App/Input";
import SubmitButton from "../components/_App/SubmitButton";
import { handleLogin } from "../utils/auth";
const Login = () => {
  const [passRecovery, setPassRecovery] = useState(false);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState("");
  const router = useRouter();
  const emailRef = useRef(null);
  const emailResetRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await contactServer({
      data: {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      },
      route: "login",
      setStatus,
      method: "POST",
    });
    setLoading(false);
    const token = response?.data?.token;

    if (token) {
      handleLogin(token);
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    if (emailResetRef.current.value.length < 5) {
      setStatus({ text: "Enter a valid email", status: 0 });
    } else {
      router.push({
        pathname: "/challenge",
        query: { email: emailResetRef.current.value },
      });
    }
  };

  return (
    <$.PageWrapper>
      <$.Content>
        {status &&
          status.text &&
          status.status !== 200 &&
          status.status !== 201 && <$.Error>{status.text}</$.Error>}
        {passRecovery ? (
          <>
            <form onSubmit={handleReset}>
              <$.BiggerTittle>Reset your password</$.BiggerTittle>
              <p>We will send you an email to reset your password.</p>
              <Input
                placeholder="Email"
                id="formEmail"
                type="email"
                required
                labelText="Email"
                ref={emailResetRef}
              />
              <SubmitButton type="submit">Submit</SubmitButton>
            </form>
            <button
              css={`
                color: ${({ theme }) => theme.colors.beta};
                cursor: pointer;
              `}
              onClick={() => setPassRecovery(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
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
              <SubmitButton type="submit" loading={loading}>
                Login
              </SubmitButton>
            </form>
            <button
              css={`
                color: ${({ theme }) => theme.colors.beta};
                cursor: pointer;
              `}
              onClick={() => setPassRecovery(true)}
            >
              Forgot your password? •&nbsp;
            </button>

            <Link href="/register">
              <a
                css={`
                  color: ${({ theme }) => theme.colors.beta};
                  cursor: pointer;
                `}
              >
                Create account
              </a>
            </Link>
          </>
        )}
      </$.Content>
    </$.PageWrapper>
  );
};

export default Login;
