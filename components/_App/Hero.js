import React from "react";
import $ from "./_Hero";
import {
  lowResMen,
  lowResWomen,
  srcSetMen,
  srcSetWomen
} from "../../utils/heroSrcSet";

const Hero = ({ collection, about, men = true }) => {
  return (
    <$.Wrapper>
      <img
        src={men ? lowResMen : lowResWomen}
        alt=""
        className="lazyload blur-up"
        data-sizes="auto"
        data-parent-fit="cover"
        data-srcset={men ? srcSetMen : srcSetWomen}
      />
      <$.Text>
        <h1>{collection}</h1>
        <h2>{about}</h2>
      </$.Text>
    </$.Wrapper>
  );
};

export default Hero;
