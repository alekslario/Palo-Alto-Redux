import Link from "next/link";
const Header = ({ padding }) => (
  <div
    css={`
      padding: ${padding};
    `}
  >
    <Link href="/">
      <a
        css={`
          color: ${({ theme }) => theme.checkout.colors.text};
          font-size: 1.71429em;
          cursor: pointer;
          @media (min-width: 750px) {
            font-size: 2em;
          }
        `}
      >
        Palo Alto Redux
      </a>
    </Link>
  </div>
);

export default Header;
