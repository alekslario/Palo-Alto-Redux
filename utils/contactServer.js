import baseUrl from "./baseUrl";
import axios from "axios";
import catchErrors from "./catchErrors";
export default async ({
  data = {},
  route,
  setStatus = () => {},
  auth,
  method = "POST",
}) => {
  try {
    setStatus("");
    const url = `${baseUrl}/api/${route}`;
    const authentication = { headers: { Authorization: auth } };
    let response;
    switch (method) {
      case "GET":
        response = await axios.get(url, {
          ...authentication,
          params: {
            ...data,
          },
        });
        break;
      case "POST":
        response = await axios.post(url, data, authentication);
        break;
      case "DELETE":
        response = await axios.delete(url, {
          ...authentication,
          data,
        });
        break;
      default:
        throw `${method} method is not supported`;
    }

    setStatus({
      text: response?.data?.message,
      status: response?.data?.status,
    });
    return response;
  } catch (error) {
    catchErrors(error, setStatus);
    return error.response;
  }
};
