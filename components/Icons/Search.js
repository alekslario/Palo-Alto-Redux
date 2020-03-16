import React from "react";
export default ({ lightTheme = true }) => (
  <svg height="100%" viewBox="0 0 50 51">
    <g fill="none" fillRule="evenodd">
      <g
        className="searchSvg"
        transform="translate(1 2)"
        stroke={lightTheme ? "#fff" : "#000"}
        strokeWidth="3"
      >
        <path d="m38.979 19.587c0 10.564-8.5636 19.127-19.127 19.127-10.564 0-19.128-8.5626-19.128-19.127 0-10.564 8.5636-19.127 19.128-19.127 10.563 0 19.127 8.5626 19.127 19.127z" />
        <path d="m33.401 33.135 14.345 14.345" />
      </g>
    </g>
  </svg>
);
