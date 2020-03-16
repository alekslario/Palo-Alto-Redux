import React, { useEffect, useState } from "react";
import { useStore } from "./contextStore";

export const useIsOnline = () => {
  const [store] = useStore();
  useEffect(() => {
    if (typeof navigator !== "undefined")
      console.log("Navigator is", navigator.onLine);
  }, []);
  return [];
};
