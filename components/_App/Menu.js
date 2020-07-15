import { useMemo } from "react";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShoppingBagIcon from "../Icons/ShoppingBag";
import Logo from "../Icons/Logo";
import AccountIcon from "../Icons/Account";
import Search from "./Search";
import { useStore } from "../../utils/contextStore";
// style={{ position: pathname === "/" ? "fixed" : "absolute" }}
import $ from "./_Menu";
const Menu = ({ user }) => {
  const { pathname } = useRouter();
  const [store, dispatch] = useStore();
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
  const handleCartClick = () =>
    dispatch({ type: store.cartOpen ? "CLOSE_CART" : "OPEN_CART" });
  return (
    <$.Menu id="menu" position={pathname === "/" ? "fixed" : "absolute"}>
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
  );
};

export default Menu;
