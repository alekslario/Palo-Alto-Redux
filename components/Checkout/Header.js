import React from "react";
import Link from "next/link";
import { mobileOrDesktop } from "../../styles/reusable";
const Header = React.memo(({ padding, ...rest }) => (
  <div
    {...rest}
    css={`
      padding: ${padding};
      ${mobileOrDesktop}
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
));

export default Header;
