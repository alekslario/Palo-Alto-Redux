import { createGlobalStyle } from "styled-components";
import styledNormalize from "styled-normalize";
export default createGlobalStyle`
  ${styledNormalize}
  * {
    box-sizing: border-box;
  }
  html, body, #__next, main {
      height: 100%;
      width:100%;
  }
  .swiper-container, .swiper-wrapper {
    width:100%;
  }
  #__next{
    position:relative;
  }
  body {
    font-size: 14px;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.alpha};
    font-family: ${({ theme }) => theme.font_family.primary};
    font-weight: 400;
    overflow-x: hidden;   
    background-color: ${({ theme }) => theme.colors.primary};
    -webkit-font-smoothing: antialiased;
  }
  a {
    text-decoration: none;
    color:${({ theme }) => theme.colors.alpha};
  }
  ul{
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  button {
   padding: 0;
   border: none;
   outline: none;
   font: inherit;
   background: none;
   cursor: pointer;
   text-align: center;
   text-decoration: none;
   transition: 0.1s ease-in-out;
   &:hover {
     opacity: 0.8;
    }
  }
  textarea:focus, input:focus{
    outline: none;
  }
  
  .blur-up {
		-webkit-filter: blur(5px);
		filter: blur(5px);
		transition: filter 400ms, -webkit-filter 400ms;
    
	}
	.blur-up.lazyloaded {
    -webkit-filter: blur(0.001px);
		filter: blur(0.001px);
	}

  .swiper-button-prev:after, .swiper-button-next:after{
    color:${({ theme }) => theme.colors.primary};
    font-size:28px !important;
    @media (max-width: 479px) {
    display:none;
    }
  }
  .swiper-button-prev.product-details:after, .swiper-button-next.product-details:after{
    color:${({ theme }) => theme.colors.secondary};
    font-size:28px !important;
    @media (max-width: 479px) {
    display:block;
    }
  }
  .swiper-button-prev.collections:after, .swiper-button-next.collections:after{
    display:block;
    @media (min-width: 480px) {
    display:none;
    }
  }
  .swiper-button-prev.collections:after, .swiper-button-next.collections:after{
    display:block;
    @media (min-width: 480px) {
    display:none;
    }
  }
  .swiper-button-prev.collections.swiper-button-disabled:after, .swiper-button-next.collections.swiper-button-disabled:after{
    display:none;
  
  }

  .scrolled-menu{
    background-color:${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.secondary};
    a{
      color: ${({ theme }) => theme.colors.secondary};
    }
    button{
      color:${({ theme }) => theme.colors.secondary};
    }
    .searchSvg{
      stroke:${({ theme }) => theme.colors.secondary};
    }
    .bagSvg{
      fill:${({ theme }) => theme.colors.secondary};
    }
    #account-svg{
      fill:${({ theme, loggedIn }) =>
        loggedIn ? theme.colors.secondary : "none"};
    }
    #account-svg-g{
      stroke:${({ theme }) => theme.colors.secondary};
    }
  }
`;
