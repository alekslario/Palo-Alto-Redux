import React, { useEffect } from "react";
import Products from "../../components/Product/Products";
import Hero from "../../components/_App/Hero";
import BreadCrumbs from "../../components/_App/BreadCrumbs";
import Filters from "../../components/Collections/Filters";
import $ from "../../components/Collections/_CollectionLayout";
const WomensCollection = () => {
  return (
    <>
      <Hero
        collection="Women's Collection"
        about="Our Women's Clothing line is designed for the outdoor experience. You'll stay warm in cold weather and cool in hot weather. These clothes are made with the finest materials so they're built to last."
        men={false}
      />
      <$.Grid>
        <Filters gender="women" />
        <div>
          <$.BreadcrumbsBlock>
            <BreadCrumbs currentPath="Women's Collection" />
          </$.BreadcrumbsBlock>
          <Products gender="women" filterOn={true} />
        </div>
      </$.Grid>
    </>
  );
};

export default WomensCollection;
