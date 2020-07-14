import React, { useEffect, useState, useMemo, useRef } from "react";
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

  const cacheName =
    searchParameters["fields.tags[in]"] ||
    searchParameters["fields.name[match]"]
      ? null
      : searchParameters.content_type +
        searchParameters["fields.type"] +
        searchParameters.skip +
        searchParameters.limit;

  const { inStore, toQuery, makeQuery, idQuery } = useMemo(() => {
    const idQuery =
      typeof searchParameters["sys.id"] === "string" ||
      typeof searchParameters["sys.id[in]"] === "string";

    const defaultState = { inStore: [], toQuery: [], makeQuery: true, idQuery };

    if (cacheName && store.cache[cacheName]) {
      return {
        ...defaultState,
        makeQuery: false,
        inStore: store.cache[cacheName],
      };
    }
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

    return result.toQuery.length === 0
      ? { ...result, makeQuery: false }
      : result;
  }, [...dependency]);

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
    if (!makeQuery) return;
    let didCancel = false;
    async function getEntries() {
      const items = await fetchEntries();
      if (!didCancel) {
        setEntries({
          entries: [...items, ...inStore],
          loading: false,
          timeStamp: Date.now(),
        });
        dispatch({
          type: "ADD_TO_CACHE",
          items,
          ...(cacheName ? { cacheName } : {}),
        });
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
  return makeQuery ? [entries, loading, timeStamp] : [inStore, false, 0];
};
