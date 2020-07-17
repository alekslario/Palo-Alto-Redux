import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "../components/Index/Carousel";
import Products from "../components/Product/Products";
import Parallax from "../components/Index/Parallax";
import InstagramFeed from "../components/Index/InstagramFeed";
import $ from "../components/_App/_Statement";

const Home = () => {
  const [instagram, setInstagram] = useState({});
  useEffect(() => {
    //monkey patching swiper+lazysizes
    const ele = document.querySelector(".swiper-wrapper div:nth-child(5) img");
    ele.classList.remove("lazyloading");
    ele.classList.add("lazyload");
  }, []);

  useEffect(() => {
    //disable  on edge background-attachment:fixed
    if (window.navigator.userAgent.indexOf("Edge/") > -1) {
      document.querySelector("#parallax").style["background-attachment"] =
        "initial";
    }
  }, []);

  // useEffect(() => {
  //   async function getPics() {
  //     const url =
  //       "https://api.instagram.com/v1/users/self/media/recent/?access_token=2610950468.48132c5.6d6d2912a3a94a87a107236920f02063&count=12";
  //     return await axios.get(url);
  //   }
  //   // return response data as an object
  //   const response = getPics();
  //   setInstagram(response.data);
  // }, []);

  return (
    <>
      <Carousel />
      <$.Statement>
        <img
          alt=""
          className="lazyload blur-up"
          data-sizes="auto"
          data-aspectratio="1.499267935578331"
          src="//cdn.shopify.com/s/files/1/1149/2354/files/15505250836_83b11760c1_k_1024x_423e4aa7-f443-452b-9c39-ea37a3fd0b30_295x.jpg?v=1487158679"
          data-srcset="//cdn.shopify.com/s/files/1/1149/2354/files/15505250836_83b11760c1_k_1024x_423e4aa7-f443-452b-9c39-ea37a3fd0b30_295x.jpg?v=1487158679 295w, //cdn.shopify.com/s/files/1/1149/2354/files/15505250836_83b11760c1_k_1024x_423e4aa7-f443-452b-9c39-ea37a3fd0b30_394x.jpg?v=1487158679 394w, //cdn.shopify.com/s/files/1/1149/2354/files/15505250836_83b11760c1_k_1024x_423e4aa7-f443-452b-9c39-ea37a3fd0b30_590x.jpg?v=1487158679 590w, //cdn.shopify.com/s/files/1/1149/2354/files/15505250836_83b11760c1_k_1024x_423e4aa7-f443-452b-9c39-ea37a3fd0b30_700x.jpg?v=1487158679 700w, //cdn.shopify.com/s/files/1/1149/2354/files/15505250836_83b11760c1_k_1024x_423e4aa7-f443-452b-9c39-ea37a3fd0b30_800x.jpg?v=1487158679 800w, //cdn.shopify.com/s/files/1/1149/2354/files/15505250836_83b11760c1_k_1024x_423e4aa7-f443-452b-9c39-ea37a3fd0b30_1000x.jpg?v=1487158679 1000w, //cdn.shopify.com/s/files/1/1149/2354/files/15505250836_83b11760c1_k_1024x_423e4aa7-f443-452b-9c39-ea37a3fd0b30_1024x.jpg?v=1487158679 1024w, //cdn.shopify.com/s/files/1/1149/2354/files/15505250836_83b11760c1_k_1024x_423e4aa7-f443-452b-9c39-ea37a3fd0b30_1024x.jpg?v=1487158679 1024w"
        />
        <div>
          <h1>Locally-sourced, modern, and classic</h1>
          <hr />
          <p>
            I started with a simple goal: make clothing that fits me. I had
            always struggled to find the right fit or the right style so I
            decided to do it myself. Since 2012, we've spread to stores across
            the US and Canada and we're proud to stick to our sustainable
            production values.
          </p>
        </div>
      </$.Statement>
      <Products padding="50px" gender="men" limitProducts={8} />
      <Parallax />
      <Products padding="50px" gender="women" limitProducts={4} />
      <InstagramFeed instagram={instagram} />
    </>
  );
};

export default Home;
