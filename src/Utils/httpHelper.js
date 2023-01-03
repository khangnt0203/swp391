import axios from "axios";
import { getToken, getUser } from "./Auth";
const url = "https://nhattpm98-webapp.azurewebsites.net";

export function get(endpoint, body) {
  return axios.get(url + endpoint, body, {
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
  });
}

export function post(endpoint, body) {
  const token = getToken("token");
  const user = getUser("user");
  return axios.post(url + endpoint, body, {
    headers: {
      Authorization : `Bearer ${token}`,
      "X-User": `${user}`,
      Accept: "application/json",
      "content-type": "application/json",
    },
  });
}

export function put(endpoint, body) {
  const token = getToken("token");
  const user = getUser("user");
  return axios.put(url + endpoint, body, {
    headers: {
      Authorization : `Bearer ${token}`,
      "X-User": `${user}`,
      Accept: "application/json",
      "content-type": "application/json",
    },
  });
}

export function getAuth(endpoint) {
  const token = getToken("token");
  const user = getUser("user");
  return axios.get(url + endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-User": `${user}`,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

export function getJobCate(endpoint) {
  const token = getToken("token");
  const user = getUser("user");
  return axios.get(url + endpoint, {
    headers: {
      "X-User": `${user}`,
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

export function postAuth(endpoint, body) {
  const token = getToken("token");
  const user = getUser("user");
  return axios.post(url + endpoint, body, {
    "Access-Control-Allow-Origin": "*",
    headers: {
      Authorization: `Bearer ${token}`,
      "X-User": `${user}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

export function delAuth(endpoint) {
  const token = getToken("token");
  const user = getUser("user");
  return axios.delete(url + endpoint, {
    "Access-Control-Allow-Origin": "*",
    headers: {
      Authorization: `Bearer ${token}`,
      "X-User": `${user}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

export function delRequest(endpoint, body) {
  const token = getToken("token");
  const user = getUser("user");
  return axios.delete(url + endpoint, body, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-User": `${user}`,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

export function putAuth(endpoint, body) {
  const token = getToken("token");
  const user = getUser("user");
  return axios.put(url + endpoint, body, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-User": `${user}`,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

export function postJob(endpoint, body) {
  const token = getToken("token");
  const user = getUser("user");
  return axios.post(url + endpoint, body, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-User" : `${user}`,
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
  });
}

export function editJob(endpoint, body) {
  const token = getToken("token");
  const user = getUser("user");
  return axios.put(url + endpoint, body, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-User" : `${user}`,
      "Accept" : "application/json",
      "Content-Type" : "application/json; charset=utf-8",
    },
  });
}

export function deleteJob(endpoint) {
  const token = getToken("token");
  const user = getUser("user");
  return axios.delete(url + endpoint, {
    headers: {
      Authorization : `Bearer ${token}`,
      "X-User" : `${user}`,
      "Accept" : "application/json",
      "Content-Type" : "application/json",
      
    }
  });
}

export function getJob(endpoint) {
  const token = getToken("token");
  const user = getUser("user");
  return axios.get(url + endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-User": `${user}`,
      Accept: "application/json",
      "Content-type:": "application/json",
    },
  });
}

export function postInviteToFreelance(endpoint, body) {
  const token = getToken("token");
  const user = getUser("user");
  return axios.post(url + endpoint, body, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-User" : `${user}`,
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
  });
}

export function getSkillofFreelancer(endpoint, freelanceID) {
  const token = getToken("token");
  return axios.get(url + endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-User" : `${freelanceID}`,
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
  });
}
// export function postAuth(endpoint, body) {
//   const token = getToken("token");
//   return axios.post(url + endpoint, body, {
//     "Access-Control-Allow-Origin": "*",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json; charset=utf-8",
//     },
//   });
// }

// export function postForm(endpoint, body) {
//   const token = getToken("token");
//   return axios.post(url + endpoint, body, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "multipart/form-data,",
//     },
//   });
// }

// export function putForm(endpoint, body) {
//   const token = getToken("token");
//   return axios.put(url + endpoint, body, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "multipart/form-data,",
//     },
//   });
// }
