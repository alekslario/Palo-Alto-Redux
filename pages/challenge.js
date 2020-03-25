import ReCAPTCHA from "react-google-recaptcha";
import { useState, useEffect, useRef } from "react";
import Loader from "../components/Icons/Loader";
import $ from "../components/Account/_Account";
import sendPayload from "../utils/sendPayload";
import { useRouter } from "next/router";
import SubmitButton from "../components/_App/SubmitButton";
const Challenge = () => {
  const [status, setStatus] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const recaptchaRef = useRef(null);
  const onChange = value => setToken(value);

  const handleSubmit = async () => {
    if (!token) {
      setStatus({ text: "Check the box first.", status: 0 });
    } else {
      setLoading(true);
      await sendPayload({
        data: { token, email: router.query.email },
        route: "requestReset",
        setStatus
      });
      setLoading(false);
    }
  };
  useEffect(() => {
    if (status && status.status !== 200 && status.status !== 201) {
      recaptchaRef.current.reset();
    }
  }, [status]);
  return (
    <$.PageWrapper>
      <$.Content position="relative">
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
            <p
              css={`
                text-align: center;
              `}
            >
              {loading
                ? "Sending email..."
                : "To continue, let us know you're not a robot."}
            </p>

            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.RE_CAPTCHA_SITE_KEY}
              onChange={onChange}
              css={`
                display: flex;
                justify-content: center;
              `}
            />
            <SubmitButton
              loading={loading}
              onClick={handleSubmit}
              css={`
                margin: 15px auto 0;
                @media (max-width: 480px) {
                  width: initial;
                }
              `}
            >
              Submit
            </SubmitButton>
          </>
        )}
      </$.Content>
    </$.PageWrapper>
  );
};

export default Challenge;
