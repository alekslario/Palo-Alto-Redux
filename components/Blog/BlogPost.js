import Link from "next/link";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SocialShare from "../_App/SocialShare";
import $ from "./_BlogPost";
import Tags from "./Tags";
import CommentSubmit from "./CommentSubmit";
import createSrcSet from "../../utils/createContentfulSrc";
import { useFetchEntries } from "../../utils/useFetchEntries";
const BlogPost = ({ comments = {}, blogId }) => {
  console.log(" blogId", blogId);
  const [blogPost, loading] = useFetchEntries({
    content_type: "blogPost",
    "sys.id": blogId,
    typeOfQuery: "id",
    dependency: [blogId],
  });
  return (
    <$.PageWrapper>
      {blogPost.map(
        (
          {
            sys: { id },
            fields: { title, author, publishDate, image, post, tags },
          },
          index
        ) => (
          <$.BlogBlock fullPost={true} key={index}>
            <$.Title fullPost={true}>{title}</$.Title>
            <$.SmallPrint fullPost={true}>
              Posted by {author} on {new Date(publishDate).toDateString()}
            </$.SmallPrint>
            <img
              src={image.fields.file.url + "?w=180"}
              alt={image?.fields.description}
              className="lazyload blur-up"
              data-sizes="auto"
              data-parent-fit="cover"
              data-srcset={createSrcSet(image.fields.file.url)}
            />
            <$.Text>{documentToReactComponents(post)}</$.Text>
            <Tags tags={tags || []} />
            <SocialShare image={image.fields.file.url} title={title} />
            <CommentSubmit
              id={id}
              tags={tags || []}
              comments={comments[blogId] || []}
            />
          </$.BlogBlock>
        )
      )}
    </$.PageWrapper>
  );
};

export default BlogPost;
