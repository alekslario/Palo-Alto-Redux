const baseUrl =
  process.env.NODE_ENV === "production"
    ? process.env.NOW_URL
    : "http://localhost:3000";

export default baseUrl;
