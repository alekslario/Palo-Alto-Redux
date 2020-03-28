import { useEffect, useRef, useCallback, useMemo } from "react";
import debounce from "lodash.debounce";
import isScrolledIntoView from "./isScrolledIntoView";

export const useLazyLoading = ({
  items,
  timeStamp,
  limitDefault = 20,
  setLimits,
  disable = false,
  scrollingNode
}) => {
  const observeRef = useRef(null);
  const oldTimeStamp = useRef(0);

  const node = useMemo(() => {
    if (typeof window !== "undefined") {
      return scrollingNode();
    }
  }, []);

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
    if (disable) return;
    if (items.length === limitDefault) {
      node.addEventListener("scroll", handler);
      return () => node.removeEventListener("scroll", handler);
    }
  }, [items]);

  return [observeRef];
};
