import { useState } from "react";
import { PortalWithState } from "react-portal";
import $ from "./_PopUp";
import cookie from "js-cookie";
import contactServer from "../../utils/contactServer";
import { useStore } from "../../utils/contextStore";
import LoaderIcon from "../Icons/Loader";
import { useCloseModals } from "../../utils/useCloseModals";
const Modal = ({ closePortal }) => {
  const [_, dispatch] = useStore();
  const [{ loading, message }, setLoading] = useState({
    loading: false,
    message: "",
  });
  useCloseModals(closePortal);
  const handelDeleteUser = async () => {
    setLoading({ loading: true, message: "" });
    const token = cookie.get("token");
    const response = await contactServer({
      auth: token,
      route: "account",
      method: "DELETE",
    });
    if (response.status === 200) {
      dispatch({ type: "LOGOUT" });
    } else {
      setLoading({ loading: false, message: response?.data?.message });
    }
  };

  return (
    <$.Wrapper>
      <p>You are about to terminate your account. Are you sure about that?</p>
      <$.Row
        css={`
          justify-content: center;
        `}
      >
        <button onClick={handelDeleteUser} disabled={loading}>
          Yes
        </button>
        <span
          css={`
            margin: 0 25px;
          `}
        >
          |
        </span>
        <button onClick={closePortal} disabled={loading}>
          No
        </button>
      </$.Row>
      {loading && (
        <$.Row
          css={`
            justify-content: center;
            margin: 5px 0;
          `}
        >
          <LoaderIcon fill="#666" />
        </$.Row>
      )}
      {message && (
        <p
          css={`
            text-align: center;
            color: #d6365a;
          `}
        >
          {message}
        </p>
      )}
    </$.Wrapper>
  );
};
const PopUp = () => (
  <PortalWithState closeOnEsc closeOnOutsideClick>
    {({ openPortal, closePortal, isOpen, portal }) => {
      return (
        <React.Fragment>
          <button
            css={`
              color: ${({ theme }) => theme.colors.secondary};
            `}
            onClick={openPortal}
          >
            Delete account
          </button>
          {portal(<Modal closePortal={closePortal} />)}
        </React.Fragment>
      );
    }}
  </PortalWithState>
);

export default PopUp;
