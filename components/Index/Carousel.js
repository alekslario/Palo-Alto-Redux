import React from "react";
import CustomSwiper from "react-id-swiper/lib/ReactIdSwiper.custom";
import { Swiper, Navigation, Pagination } from "swiper/js/swiper.esm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import $ from "./_Carousel";
// import Video from "./Video";
const params = {
  Swiper,
  modules: [Navigation, Pagination],
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
};

const Carousel = () => {
  return (
    <>
      <CustomSwiper {...params}>
        <$.Wrapper>
          <img
            src="//cdn.shopify.com/s/files/1/1149/2354/files/girl_180x.jpg?v=1487158746"
            alt=""
            className="lazyload blur-up"
            data-sizes="auto"
            data-parent-fit="cover"
            data-srcset="//cdn.shopify.com/s/files/1/1149/2354/files/girl_180x.jpg?v=1487158746 180w 180h,//cdn.shopify.com/s/files/1/1149/2354/files/girl_360x.jpg?v=1487158746 360w 360h,//cdn.shopify.com/s/files/1/1149/2354/files/girl_540x.jpg?v=1487158746 540w 540h,//cdn.shopify.com/s/files/1/1149/2354/files/girl_720x.jpg?v=1487158746 720w 720h,//cdn.shopify.com/s/files/1/1149/2354/files/girl_900x.jpg?v=1487158746 900w 900h,//cdn.shopify.com/s/files/1/1149/2354/files/girl_1080x.jpg?v=1487158746 1080w 1080h,//cdn.shopify.com/s/files/1/1149/2354/files/girl_1296x.jpg?v=1487158746 1296w 1296h,//cdn.shopify.com/s/files/1/1149/2354/files/girl_1512x.jpg?v=1487158746 1512w 1512h,//cdn.shopify.com/s/files/1/1149/2354/files/girl_1728x.jpg?v=1487158746 1728w 1728h,//cdn.shopify.com/s/files/1/1149/2354/files/girl_1950x.jpg?v=1487158746 1950w 1950h,//cdn.shopify.com/s/files/1/1149/2354/files/girl.jpg?v=1487158746 2048w 2048h"
          />
          <$.HeroTextBlock>
            <h1>Welcome to Palo Alto</h1>
            <h2>Premium outdoorwear with a modern twist</h2>
            <$.CallToAction>
              <button>SHOP NOW</button>
              {/* <Video /> */}
            </$.CallToAction>
          </$.HeroTextBlock>
        </$.Wrapper>

        <$.Wrapper>
          <img
            src="//cdn.shopify.com/s/files/1/1149/2354/files/snow_180x.jpg?v=1487158766"
            alt=""
            className="lazyload blur-up"
            data-sizes="auto"
            data-parent-fit="cover"
            data-srcset="//cdn.shopify.com/s/files/1/1149/2354/files/snow_180x.jpg?v=1487158766 180w 120h,//cdn.shopify.com/s/files/1/1149/2354/files/snow_360x.jpg?v=1487158766 360w 240h,//cdn.shopify.com/s/files/1/1149/2354/files/snow_540x.jpg?v=1487158766 540w 360h,//cdn.shopify.com/s/files/1/1149/2354/files/snow_720x.jpg?v=1487158766 720w 480h,//cdn.shopify.com/s/files/1/1149/2354/files/snow_900x.jpg?v=1487158766 900w 600h,//cdn.shopify.com/s/files/1/1149/2354/files/snow_1080x.jpg?v=1487158766 1080w 720h,//cdn.shopify.com/s/files/1/1149/2354/files/snow_1296x.jpg?v=1487158766 1296w 864h,//cdn.shopify.com/s/files/1/1149/2354/files/snow_1512x.jpg?v=1487158766 1512w 1008h,//cdn.shopify.com/s/files/1/1149/2354/files/snow_1728x.jpg?v=1487158766 1728w 1152h,//cdn.shopify.com/s/files/1/1149/2354/files/snow_1950x.jpg?v=1487158766 1950w 1300h,//cdn.shopify.com/s/files/1/1149/2354/files/snow.jpg?v=1487158766 2048w 1365h"
          />
          <$.HeroTextBlock>
            <h1>Winter Men's Collection</h1>
            <h2>Winter is coming. And so is our outerwear.</h2>
            <$.CallToAction>
              <button>SHOP</button>
            </$.CallToAction>
          </$.HeroTextBlock>
        </$.Wrapper>
        <$.Wrapper>
          <img
            src="//cdn.shopify.com/s/files/1/1149/2354/files/14622804092_f4209c5bb6_k_180x.jpg?v=1486706976"
            alt=""
            className="lazyload blur-up"
            data-sizes="auto"
            data-parent-fit="cover"
            data-srcset="//cdn.shopify.com/s/files/1/1149/2354/files/14622804092_f4209c5bb6_k_180x.jpg?v=1486706976 180w 120h,//cdn.shopify.com/s/files/1/1149/2354/files/14622804092_f4209c5bb6_k_360x.jpg?v=1486706976 360w 240h,//cdn.shopify.com/s/files/1/1149/2354/files/14622804092_f4209c5bb6_k_540x.jpg?v=1486706976 540w 360h,//cdn.shopify.com/s/files/1/1149/2354/files/14622804092_f4209c5bb6_k_720x.jpg?v=1486706976 720w 480h,//cdn.shopify.com/s/files/1/1149/2354/files/14622804092_f4209c5bb6_k_900x.jpg?v=1486706976 900w 600h,//cdn.shopify.com/s/files/1/1149/2354/files/14622804092_f4209c5bb6_k_1080x.jpg?v=1486706976 1080w 720h,//cdn.shopify.com/s/files/1/1149/2354/files/14622804092_f4209c5bb6_k_1296x.jpg?v=1486706976 1296w 864h,//cdn.shopify.com/s/files/1/1149/2354/files/14622804092_f4209c5bb6_k_1512x.jpg?v=1486706976 1512w 1008h,//cdn.shopify.com/s/files/1/1149/2354/files/14622804092_f4209c5bb6_k_1728x.jpg?v=1486706976 1728w 1152h,//cdn.shopify.com/s/files/1/1149/2354/files/14622804092_f4209c5bb6_k_1950x.jpg?v=1486706976 1950w 1300h,//cdn.shopify.com/s/files/1/1149/2354/files/14622804092_f4209c5bb6_k.jpg?v=1486706976 2048w 1365h"
          />
          <$.HeroTextBlock>
            <h1>Climbing Gear</h1>
            <h2>Stay stylish with out latest climbing gear.</h2>
            <$.CallToAction>
              <button>SHOP</button>
            </$.CallToAction>
          </$.HeroTextBlock>
        </$.Wrapper>
      </CustomSwiper>
    </>
  );
};

export default Carousel;
