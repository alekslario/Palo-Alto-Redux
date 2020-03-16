import $ from "./_BlogPost";
import Link from "next/link";
const Tags = ({ tags }) => (
  <$.Tags>
    {tags.length > 0 && "Tags: "}
    {tags.map((tag, index) => (
      <span key={index}>
        <Link href={`/blog/news/tagged/${tag.replace(" ", "-")}`}>
          <a>{tag}</a>
        </Link>
        {tags.length - 1 === index ? "" : ", "}
      </span>
    ))}
  </$.Tags>
);

export default Tags;
