import { useEffect, useState } from "react";
export const useMediaQuery = pixels => {
  const [mobile, setMobile] = useState(
    typeof window !== "undefined" &&
      window.matchMedia(`(max-width: ${pixels}px)`).matches
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(`(max-width: ${pixels}px)`);
    const handleResize = e => setMobile(e.matches ? true : false);
    mql.addListener(handleResize);
    return () => mql.removeListener(handleResize);
  }, []);
  return [mobile];
};
