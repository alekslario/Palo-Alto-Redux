import React, { useEffect, useRef, useState, useMemo } from "react";
import $ from "./_SideMenu";
import Link from "next/link";
import CrossIcon from "../Icons/Cross";
import { useRouter } from "next/router";
import { useStore } from "../../utils/contextStore";
import LinksAccordion from "../_App/LinksAccordion";

const SideMenu = () => {
  const [store, dispatch] = useStore();
  const sideMenu = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined" || !store.menuOpen) return;
    const handler = (e) => {
      const target = e.target;
      if (
        target.getBoundingClientRect().left <
          sideMenu.current.getBoundingClientRect().left &&
        target.getBoundingClientRect().left !==
          target.getBoundingClientRect().right &&
        !target.classList.contains("OPEN_MENU_SIDEBAR")
      ) {
        dispatch({ type: "CLOSE_MENU" });
      }
    };
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  return (
    <>
      <$.SideMenu ref={sideMenu}>
        <$.Header>
          <$.IconButton
            size={"19"}
            className="CLOSE_CART_SIDEBAR"
            onClick={() => dispatch({ type: "CLOSE_MENU" })}
          >
            <CrossIcon />
          </$.IconButton>
        </$.Header>
        <ul>
          <li>
            <Link href="/">
              <$.MainLink>Home</$.MainLink>
            </Link>
          </li>
          <li>
            <LinksAccordion name="Shop" type="sideMenu">
              <li>
                <Link href="/collections/mens-collection">
                  <a>Men's Collection</a>
                </Link>
              </li>
              <li>
                <Link href="/collections/womens-collection">
                  <a>Women's Collection</a>
                </Link>
              </li>
            </LinksAccordion>
          </li>
          <li>
            <Link href="/blog/news">
              <$.MainLink>Blog</$.MainLink>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <$.MainLink>About</$.MainLink>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <$.MainLink>Contact</$.MainLink>
            </Link>
          </li>
          <li>
            <Link href="/login">
              <a>Log in</a>
            </Link>
          </li>
          <li>
            <Link href="/register">
              <a>Create account</a>
            </Link>
          </li>
          <li>
            <button onClick={() => document.getElementById("search").click()}>
              Search
            </button>
          </li>
        </ul>
      </$.SideMenu>
    </>
  );
};

export default SideMenu;
