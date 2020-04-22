import baseUrl from "./baseUrl";
import axios from "axios";
export default ({ id = false, tag = "" } = {}) => {
  return async ({ query: { _id } }) => {
    const url = `${baseUrl}/api/comments`;
    const payload = { params: { ...(id ? { _id } : tag ? { tag } : {}) } };
    const response = await axios.get(url, payload);
    return {
      comments: response.data.comments.reduce((acc, { postId, comments }) => {
        acc[postId] = comments;
        return acc;
      }, {}),
    };
  };
};
