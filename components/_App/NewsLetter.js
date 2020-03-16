import React, { useState, useEffect } from "react";
import $ from "./_NewsLetter";
const NewsLetter = () => (
  <$.Wrapper>
    <p>Newsletter</p>
    <div>
      <$.Input placeholder="email@example.com" />
      <$.Button />
    </div>
  </$.Wrapper>
);

export default NewsLetter;
