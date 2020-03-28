import React, { useEffect, useState } from "react";

export const useDelayedLoader = loading => {
  const [showLoader, setShowLoader] = useState(false);
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
  return [showLoader];
};
