import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo
} from "react";
import Product from "../Product/Product";
import $ from "./_Products";
import { useStore } from "../../utils/contextStore";
import { useFetchEntries } from "../../utils/useFetchEntries";
import LoadingCircle from "../_App/LoadingCircle";
import debounce from "lodash.debounce";
import isScrolledIntoView from "../../utils/isScrolledIntoView";

const Products = ({
  gender,
  filterOn,
  limitProducts,
  suggestID,
  padding,
  inputDependency
}) => {
  const [store] = useStore();
  const observeRef = useRef(null);
  const oldTimeStamp = useRef(0);
  const limitDefault = limitProducts || 20;
  const [{ limit, skip }, setLimits] = useState({
    limit: limitDefault,
    skip: 0
  });
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [showNotFound, setShowNotFound] = useState(false);

  const node = useMemo(() => {
    if (typeof window !== "undefined") {
      return document.getElementById("portal") || window;
    }
  }, []);

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

  const handler = useCallback(
    debounce(() => {
      if (
        observeRef.current &&
        isScrolledIntoView(observeRef.current) &&
        oldTimeStamp.current < timeStamp
      ) {
        oldTimeStamp.current = timeStamp;
        setLimits(prevState => ({
          ...prevState,
          skip: prevState.skip + limitDefault
        }));
      }
    }, 100),
    [timeStamp]
  );

  useEffect(() => {
    setFetchedProducts(prevState => [...prevState, ...products]);
  }, [products]);

  useEffect(() => {
    if (!loading) {
      setShowLoader(false);
      return;
    }
    const loadingHandler = setTimeout(() => {
      if (loading) {
        setShowLoader(true);
      }
    }, 500);
    return () => clearTimeout(loadingHandler);
  }, [loading]);

  useEffect(() => {
    if (limitProducts) return;
    if (products.length === limitDefault) {
      node.addEventListener("scroll", handler);
      return () => node.removeEventListener("scroll", handler);
    }
  }, [fetchedProducts]);

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
