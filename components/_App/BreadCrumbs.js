import React from "react";
import Link from "next/link";
import $ from "./_BreadCrumbs";

const route = {
  men: { path: "collections/mens-collection", name: "Men's Collection" },
  women: { path: "collections/womens-collection", name: "Women's Collection" },
  collections: { path: "collections", name: "Collections" }
};
const BreadCrumbs = ({ parentPath = "collections", currentPath }) => {
  return (
    <$.BreadCrumbs>
      <Link href="/">
        <a>Home</a>
      </Link>
      <span>></span>
      <Link href={`/${route[parentPath].path}`}>
        <a>{route[parentPath].name}</a>
      </Link>
      <span>></span>
      <span>{currentPath}</span>
    </$.BreadCrumbs>
  );
};

export default BreadCrumbs;
