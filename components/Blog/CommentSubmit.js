import { useState } from "react";
import $ from "./_CommentSubmit";
import Comments from "./Comments";
import baseUrl from "../../utils/baseUrl";
import axios from "axios";
import catchErrors from "../../utils/catchErrors";
import HoneyPot, { useHoneyRef } from "../_App/HoneyPot";
const CommentSubmit = ({ id, tags, comments }) => {
  const [{ name, email, message }, setState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [honeyRef, isBot] = useHoneyRef();
  const [extraComment, setExtraComment] = useState([]);
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    if (isBot()) return;
    e.preventDefault();
    try {
      setError("");
      const url = `${baseUrl}/api/comments`;
      const payload = { name, email, message, id, tags };
      const response = await axios.post(url, payload);
      console.log(response);
      setExtraComment((prevState) => [
        ...prevState,
        { name, email, message, time: Date.now() },
      ]);
    } catch (error) {
      catchErrors(error, setError);
    } finally {
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    let accepted = false;
    switch (name) {
      case "name":
        accepted = /^[a-zA-Z0-9_\-]{0,45}$/gi.test(value);
        break;
      case "email":
        accepted = /^[a-zA-Z0-9@\.\-_]{0,75}$/gi.test(value);
        break;
      case "message":
        accepted = /^.{0,300}$/gi.test(value);
    }
    if (accepted) setState((prevState) => ({ ...prevState, [name]: value }));
  };
  return (
    <>
      <Comments comments={comments.concat(extraComment)} />
      {error && <$.Error>{error}</$.Error>}
      <form onSubmit={handleSubmit}>
        <$.Notice>Leave a comment</$.Notice>
        <$.Wrapper>
          <$.InputWrapper>
            <$.HiddenLabel htmlFor="CommentAuthor">Name</$.HiddenLabel>
            <$.Input
              placeholder="Name"
              id="CommentAuthor"
              name="name"
              value={name}
              onChange={handleChange}
            />
            <$.HiddenLabel htmlFor="CommentEmail">Email</$.HiddenLabel>
            <$.Input
              id="CommentEmail"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleChange}
            />
          </$.InputWrapper>
          <$.HiddenLabel htmlFor="CommentBody">Message</$.HiddenLabel>
          <$.TextArea
            id="CommentBody"
            placeholder="Message"
            name="message"
            value={message}
            onChange={handleChange}
          />
          <HoneyPot ref={honeyRef} id="commentSubmit" />
        </$.Wrapper>
        <$.CommentSubmit type="submit">POST COMMENT</$.CommentSubmit>
      </form>
    </>
  );
};

export default CommentSubmit;
