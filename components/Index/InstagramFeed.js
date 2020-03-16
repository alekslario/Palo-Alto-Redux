import React from "react";
import $ from "./_InstagramFeed";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InstagramFeed = ({ instagram: { data } }) => {
  return (
    <>
      <$.Grid>
        {data.map(({ images, caption: { text }, link }, index) => (
          <$.Img
            className="lazyload blur-up"
            data-sizes="auto"
            alt=""
            key={index}
            href={link}
            style={{
              backgroundImage: `${images.thumbnail}`
            }}
            data-bgset={images.standard_resolution.url}
          >
            <div>
              <p>
                <FontAwesomeIcon icon={["fab", "instagram"]} />
                <br />
                {text && text.length > 78 ? `${text.substr(0, 78)} ...` : text}
              </p>
            </div>
          </$.Img>
        ))}
      </$.Grid>
    </>
  );
};

export default InstagramFeed;
