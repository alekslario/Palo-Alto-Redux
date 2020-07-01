import { useEffect, useState } from "react";
import { useStore } from "./contextStore";
import shortid from "shortid";
export const useCloseModals = (closePortal) => {
  const [store, dispatch] = useStore();
  const [id] = useState(shortid.generate());

  useEffect(() => {
    const handle = setTimeout(() => {
      if (store.activeModal !== id) closePortal();
    }, 0);
    return () => clearTimeout(handle);
  }, [store.activeModal]);

  useEffect(() => {
    dispatch({ type: "SET_ACTIVE_MODAL", id });
  }, []);
};
