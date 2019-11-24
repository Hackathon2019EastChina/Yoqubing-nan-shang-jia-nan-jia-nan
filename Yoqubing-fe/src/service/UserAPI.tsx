import request from "../utiliy/request";

const apiname = "/account";

interface loginBody {
  username : string,
  password : string,
}

interface registerBody {
  username : string,
  password : string,
  name: string,
  phone: string,
  grade: number,
  major: string,
}

interface passwordBody {
  newpassword: string,
  oldpassword: string,
}

interface updateBody {
  name: string,
  phone: string,
  grade: string,
  major: string,
}

export function login(body : loginBody) {
  return request(apiname + "/login", body);
}

export function register(body : registerBody) {
  return request(apiname + "/register", body);
}

export function me() {
  return request(apiname + "/me");
}

export function password(body : passwordBody) {
  return request(apiname + "/password", body);
}

export function update(body : updateBody) {
  return request(apiname + "/update", body);
}

export function logout() {
  return request(apiname + "/logout");
}