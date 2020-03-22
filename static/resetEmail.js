export default (link, resetLink) =>
  '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
  "<tr>" +
  "<td>" +
  '<div style="width:70%;margin-left:15%;font-size:16px;margin-bottom: 20px;">' +
  `<a href="${link}" target="_blank" style="cursor:pointer;color:#333;font-size:30px;text-decoration: none;">` +
  "Palo Alto Redux" +
  "</a>" +
  "<h2 style='color:#333;font-size:24px;'>Reset your password</h2>" +
  "<p style='color:#777;padding-bottom: 15px;'>Follow this link to reset your customer account password at " +
  `<a style='text-decoration: none;cursor:pointer;color:#1990c6;' href="${link}" target='_blank'>Palo Alto Redux</a>` +
  " If you didn't request a new password, you can safely delete this email.</p>" +
  "<div>" +
  `<a href="${resetLink}" style='text-decoration: none;cursor:pointer;padding:20px 25px;font-size:16px;background-color:#1990c6;color:white;border-radius:7px;border:none;'>Reset your password</a>` +
  "<span style='margin:0 5px;font-size:13px;'>or</span>" +
  `<a href="${link}" target="_blank" style="text-decoration: none;cursor:pointer;color:#1990c6;">Visit our store</a>` +
  "</div>" +
  "</div>" +
  "</td>" +
  "</tr>" +
  "</table>";
