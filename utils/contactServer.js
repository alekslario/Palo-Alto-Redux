import baseUrl from "./baseUrl";
import axios from "axios";
import catchErrors from "./catchErrors";
export default async ({
  data = {},
  route,
  setStatus = () => {},
  auth,
  method = "PUT"
}) => {
  try {
    setStatus("");
    const url = `${baseUrl}/api/${route}`;
    const authentication = { headers: { Authorization: auth } };
    const payload = {
      ...data,
      ...authentication
    };
    let response;
    switch (method) {
      case "GET":
        response = await axios.get(url, payload);
        break;
      case "PUT":
        response = await axios.put(url, data, authentication);
        break;
      case "DELETE":
        response = await axios.delete(url, payload);
        break;
    }

    setStatus({ text: response.data, status: response.status });
    return response;
  } catch (error) {
    catchErrors(error, setStatus);
    return error;
  }
};
