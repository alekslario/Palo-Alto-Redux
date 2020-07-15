import { useEffect } from "react";
import { PortalWithState } from "react-portal";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
import Router from "next/router";
import CrossIcon from "../Icons/Cross";
import $ from "./_Video";
import { useStore } from "../../utils/contextStore";
import PlayIcon from "../Icons/Play";

const Modal = ({ closePortal }) => {
  const [store, dispatch] = useStore();
  useEffect(() => {
    const body = document.querySelector("body");
    disableBodyScroll(window, {
      reserveScrollBarGap: true,
    });
    return () => clearAllBodyScrollLocks();
  }, []);

  useEffect(() => {
    Router.events.on("routeChangeComplete", closePortal);
    return () => Router.events.off("routeChangeComplete", closePortal);
  }, []);

  useEffect(() => {
    if (store.menuOpen || store.cartOpen) {
      dispatch({ type: "CLOSE_SIDEBAR" });
    }
  }, []);

  return (
    <$.Wrapper id="play_video-portal">
      <$.Nav>
        <$.IconButton size={"19"} onClick={closePortal}>
          <CrossIcon />
        </$.IconButton>
      </$.Nav>
    </$.Wrapper>
  );
};

const Video = () => (
  <PortalWithState closeOnEsc>
    {({ openPortal, closePortal, isOpen, portal }) => {
      return (
        <React.Fragment>
          <button id="play_video" onClick={openPortal}>
            <PlayIcon />
            <span>WATCH THE VIDEO</span>
          </button>
          {portal(<Modal closePortal={closePortal} />)}
        </React.Fragment>
      );
    }}
  </PortalWithState>
);

export default Video;
