import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import $ from "./_SocialShare";

const SocialShare = ({ image, title }) => (
  <$.SocialIcons>
    <a
      target="_blank"
      href={`//www.facebook.com/sharer.php?u=${window?.location.href}`}
      title="Palo Alto Redux"
    >
      <FontAwesomeIcon icon={["fab", "facebook-square"]} />
    </a>
    <a
      target="_blank"
      href={`//twitter.com/share?text=${title}&amp;url=${window?.location.href}&amp;media=${image}`}
      title="Palo Alto"
    >
      <FontAwesomeIcon icon={["fab", "twitter"]} />
    </a>

    <a
      target="_blank"
      href={`//pinterest.com/pin/create/button/?url=${
        window?.location.href
      }&amp;media=${image}&amp;description=${encodeURIComponent(title)}`}
    >
      <FontAwesomeIcon icon={["fab", "pinterest"]} />
    </a>
  </$.SocialIcons>
);
export default SocialShare;
