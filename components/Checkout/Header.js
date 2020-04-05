import Link from "next/link";
const Header = () => (
  <div>
    <Link href="/">
      <a
        css={`
          color: ${({ theme }) => theme.checkout.colors.text};
          font-size: 1.71429em;
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
