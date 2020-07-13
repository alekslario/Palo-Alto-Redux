import Link from "next/link";
const Logo = React.memo(({ sizes = "30px" }) => (
  <Link href="/">
    <a
      css={`
        width: ${sizes};
        cursor: pointer;
        img {
          display: block;
          width: 100%;
        }
      `}
    >
      <img
        src={
          "//cdn.shopify.com/s/files/1/1149/2354/files/logo_96x.png?v=1485299663"
        }
        className="lazyload"
        data-aspectratio="1.263157894736842"
        alt={""}
      />
    </a>
  </Link>
));
export default Logo;
