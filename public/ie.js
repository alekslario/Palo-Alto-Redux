window.onload = function () {
  if (
    window.navigator.userAgent.indexOf("MSIE") > -1 ||
    !!navigator.userAgent.match(/Trident.*rv:11./)
  ) {
    document.querySelector("body").innerHTML =
      "<div style='font-size:32px;display:flex;flex-wrap:wrap;top:50%;left:50%;transform: translate(-50%, -50%);position:absolute;'>" +
      "<p>Internet Exployer is not supported. To use this website you have to update your browser... Links to modern browsers below.</p>" +
      "<div style='width:100%;height:100%;display:flex;justify-content: center;'>" +
      "<div style='margin-bottom:30px;width:50px;height:80px;background-image:url(https://upload.wikimedia.org/wikipedia/commons/d/d9/Noun_Project_down_arrow_icon_719904_cc.svg);'></div>" +
      "</div>" +
      "<div style='width:100%;height:100%;display:flex;justify-content: center;'>" +
      "<a target='_blank'href='https://www.google.com/intl/en_au/chrome/' style='box-shadow: 2px 4px 6px 0 rgba(32, 33, 36, .28);cursor:pointer;width:50px;height:50px;border-radius:50%;background-image:url(https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Chrome_icon_%28September_2014%29.svg);'></a>" +
      "<a target='_blank'href='https://www.mozilla.org/en-GB/firefox/new/' style='box-shadow: 2px 4px 6px 0 rgba(32, 33, 36, .28);margin-left:30px;cursor:pointer;width:50px;height:50px;border-radius:50%;background-image:url(https://upload.wikimedia.org/wikipedia/commons/6/67/Firefox_Logo%2C_2017.svg);'></a>" +
      "<a target='_blank'href='https://www.microsoft.com/en-us/edge' style='box-shadow: 2px 4px 6px 0 rgba(32, 33, 36, .28);margin-left:30px;cursor:pointer;width:50px;height:50px;border-radius:50%;background-image:url(https://upload.wikimedia.org/wikipedia/commons/b/b8/Microsoft_Edge_logo_%282015%E2%80%932019%29.svg);'></a>" +
      "</div>" +
      "</div>";
  }
};
