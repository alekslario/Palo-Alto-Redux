import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import $ from "./_Blog";
import { useFetchEntries } from "../../utils/useFetchEntries";
import Tags from "./Tags";
import createSrcSet from "../../utils/createContentfulSrc";

const Blog = ({ filter = "", comments = {} }) => {
  const { route } = useRouter();
  const [posts, loading] = useFetchEntries({
    limit: 10,
    content_type: "blogPost",
    order: "sys.createdAt",
    "fields.tags": filter,
  });

  return (
    <$.PageWrapper>
      <Link href="/blog/news">
        <a>
          <$.BlogTitle>News</$.BlogTitle>
        </a>
      </Link>
      <$.Links>
        {route === "/blog/news/tagged/longboards" ? (
          <span>longboards</span>
        ) : (
          <Link href="/blog/news/tagged/longboards">
            <a>longboards</a>
          </Link>
        )}
        {route === "/blog/news/tagged/new-arrivals" ? (
          <span>new arrivals</span>
        ) : (
          <Link href="/blog/news/tagged/new-arrivals">
            <a>new arrivals</a>
          </Link>
        )}
        {route === "/blog/news/tagged/skateboards" ? (
          <span>skateboards</span>
        ) : (
          <Link href="/blog/news/tagged/skateboards">
            <a>skateboards</a>
          </Link>
        )}
      </$.Links>

      {posts.map((blogPost, index) => {
        const {
          sys: { id },
          fields: { title, author, publishDate, image, post, tags },
        } = blogPost;
        return (
          <$.BlogBlock key={index}>
            <Link href={"/blog/news/[id]"} as={`/blog/news/${id}`}>
              <a>
                <img
                  src={image.fields.file.url + "?w=180"}
                  alt={image.fields.description}
                  className="lazyload blur-up"
                  data-sizes="auto"
                  data-parent-fit="cover"
                  data-srcset={createSrcSet(image.fields.file.url)}
                />
              </a>
            </Link>

            <Link href={"/blog/news/[id]"} as={`/blog/news/${id}`}>
              <a>
                <$.Title>{title}</$.Title>
              </a>
            </Link>

            <$.SmallPrint>
              Posted by {author} on {new Date(publishDate).toDateString()}
            </$.SmallPrint>
            <Link href={"/blog/news/[id]"} as={`/blog/news/${id}`}>
              <a>
                <$.Text>
                  {post.content
                    .map(({ content }) => content.map(({ value }) => value))
                    .join("")
                    .slice(0, 280) + "..."}
                </$.Text>
              </a>
            </Link>
            <$.PostFooter>
              {!!comments[id]?.length && (
                <$.CommentPreview>
                  <FontAwesomeIcon icon={["far", "comment"]} />{" "}
                  {comments[id].length}&nbsp;
                  {comments[id].length > 1 ? "comments" : "comment"}
                </$.CommentPreview>
              )}
              <Tags tags={tags || []} />
            </$.PostFooter>
          </$.BlogBlock>
        );
      })}
    </$.PageWrapper>
  );
};

export default Blog;
