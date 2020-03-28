import baseUrl from "./baseUrl";
import axios from "axios";
import catchErrors from "./catchErrors";
export default async ({
  data = {},
  route,
  setStatus = () => {},
  auth,
  method = "GET"
}) => {
  try {
    setStatus("");
    const url = `${baseUrl}/api/${route}`;
    const payload = {
      ...data,
      ...(auth ? { headers: { Authorization: auth } } : {})
    };
    let response;
    switch (method) {
      case "GET":
        response = await axios.get(url, payload);
        break;
      case "PUT":
        response = await axios.put(url, payload);
        break;
      case "DELETE":
        response = await axios.delete(url, payload);
        break;
    }

    setStatus({ text: response.data, status: response.status });
    return response;
  } catch (status) {
    catchErrors(status, setStatus);
  }
};
