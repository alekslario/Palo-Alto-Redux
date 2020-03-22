import baseUrl from "../utils/baseUrl";
import axios from "axios";
import catchErrors from "../utils/catchErrors";
export default async (data, route, setStatus) => {
  try {
    setStatus("");
    const url = `${baseUrl}/api/${route}`;
    const payload = { ...data };
    const response = await axios.post(url, payload);
    setStatus({ text: response.data, status: response.status });
    return response;
  } catch (status) {
    catchErrors(status, setStatus);
  }
};
