import request from "../utils/request";

export async function createCalendar(param) {
  return request.post("/calendar/create", {
    data: param
  });
}

export async function getCalendarList() {
  return request.get("/calendars");
}

export async function signup(param) {
  return request.post("/user/signup", {
    data: param
  });
}
export async function logout() {
  return request("/api/user/logout");
}
