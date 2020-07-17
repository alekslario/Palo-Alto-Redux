import { useEffect } from "react";
import { PortalWithState } from "react-portal";
import Router from "next/router";
import CrossIcon from "../Icons/Cross";
import $ from "./_Video";
import { useStore } from "../../utils/contextStore";
import PlayIcon from "../Icons/Play";

const Modal = ({ closePortal }) => {
  const [store, dispatch] = useStore();

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
    <$.Wrapper id="play_video-portal" onClick={closePortal}>
      <$.VideoContainer>
        <$.IconButton size={"19"} onClick={closePortal}>
          <CrossIcon />
        </$.IconButton>
        <div
          css={`
            padding: 56.25% 0 0 0;
            position: relative;
            width: 100%;
            height: 100%;
          `}
        >
          <iframe
            src="https://player.vimeo.com/video/333737783?color=f7f7f7&title=0&byline=0&portrait=0"
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
            }}
            width="100%"
            height="100%"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
          ></iframe>
        </div>
      </$.VideoContainer>
    </$.Wrapper>
  );
};

const Video = () => (
  <PortalWithState closeOnEsc closeOnOutsideClick>
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
