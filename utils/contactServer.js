import baseUrl from "./baseUrl";
import axios from "axios";
import catchErrors from "./catchErrors";
export default async ({
  data = {},
  route,
  setStatus = () => {},
  auth,
  method = "POST",
  req = null,
}) => {
  try {
    setStatus("");
    const url = `${baseUrl(req)}/api/${route}`;
    console.log("after getting base url", url);
    const authentication = { headers: { Authorization: auth } };
    let response;
    switch (method) {
      case "GET":
        response = await axios.get(url, {
          ...(auth ? authentication : {}),
          params: {
            ...data,
          },
        });
        break;
      case "POST":
        response = await (auth
          ? axios.post(url, data, authentication)
          : axios.post(url, data));
        break;
      case "DELETE":
        response = await axios.delete(url, {
          ...(auth ? authentication : {}),
          data,
        });
        break;
      default:
        throw `${method} method is not supported`;
    }
    console.log("inside CS res", response);
    setStatus({
      text: response?.data?.message,
      status: response?.data?.status,
    });
    return response;
  } catch (error) {
    console.log("inside CS res errr", error);
    catchErrors(error, setStatus);
    return error.response;
  }
};
