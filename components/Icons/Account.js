export default ({ loggedIn = false, isLightTheme = true }) => (
  <svg height="100%" viewBox="0 0 42 50">
    <g
      stroke="none"
      strokeWidth="3"
      id="account-svg"
      fill={loggedIn ? (isLightTheme ? "#fff" : "#000") : "none"}
      fillRule="evenodd"
      strokeLinecap="round"
    >
      <g
        id="account-svg-g"
        transform="translate(-1080.000000, -340.000000)"
        stroke={isLightTheme ? "#fff" : "#000"}
      >
        <g id="User" transform="translate(1081.000000, 341.000000)">
          <path d="M40.3311,38.7863 L40.3311,47.0753 C40.3311,47.7793 39.7681,48.3493 39.0731,48.3493 L1.3311,48.3493 C0.6361,48.3493 0.0731,47.7793 0.0731,47.0753 L0.0731,38.7863 C0.0731,32.0963 9.0851,26.6723 20.2021,26.6723 C31.3191,26.6723 40.3311,32.0963 40.3311,38.7863 Z"></path>
          <path d="M31.0408,11.1886 C31.0408,17.1746 26.1878,22.0276 20.2018,22.0276 C14.2158,22.0276 9.3638,17.1746 9.3638,11.1886 C9.3638,5.2026 14.2158,0.3496 20.2018,0.3496 C26.1878,0.3496 31.0408,5.2026 31.0408,11.1886 Z"></path>
        </g>
      </g>
    </g>
  </svg>
);
