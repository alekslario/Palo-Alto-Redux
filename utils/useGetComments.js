import { useEffect, useState } from "react";
import baseUrl from "./baseUrl";
import axios from "axios";

function notEmpty(obj) {
  for (const x in obj) {
    return true;
  }
  return false;
}

export const useGetComments = ({
  id = null,
  tag = "",
  preFetchedComments = {},
} = {}) => {
  const [comments, setComments] = useState(preFetchedComments);
  useEffect(() => {
    if (notEmpty(preFetchedComments)) return;
    async function getComments() {
      const url = `${baseUrl()}/api/comments`;
      const payload = {
        params: { ...(id ? { id } : tag ? { tag } : {}) },
      };
      const response = await axios.get(url, payload);
      setComments(
        response?.data?.posts?.reduce((acc, { postId, comments } = {}) => {
          acc[postId] = comments;
          return acc;
        }, {}) || {}
      );
    }
    getComments();
  }, []);
  return [comments];
};
