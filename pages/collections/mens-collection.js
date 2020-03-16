import React, { useEffect } from "react";
import Products from "../../components/Product/Products";
import Hero from "../../components/_App/Hero";
import BreadCrumbs from "../../components/_App/BreadCrumbs";
import Filters from "../../components/Collections/Filters";
import $ from "../../components/Collections/_CollectionLayout";
const MensCollection = () => {
  return (
    <>
      <Hero
        collection="Men's Collection"
        about="Our men's collection is inspired by our father's and grandfather's
          closets. Our tops, bottoms, outerwear, and accessories are classics
          with a modern twist. What's more, they are built to last for years to
          come."
        url="//cdn.shopify.com/s/files/1/1149/2354/collections/mens-collection"
      />
      <$.Grid>
        <Filters gender="men" />
        <div>
          <$.BreadcrumbsBlock>
            <BreadCrumbs currentPath="Men's Collection" />
          </$.BreadcrumbsBlock>
          <Products filterOn={true} gender="men" />
        </div>
      </$.Grid>
    </>
  );
};

export default MensCollection;
