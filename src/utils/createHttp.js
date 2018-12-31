import axios from "axios";
import config from "../../config/env";

export default context => {
  return axios.create({
    baseURL: config.base.url,
    headers: context.headers
  });
};
