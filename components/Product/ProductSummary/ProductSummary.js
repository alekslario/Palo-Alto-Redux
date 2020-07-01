import { useState, useEffect } from "react";
import { useFetchEntries } from "../../../utils/useFetchEntries";
import Swiper from "react-id-swiper";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Products from "../Products";
import $ from "./_ProductSummary";
import BreadCrumbs from "../../_App/BreadCrumbs";
import LinksAccordion from "../../_App/LinksAccordion";
import SocialShare from "../../_App/SocialShare";
import formatMoney from "../../../utils/formatMoney";
import AddToCart from "../AddToCart";
import Image from "../../_App/Image";
const ProductSummary = ({ id, inStock = true }) => {
  const [option, setOption] = useState(0);
  const [gallerySwiper, getGallerySwiper] = useState(null);
  const [thumbnailSwiper, getThumbnailSwiper] = useState(null);

  const [product, loading] = useFetchEntries({
    content_type: "paloAltoProduct",
    "sys.id": id,
  });

  const {
    fields: { name, description, type, styles = [] },
  } = product[0] || { fields: {} };
  const multipleKinds = styles.length > 1;

  const gallerySwiperParams = {
    getSwiper: getGallerySwiper,
    slidesPerView: 1,
    spaceBetween: 0,
    navigation: {
      nextEl: ".swiper-button-next.product-details",
      prevEl: ".swiper-button-prev.product-details",
    },
    on: {
      activeIndexChange: function () {
        if (multipleKinds) setOption(this.activeIndex);
      },
    },
  };
  const thumbnailSwiperParams = {
    getSwiper: getThumbnailSwiper,
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: "auto",
    touchRatio: 0.2,
    slideToClickedSlide: true,
  };

  useEffect(() => {
    if (
      gallerySwiper !== null &&
      gallerySwiper.controller &&
      thumbnailSwiper !== null &&
      thumbnailSwiper.controller
    ) {
      gallerySwiper.controller.control = thumbnailSwiper;
      thumbnailSwiper.controller.control = gallerySwiper;
    }
  }, [gallerySwiper, thumbnailSwiper]);
  //path to urls ⮯
  // product[0].fields.styles[0].fields.images[0].fields.file.url
  //   <img
  //   key={index}
  //   css={style}
  //   src={url + "?w=180"}
  //   alt=""
  //   className="lazyload blur-up"
  //   data-sizes="auto"
  //   data-parent-fit="cover"
  //   data-srcset={createContentfulSrc(url)}
  // />
  const makeSwiper = (params, style = "") => (
    <Swiper {...params}>
      {(multipleKinds ? styles : [styles[0]]).map(({ fields: { images } }) =>
        images.map(({ fields: { file: { url } } }, index) => (
          <Image url={url} key={index} css={style} />
        ))
      )}
    </Swiper>
  );
  // fix buttons without click animation //todo
  return (
    <$.Wrapper>
      <BreadCrumbs parentPath={type} currentPath={name || ""} />
      <$.Grid>
        <div>
          {styles.length > 0 && makeSwiper(gallerySwiperParams)}
          {styles.length > 0 &&
            makeSwiper(
              thumbnailSwiperParams,
              `
              height: 60px;
              width: 60px;
            `
            )}
        </div>
        <div>
          <h1>{name}</h1>
          <p
            css={`
              font-size: 18px;
            `}
          >
            {styles.length > 0 &&
              (styles[option].fields.reducedPrice &&
              styles[option].fields.reducedPriceExpiration &&
              Date.now() <
                new Date(
                  styles[option].fields.reducedPriceExpiration
                ).getTime() ? (
                <>
                  <span
                    css={`
                      text-decoration: line-through;
                    `}
                  >
                    {formatMoney(styles[option].fields.price)}
                  </span>{" "}
                  <span>{formatMoney(styles[option].fields.reducedPrice)}</span>
                </>
              ) : (
                <span>{formatMoney(styles[option].fields.price)}</span>
              ))}
          </p>
          {multipleKinds && (
            <p>
              Color:{" "}
              <strong>
                <span
                  css={`
                    color: black;
                  `}
                >
                  {styles[option].fields.style}
                </span>
              </strong>
            </p>
          )}
          {!inStock && <p>Out of stock</p>}
          {styles.length > 0 && (
            <>
              <AddToCart
                product={{
                  contentId: id,
                  productId: styles[option].sys.id,
                }}
              >
                <$.Button className="OPEN_CART_SIDEBAR">ADD TO CART</$.Button>
              </AddToCart>

              <AddToCart
                product={{
                  contentId: id,
                  productId: styles[option].sys.id,
                }}
                checkout={true}
              >
                <$.Button black={true}>BUY IT NOW</$.Button>
              </AddToCart>
            </>
          )}
          <div
            css={`
              line-height: 2;
            `}
          >
            {documentToReactComponents(description)}
          </div>

          <$.List>
            <li>
              <LinksAccordion name="Features" type="features">
                <ul>
                  <li>All of our products are made with YKK zippers</li>
                  <li>
                    We make the hardware on all of our bags with heavy duty
                    plastic
                  </li>
                  <li>
                    Comfort is important to us. All bag straps are contoured for
                    ideal support based on how you carry the pack.
                  </li>
                </ul>
              </LinksAccordion>
            </li>
            <li>
              <LinksAccordion name="Guarantee" type="features">
                <p>
                  We take pride in our craft and selection of materials and
                  believe deeply in our process. We offer a lifetime guarantee
                  on all of our bags.
                </p>
              </LinksAccordion>
            </li>
          </$.List>
          {styles.length > 0 && (
            <SocialShare
              title={name}
              image={styles[option].fields.images[0].fields.file.url}
            />
          )}
        </div>
      </$.Grid>
      <$.Faq>
        <h1
          css={`
            text-align: center;
          `}
        >
          FAQ
        </h1>
        <ul>
          <li>
            <LinksAccordion type="faq" name="Shipping">
              <p>
                <strong>Do you ship internationally?</strong>
              </p>
              <p>Yes, we ship worldwide.</p>
              <p>
                <strong>Does it cost extra for shipping?</strong>
              </p>
              <p>
                We offer free shipping in the lower 48 states and offer shipping
                options for all other locations.
              </p>
              <p>
                <strong>How long will it take to receive my order?</strong>
              </p>
              <p>
                Free shipping takes 5-7 business days. You can choose to pay
                extra for faster shipping.
              </p>
            </LinksAccordion>
          </li>
          <li>
            <LinksAccordion type="faq" name="Orders">
              <p>
                <strong>Can I return my order if I don't like it?</strong>
              </p>
              <p>Yes,&nbsp;we gladly accept returns and offer a full refund.</p>
              <p>
                <strong>Do you have an option to give as a gift?</strong>
              </p>
              <p>
                Sorry, but we do not offer any gifting services at this time.
              </p>
              <p>
                <strong>What do I do if my product was damaged?</strong>
              </p>
              <p>
                We are sorry for the inconvenience! Contact our support team so
                we can file the details and make it right for you.
              </p>
            </LinksAccordion>
          </li>
          <li>
            <LinksAccordion type="faq" name="Product Care">
              <p>
                <strong>How can I wash it?</strong>
              </p>
              <p>You can wash it on a gentle cycle and then hang it to dry.</p>
            </LinksAccordion>
          </li>
        </ul>
      </$.Faq>
      <$.QualityStatement>
        <img
          alt=""
          className="lazyload blur-up"
          data-sizes="auto"
          data-aspectratio="1.499267935578331"
          src="//cdn.shopify.com/s/files/1/1149/2354/files/43937697132_6f128e83f0_k_180x.jpg?v=1580899474"
          data-srcset="//cdn.shopify.com/s/files/1/1149/2354/files/43937697132_6f128e83f0_k_180x.jpg?v=1580899474 180w 120h,//cdn.shopify.com/s/files/1/1149/2354/files/43937697132_6f128e83f0_k_360x.jpg?v=1580899474 360w 240h,//cdn.shopify.com/s/files/1/1149/2354/files/43937697132_6f128e83f0_k_540x.jpg?v=1580899474 540w 360h,//cdn.shopify.com/s/files/1/1149/2354/files/43937697132_6f128e83f0_k_720x.jpg?v=1580899474 720w 480h,//cdn.shopify.com/s/files/1/1149/2354/files/43937697132_6f128e83f0_k_900x.jpg?v=1580899474 900w 600h,//cdn.shopify.com/s/files/1/1149/2354/files/43937697132_6f128e83f0_k_1080x.jpg?v=1580899474 1080w 720h,//cdn.shopify.com/s/files/1/1149/2354/files/43937697132_6f128e83f0_k_1296x.jpg?v=1580899474 1296w 864h,//cdn.shopify.com/s/files/1/1149/2354/files/43937697132_6f128e83f0_k_1512x.jpg?v=1580899474 1512w 1008h,//cdn.shopify.com/s/files/1/1149/2354/files/43937697132_6f128e83f0_k_1728x.jpg?v=1580899474 1728w 1152h,//cdn.shopify.com/s/files/1/1149/2354/files/43937697132_6f128e83f0_k_1950x.jpg?v=1580899474 1950w 1300h,//cdn.shopify.com/s/files/1/1149/2354/files/43937697132_6f128e83f0_k.jpg?v=1580899474 2048w 1365h"
        />
        <div>
          <h1>We are obsessed with the process.</h1>
          <hr />
          <p>
            Handmade, one stitch at a time with materials we know and trust,
            because that is how we do it. All of our products are hand made in
            the USA and produced with the finest materials and craftsmanship. In
            an age of mass produced products and throw away culture we take a
            step back in time, to when handcrafted, quality items were the rage.
          </p>
        </div>
      </$.QualityStatement>
      <h3
        css={`
          text-align: center;
        `}
      >
        You May Also Like
      </h3>
      <Products limitProducts={4} padding="0" />
    </$.Wrapper>
  );
};

export default ProductSummary;
