import { useState, useRef } from "react";
import { useRouter } from "next/router";
import contactServer from "../../utils/contactServer";
import $ from "../../components/Account/_Account";
import SubmitButton from "../../components/_App/SubmitButton";
import Input from "../../components/_App/Input";
const Reset = () => {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState("");
  const router = useRouter();
  const repeatPasswordRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async e => {
    e.preventDefault();
    if (repeatPasswordRef.current.value !== passwordRef.current.value) {
      setStatus({ text: "Passwords do not match.", status: 0 });
    } else if (!repeatPasswordRef.current.value && !passwordRef.current.value) {
      setStatus({ text: "Password must be 6-60 characters", status: 0 });
    } else {
      setLoading(true);
      await contactServer({
        data: {
          token: router.query.id,
          password: passwordRef.current.value
        },
        route: "reset",
        setStatus
      });
      setLoading(false);
    }
  };

  return (
    <$.PageWrapper>
      <$.Content>
        {status && status.text && <$.Error>{status.text}</$.Error>}
        {status && status.status === 200 ? (
          <SubmitButton
            onClick={() => router.push("/")}
            css={`
              margin: 15px auto 0;
            `}
          >
            CONTINUE BROWSING
          </SubmitButton>
        ) : (
          <>
            <form onSubmit={handleSubmit}>
              <$.Title>Reset account password</$.Title>
              <p>Enter a new password</p>
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
              <Input
                placeholder="Confirm Password"
                id="repeatFormPassword"
                type="password"
                minLength="6"
                maxLength="60"
                required
                labelText="Password"
                ref={repeatPasswordRef}
              />
              <SubmitButton type="submit" loading={loading}>
                Submit
              </SubmitButton>
            </form>
          </>
        )}
      </$.Content>
    </$.PageWrapper>
  );
};

export default Reset;
