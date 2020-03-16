import Router, { useRouter } from "next/router";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShoppingBagIcon from "../Icons/ShoppingBag";
import Logo from "../Icons/Logo";
import AccountIcon from "../Icons/Account";
import Search from "./Search";
import { useStore } from "../../utils/contextStore";
import { handleLogout } from "../../utils/auth";
import $ from "./_Menu";
const Menu = ({ user }) => {
  const { pathname } = useRouter();
  const [store, dispatch] = useStore();
  const isRootOrAdmin = user && (user.role === "root" || user.role === "admin");
  const isActive = route => route === pathname;
  const isLightTheme =
    pathname === "/" ||
    pathname === "/collections/mens-collection" ||
    pathname === "/collections/womens-collection";
  return (
    <$.Menu id="menu" position={pathname === "/" ? "fixed" : "absolute"}>
      <$.Wrapper>{isLightTheme && <Logo />}</$.Wrapper>

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
        <$.IconButton size={"25"}>
          <AccountIcon loggedIn={!!store.auth} isLightTheme={isLightTheme} />
        </$.IconButton>

        <Search isLightTheme={isLightTheme} />
        <$.CartButton
          data-size={9}
          id="cart"
          onClick={() => {
            dispatch({ type: "TOGGLE_MENU" });
          }}
        >
          <ShoppingBagIcon lightTheme={isLightTheme} />
        </$.CartButton>
      </$.DesktopLinks>
      <$.MobileLinks lightTheme={isLightTheme}>
        <button>
          <FontAwesomeIcon icon={["fas", "bars"]} />
        </button>
        <span>Cart (0)</span>
      </$.MobileLinks>
    </$.Menu>
  );
};

export default Menu;

{
  //   <SiteMenu right pageWrapId="main" outerContainerId="__next">
  //   <div>
  //     <Link href="/">
  //       <a>polo</a>
  //     </Link>
  //   </div>
  // </SiteMenu>
  /* <Menu stackable fluid id="menu" inverted>
      <Container text>
        <Link href="/">
          <Menu.Item header active={isActive("/")}>
            <Image
              size="mini"
              src="/public/logo.svg"
              style={{ marginRight: "1em" }}
            />
            ReactReserve
          </Menu.Item>
        </Link>

        <Link href="/cart">
          <Menu.Item header active={isActive("/cart")}>
            <Icon name="cart" size="large" />
            Cart
          </Menu.Item>
        </Link>

        {isRootOrAdmin && (
          <Link href="/create">
            <Menu.Item header active={isActive("/create")}>
              <Icon name="add square" size="large" />
              Create
            </Menu.Item>
          </Link>
        )}

        {user ? (
          <>
            <Link href="/account">
              <Menu.Item header active={isActive("/account")}>
                <Icon name="user" size="large" />
                Account
              </Menu.Item>
            </Link>

            <Menu.Item onClick={handleLogout} header>
              <Icon name="sign out" size="large" />
              Logout
            </Menu.Item>
          </>
        ) : (
          <>
            <Link href="/login">
              <Menu.Item header active={isActive("/login")}>
                <Icon name="sign in" size="large" />
                Login
              </Menu.Item>
            </Link>

            <Link href="/signup">
              <Menu.Item header active={isActive("/signup")}>
                <Icon name="signup" size="large" />
                Signup
              </Menu.Item>
            </Link>
          </>
        )}
      </Container>
    </Menu> */
}
