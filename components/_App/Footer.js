import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import paymentIcons from "../Icons/PaymentIcons";
import Logo from "../Icons/Logo";
import NewsLetter from "./NewsLetter";
import LinksAccordion from "./LinksAccordion";
import $ from "./_Footer";

const Footer = () => (
  <$.Footer>
    <$.Grid>
      <$.Column width="auto" padding="0 15px 0 5px">
        <Logo sizes="25px" />
      </$.Column>
      <$.Column width="auto">
        <LinksAccordion type="menu">
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="contact">
            <a>Contact</a>
          </Link>
          <button onClick={() => document.getElementById("search").click()}>
            Search
          </button>

          <Link href="/about">
            <a>About</a>
          </Link>
          <Link href="/blog/news">
            <a>Blog</a>
          </Link>
        </LinksAccordion>
      </$.Column>
      <$.Column width="auto">
        <$.About>
          <h5>About us</h5>
          <p>
            These lovely images are courtesy of the talented Alison Vagnini and
            Topo Designs. Check them out. Now!
          </p>
        </$.About>
      </$.Column>
      <$.Column width="260px" padding="0 5px 0 15px">
        <NewsLetter />
      </$.Column>
    </$.Grid>
    <$.Bottom>
      <$.SocialIcons>
        <Link href="/">
          <a>
            <FontAwesomeIcon icon={["fab", "facebook-square"]} />
          </a>
        </Link>
        <Link href="/">
          <a>
            <FontAwesomeIcon icon={["fab", "twitter"]} />
          </a>
        </Link>
        <Link href="/">
          <a>
            <FontAwesomeIcon icon={["fab", "pinterest"]} />
          </a>
        </Link>
        <Link href="/">
          <a>
            <FontAwesomeIcon icon={["fab", "instagram"]} />
          </a>
        </Link>
      </$.SocialIcons>
      <$.Copyright>
        © 2020,{" "}
        <Link href="/">
          <a>Palo Alto Redux.</a>
        </Link>{" "}
        <a target="_blank" rel="nofollow" href="https://reactjs.org/">
          Powered by React.
        </a>
      </$.Copyright>
      <$.PaymentIcons>
        {paymentIcons.map((icon, index) => (
          <li key={index}>{icon}</li>
        ))}
      </$.PaymentIcons>
    </$.Bottom>
  </$.Footer>
);

export default Footer;
