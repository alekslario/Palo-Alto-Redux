import { useMemo, useRef, useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShoppingBagIcon from "../Icons/ShoppingBag";
import Logo from "../Icons/Logo";
import AccountIcon from "../Icons/Account";
import Search from "./Search";
import { useStore } from "../../utils/contextStore";

import $ from "./_Menu";
const Menu = ({ user, sidebarOpen }) => {
  const { pathname } = useRouter();
  const [store, dispatch] = useStore();
  const [scrolled, setScrolled] = useState(false);
  const observerRef = useRef(null);

  const isActive = (route) => route === pathname;
  const isLightTheme =
    pathname === "/" ||
    pathname === "/collections/mens-collection" ||
    pathname === "/collections/womens-collection";

  const sizeOfCart = useMemo(
    () =>
      Object.values(store.cart || {}).reduce(
        (acc, ele) => ((acc += ele.quantity), acc),
        0
      ),
    [store.cart]
  );

  //sticky menu
  useEffect(() => {
    const io_callback = (entries) => {
      if (!entries[0].isIntersecting) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    const io_observer = new IntersectionObserver(io_callback);
    io_observer.observe(observerRef.current);
    return () => io_observer.unobserve(observerRef.current);
  }, []);

  const handleCartClick = () =>
    dispatch({ type: store.cartOpen ? "CLOSE_CART" : "OPEN_CART" });
  return (
    <>
      <$.Menu
        id="menu"
        position={pathname === "/" ? "fixed" : "absolute"}
        transform={store.menuOpen || store.cartOpen ? "translateX(-300px)" : ""}
        scrolled={scrolled && pathname === "/"}
      >
        <$.Wrapper>
          <Logo />
        </$.Wrapper>

        <$.DesktopLinks lightTheme={isLightTheme}>
          <Link href="/collections/mens-collection">
            <a>Mens</a>
          </Link>
          <Link href="/collections/womens-collection">
            <a>Womens</a>
          </Link>
          <Link href="/blog/news">
            <a>Blog</a>
          </Link>
          <Link href="/about">
            <a>About</a>
          </Link>
          <Link href="/contact">
            <a>Contact</a>
          </Link>
          <ul
            css={`
              a {
                margin-right: 0px;
              }
            `}
          >
            <li>
              <Link href="/account">
                <a
                  css={`
                    height: 25px;
                    width: 25px;
                    cursor: pointer;
                  `}
                >
                  <AccountIcon
                    loggedIn={!!user || !!store.user}
                    isLightTheme={isLightTheme}
                  />
                </a>
              </Link>
            </li>
            <li>
              <Search isLightTheme={isLightTheme} />
            </li>
            <li>
              <$.CartButton
                data-size={sizeOfCart}
                id="cart"
                className="OPEN_CART_SIDEBAR"
                onClick={handleCartClick}
              >
                <ShoppingBagIcon lightTheme={isLightTheme} />
              </$.CartButton>
            </li>
          </ul>
        </$.DesktopLinks>
        <$.MobileLinks lightTheme={isLightTheme}>
          <button
            css={`
              svg {
                pointer-events: none;
              }
            `}
            className="OPEN_MENU_SIDEBAR"
            onClick={() =>
              dispatch({ type: store.menuOpen ? "CLOSE_MENU" : "OPEN_MENU" })
            }
          >
            <FontAwesomeIcon icon={["fas", "bars"]} />
          </button>
          <button className="OPEN_CART_SIDEBAR" onClick={handleCartClick}>
            Cart ({sizeOfCart})
          </button>
        </$.MobileLinks>
      </$.Menu>
      <div
        id="header-observer"
        ref={observerRef}
        css={`
          position: absolute;
          top: 0;
        `}
      />
    </>
  );
};

export default Menu;
