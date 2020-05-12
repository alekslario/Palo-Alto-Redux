import lazySizes from "lazysizes";
import "lazysizes/plugins/attrchange/ls.attrchange";
import "lazysizes/plugins/parent-fit/ls.parent-fit";
if (
  typeof window !== "undefined" &&
  !("object-fit" in document.createElement("a").style)
) {
  require("lazysizes/plugins/object-fit/ls.object-fit");
}
if (typeof window !== "undefined") {
  require("lazysizes/plugins/bgset/ls.bgset");
}
if (
  typeof window !== "undefined" &&
  (!window.HTMLPictureElement ||
    !("sizes" in document.createElement("img")) ||
    window.navigator.userAgent.indexOf("Edge/") > -1)
) {
  require("lazysizes/plugins/respimg/ls.respimg");
}
