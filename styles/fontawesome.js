import { config, library } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import {
  faTwitter,
  faFacebookSquare,
  faInstagram,
  faPinterest,
} from "@fortawesome/free-brands-svg-icons";
import { faPlayCircle, faComment } from "@fortawesome/free-regular-svg-icons";
import { faBars, faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
library.add(
  faTwitter,
  faFacebookSquare,
  faInstagram,
  faPinterest,
  faPlayCircle,
  faBars,
  faCheck,
  faComment,
  faPlus
);
