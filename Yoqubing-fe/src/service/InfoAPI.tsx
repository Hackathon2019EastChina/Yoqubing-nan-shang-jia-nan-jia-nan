import request from "../utiliy/request";

const apiname = "/info";

interface publishBody {
  title : string,
  content : string,
}

interface cancelInfoBody {
  id: number,
}

export interface InfoList {
  id: number,
  title: string,
  name: string,
  content: string,
  createtime: number,
  uid: number,
}

export function publishInfo(body : publishBody) {
  return request(apiname + "/publish", body);
}

export function getInfoList() : Promise<{code: number, data: {infos: InfoList[]} }> {
  return request(apiname + "/getInfoList");
}

export function cancelInfo(body : cancelInfoBody) {
  return request(apiname + "/cancelInfo", body);
}