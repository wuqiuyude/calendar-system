import { extend } from "umi-request";
import { message } from "antd";

message.config({
  maxCount: 1
});

/**
 * hanler error
 */
const errorHandler = error => {
  const { response } = error;
  if (response && response.status) {
    const errorText = response.statusText;
    const { status } = response;
    if (status === 200) {
      message.error((typeof error.data.data === "string" && error.data.data) || error.data.msg);
    } else {
      message.error(errorText);
    }
  } else {
    message.error("server error");
  }
  throw error;
};

/**
 * setting request default params
 */
const request = extend({
  errorHandler, // default error handler
  prefix: "/api",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "*/*",
    "access-token": window.localStorage.getItem("token") || ""
  },
  credentials: "include", // cookie
  requestType: "form"
});

request.interceptors.response.use(async (response, options) => {
  let data = {};
  if (response.status === 200) {
    data = await response.clone().json();
    if (data.code === 200) {
      if (options.method !== "GET") {
        message.success((data.data === "string" && data.data) || data.msg);
      }
      return response;
    }
    if (data.code === 401) {
      window.location.href = "/user/login";
    }
  }
  /* eslint-disable */

  return Promise.reject({ response, data });
});
export default request;
