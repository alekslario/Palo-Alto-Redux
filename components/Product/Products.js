import React, { useEffect, useState, useMemo, useRef } from "react";
import Product from "../Product/Product";
import $ from "./_Products";
import { useStore } from "../../utils/contextStore";
import { useFetchEntries } from "../../utils/useFetchEntries";
import LoadingCircle from "../_App/LoadingCircle";
import { useLazyLoading } from "../../utils/useLazyLoading";
import { useDelayedLoader } from "../../utils/useDelayedLoader";

const Products = ({
  gender,
  filterOn,
  limitProducts,
  suggestID,
  padding,
  inputDependency
}) => {
  const [store] = useStore();
  const limitDefault = limitProducts || 4;
  const contentHeight = useRef(null);
  const [{ limit, skip }, setLimits] = useState({
    limit: limitDefault,
    skip: 0
  });
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [showNotFound, setShowNotFound] = useState(false);

  useEffect(() => {
    setFetchedProducts([]);
    setLimits({ limit: limitDefault, skip: 0 });
  }, [store.filter[gender], ...(inputDependency ? inputDependency : [])]);

  const checkedFilters = useMemo(() => {
    return filterOn
      ? Object.keys(store.filter[gender])
          .map(ele => (store.filter[gender][ele] ? ele.toLowerCase() : ""))
          .filter(ele => ele)
          .join(",")
      : "";
  }, [store.filter[gender]]);

  const [products, loading, timeStamp] = useFetchEntries({
    ...(checkedFilters ? { "fields.tags[in]": checkedFilters } : {}),
    ...(gender ? { "fields.type": gender } : {}),
    ...(inputDependency
      ? {
          "fields.name[match]": inputDependency[0]
        }
      : {}),
    skip,
    limit,
    dependency: [
      skip,
      ...(filterOn ? [store.filter[gender]] : []),
      ...(inputDependency ? inputDependency : [])
    ],
    content_type: "paloAltoProduct",
    order: "sys.createdAt"
  });

  useEffect(() => {
    setFetchedProducts(prevState => [...prevState, ...products]);
  }, [products]);

  const [observeRef] = useLazyLoading({
    items: products,
    timeStamp,
    limitDefault,
    setLimits,
    disable: limitProducts,
    scrollingNode: () => document.getElementById("portal") || window
  });

  const [showLoader] = useDelayedLoader(loading);

  useEffect(() => {
    if (fetchedProducts.length > 0 || loading) {
      setShowNotFound(false);
      return;
    } else if (!loading && fetchedProducts.length === 0) {
      setShowNotFound(true);
    }
  }, [fetchedProducts, loading]);
  return (
    <>
      <$.Grid padding={padding}>
        {fetchedProducts.map((product, index) => {
          return (
            <Product
              product={product}
              key={index}
              ref={index + 1 === fetchedProducts.length ? observeRef : null}
            />
          );
        })}
      </$.Grid>

      {showLoader && !limitProducts && (
        <$.LoadingWrapper>
          <LoadingCircle />
          <p>Loading more...</p>
        </$.LoadingWrapper>
      )}
      {!loading &&
        showNotFound &&
        fetchedProducts.length === 0 &&
        !limitProducts && (
          <$.LoadingWrapper>
            <p
              css={`
                margin-top: 65px;
              `}
            >
              No results found
            </p>
          </$.LoadingWrapper>
        )}
    </>
  );
};

export default Products;
