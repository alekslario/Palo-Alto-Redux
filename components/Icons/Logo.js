import Link from "next/link";
export default ({ sizes = "30px" }) => (
  <Link href="/">
    <a>
      <img
        className="lazyload"
        data-aspectratio="1.263157894736842"
        data-sizes={sizes}
        alt={""}
        data-src="//cdn.shopify.com/s/files/1/1149/2354/files/logo_96x.png?v=1485299663"
        data-srcset="//cdn.shopify.com/s/files/1/1149/2354/files/logo_96x.png?v=1485299663 96w"
      />
    </a>
  </Link>
);
