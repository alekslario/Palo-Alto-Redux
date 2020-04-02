import Link from "next/link";
const Header = ({ mobile = false }) => (
  <header>
    <Link href="/">
      <a
        mobile={mobile}
        css={`
          display: ${({ mobile }) => (mobile ? "block" : "none")};
          color: ${({ theme }) => theme.checkout.colors.text};
          font-size: 1.71429em;
          @media (min-width: 750px) {
            font-size: 2em;
          }
          @media (min-width: 1000px) {
            display: ${({ mobile }) => (mobile ? "none" : "block")};
          }
        `}
      >
        Palo Alto Redux
      </a>
    </Link>
  </header>
);

export default Header;
