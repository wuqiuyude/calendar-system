import request from "../utils/request";

export async function login(param) {
  return request.post("/user/login", {
    data: param
  });
}

export async function signup(param) {
  return request.post("/user/signup", {
    data: param
  });
}
export async function logout() {
  return request("/api/user/logout");
}
