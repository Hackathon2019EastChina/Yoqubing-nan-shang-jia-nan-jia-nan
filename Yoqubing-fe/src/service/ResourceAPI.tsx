import request from "../utiliy/request";

const apiname = "/resource";

interface uploadBody {
  title : string,
  type: string,
  url: string,
  content : string,
}

interface removeBody {
  id: number,
}

export interface ResourceList {
  id: number,
  name: string,
  uid: number,
  updatetime: number,
  type:string,
  url: string,
  content: string,
  uname: string,
}

export function upload(body : uploadBody) {
  return request(apiname + "/upload", body);
}

export function remove(body : removeBody) {
  return request(apiname + "/remove", body);
}

export function getResourceList() : Promise<{code: number, data: {resources: ResourceList[]}}> {
  return request(apiname + "/getResourceList");
}