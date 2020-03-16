import $ from "./_Comments";
const Comments = ({ comments = [] }) => {
  return (
    <$.Wrapper>
      <hr />
      {comments.length > 0 && (
        <p>
          {comments.length}&nbsp;{comments.length > 1 ? "comments" : "comment"}
        </p>
      )}
      {comments.map(({ name, message, time }, index) => (
        <div key={index}>
          <small>
            {name}&nbsp;on&nbsp;{new Date(time).toDateString()}
          </small>
          <p>{message}</p>
        </div>
      ))}
    </$.Wrapper>
  );
};

export default Comments;
