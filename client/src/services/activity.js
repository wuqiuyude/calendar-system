import request from "../utils/request";

export async function createActivity(param) {
  return request.post("/activities", {
    data: param
  });
}

export async function getActivityList(param) {
  return request.get("/activities", {
    params: param
  });
}

export async function updateActivity(id, param) {
  return request.put(`/activity/${id}`, {
    data: param
  });
}
export async function deleteActivity(id) {
  return request.delete(`/activity/${id}`);
}

export async function getActivitiyComments(id) {
  return request.get(`/activity/${id}/comments`);
}

export async function addActivitiyComment(id, param) {
  return request.post(`/activity/${id}/comments`, {
    data: param
  });
}
export async function getActivtiyById(id) {
  return request.get(`/activity/${id}`);
}

export async function getActivtiyTaggedUsers(id) {
  return request.get(`/activity/${id}/tagged_users`);
}

export async function addActivtiyTaggedUsers(id, param) {
  return request.post(`/activity/${id}/tagged_users`, {
    data: param
  });
}

export async function acceptActivityTag(activityId, taggedUserId, param) {
  return request.put(`/activity/${activityId}/tagged_user/${taggedUserId}`, {
    data: param
  });
}
