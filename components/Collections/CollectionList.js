import React from "react";
import Link from "next/link";
import CustomSwiper from "react-id-swiper/lib/ReactIdSwiper.custom";
import { Swiper, Navigation, Pagination } from "swiper/js/swiper.esm";
import $ from "./_CollectionList";
import baseUrl from "../../utils/baseUrl";
import {
  lowResMen,
  lowResWomen,
  srcSetMen,
  srcSetWomen
} from "../../utils/heroSrcSet";

const params = {
  Swiper,
  modules: [Navigation, Pagination],
  slidesPerView: "1.25",
  spaceBetween: 20,
  noSwiping: true,
  breakpoints: {
    480: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    1024: {
      slidesPerView: 2,
      spaceBetween: 40
    }
  },
  navigation: {
    nextEl: ".swiper-button-next.collections",
    prevEl: ".swiper-button-prev.collections"
  }
};

const CollectionList = () => {
  return (
    <>
      <$.Header>
        <h1>Collections</h1>
      </$.Header>
      <$.Grid>
        <CustomSwiper {...params}>
          <$.Img
            className="lazyload blur-up"
            data-sizes="auto"
            alt="Men's collection"
            style={{
              backgroundImage: `${lowResMen}`
            }}
            data-bgset={srcSetMen}
          >
            <Link href="collections/mens-collection">
              <a>
                <div role="overlay">
                  <h3>
                    <span>Men's Collection</span>
                  </h3>
                </div>
              </a>
            </Link>
          </$.Img>

          <$.Img
            className="lazyload blur-up"
            // data-sizes="auto"
            alt="Women's collection"
            style={{
              backgroundImage: `${lowResWomen}`
            }}
            data-bgset={srcSetWomen}
          >
            <Link href="collections/womens-collection">
              <a>
                <div role="overlay">
                  <h3>
                    <span>Women's Collection</span>
                  </h3>
                </div>
              </a>
            </Link>
          </$.Img>
        </CustomSwiper>
      </$.Grid>
    </>
  );
};

export default CollectionList;
