import React, { useEffect, useState, useMemo } from "react";
import { useStore } from "./contextStore";
const client = require("contentful").createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export const useFetchEntries = ({ dependency = [], ...searchParameters }) => {
  const [store, dispatch] = useStore();
  const [{ entries, loading, timeStamp }, setEntries] = useState({
    entries: [],
    loading: true,
    timeStamp: 0,
  });

  const idQuery = useMemo(
    () =>
      (typeof searchParameters["sys.id"] === "string" &&
        searchParameters["sys.id"]) ||
      (typeof searchParameters["sys.id[in]"] === "string" &&
        searchParameters["sys.id[in]"])
  );

  const { inStore, toQuery } = useMemo(() => {
    const defaultState = { inStore: [], toQuery: [] };
    if (!idQuery) return defaultState;
    const result = (
      searchParameters["sys.id"] || searchParameters["sys.id[in]"]
    )
      .split(",")
      .filter((ele) => ele)
      .reduce((acc, id) => {
        if (store.cache[id]) {
          acc.inStore.push(store.cache[id]);
        } else {
          acc.toQuery.push(id);
        }
        return acc;
      }, defaultState);
    return result;
  }, [dependency]);

  const fetchEntries = async () => {
    const data = await client.getEntries({
      ...searchParameters,
      ...(idQuery
        ? {
            [`sys.id${
              searchParameters["sys.id[in]"] ? "[in]" : ""
            }`]: toQuery.join(),
          }
        : {}),
    });
    if (data.items) return data.items;
    console.log(`Error getting contentful entries.`);
  };

  useEffect(() => {
    if (idQuery && toQuery.length === 0) return;

    let didCancel = false;
    async function getEntries() {
      const items = await fetchEntries();
      if (!didCancel) {
        setEntries({
          entries: [...items, ...inStore],
          loading: false,
          timeStamp: Date.now(),
        });
        dispatch({ type: "ADD_TO_CACHE", items });
      }
    }
    if (!didCancel)
      setEntries((prevState) => ({
        ...prevState,
        loading: true,
      }));
    getEntries();
    return () => {
      didCancel = true;
    };
  }, [...dependency]);

  return idQuery && toQuery.length === 0
    ? [inStore, false]
    : [entries, loading, timeStamp];
};
