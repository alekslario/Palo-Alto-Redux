import absoluteUrl from "next-absolute-url";

const baseUrl = (req = null) => {
  const base =
    process.env.NODE_ENV === "production"
      ? absoluteUrl(req).origin
      : "http://localhost:3000";
  console.log("base", base);
  return base;
};

export default baseUrl;
