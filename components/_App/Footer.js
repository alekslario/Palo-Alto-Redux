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
          <Link href="/Search">
            <a>Search</a>
          </Link>
          <Link href="/About">
            <a>About</a>
          </Link>
          <Link href="/Blog">
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
        <FontAwesomeIcon icon={["fab", "facebook-square"]} />
        <FontAwesomeIcon icon={["fab", "twitter"]} />
        <FontAwesomeIcon icon={["fab", "pinterest"]} />
        <FontAwesomeIcon icon={["fab", "instagram"]} />
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
