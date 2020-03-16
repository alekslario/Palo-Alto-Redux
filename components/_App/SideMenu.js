import { useEffect, useRef } from "react";
import { useStore } from "../../utils/contextStore";
import $ from "./_SideMenu";
const SideMenu = () => {
  const [store, dispatch] = useStore();
  const sideMenu = useRef(null);
  useEffect(() => {
    if (typeof window === "undefined" || !store.menuOpen) return;
    const handler = e => {
      console.log("clicked");

      const target = e.target;
      if (target === document.querySelector("#cart")) {
        dispatch({ type: "OPEN_MENU" });
      } else if (target !== sideMenu.current) {
        dispatch({ type: "CLOSE_MENU" });
      }
    };
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, [store.menuOpen]);

  return (
    <>
      <$.SideMenu open={store.menuOpen ? "transform: translateX(300px);" : ""}>
        <h1>Shopping Cart</h1>
        <hr />
      </$.SideMenu>
    </>
  );
};

export default SideMenu;
