import React, { useEffect, useState } from "react";
import { useStore } from "./contextStore";
const client = require("contentful").createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});

export const useFetchEntries = ({
  dependency = [],
  type,
  ...searchParameters
}) => {
  const [store] = useStore();
  const [{ entries, loading, timeStamp }, setEntries] = useState({
    entries: [],
    loading: true,
    timeStamp: 0
  });
  const inStore =
    typeof searchParameters["sys.id"] === "string" &&
    store[type]?.sys?.id === searchParameters["sys.id"];

  const fetchEntries = async () => {
    const data = await client.getEntries({
      ...searchParameters
    });
    if (data.items) return data.items;
    console.log(`Error getting contentful entries.`);
  };

  useEffect(() => {
    if (inStore) return;

    let didCancel = false;
    async function getEntries() {
      const items = await fetchEntries();
      if (!didCancel) {
        setEntries({
          entries: [...items],
          loading: false,
          timeStamp: Date.now()
        });
      }
    }
    if (!didCancel)
      setEntries(prevState => ({
        ...prevState,
        loading: true
      }));
    getEntries();
    return () => {
      didCancel = true;
    };
  }, dependency);

  return inStore ? [[store[type]], false] : [entries, loading, timeStamp];
};
