import request from "../utiliy/request";

const apiname = "/order";

interface publishBody {
  title : string,
  deadline: number,
  lasting: number,
  gift: number,
  type: string,
  money: string,
  content: string,
}

interface idBody {
  id: number,
}

export interface FullOrder {
  id: number,
  title: string,
  name: string,
  phone: string,
  score: number,
  name2: string,
  phone2: string,
  score2: number,
  deadline: number,
  lasting: number,
  gift: number,
  type: string,
  money: number,
  createtime: number,
  content: string,
  status: number,
  accepttime: number,
  finishtime: number,
}

export interface BriefOrder {
  id: number,
  title: string,
  name: string,
  phone: string,
  score: number,
  deadline: number,
  lasting: number,
  gift: number,
  type: string,
  money: number,
  createtime: number,
  content: string,
}

export function publishOrder(body : publishBody) {
  return request(apiname + "/publish", body);
}

export function cancelOrder(body : idBody) {
  return request(apiname + "/cancel", body);
}

export function finishOrder(body : idBody) {
  return request(apiname + "/finish", body);
}

export function acceptOrder(body : idBody) {
  return request(apiname + "/accept", body);
}

export function getOrderById(body : idBody) : Promise<{code: number, data: FullOrder}> {
  return request(apiname + "/getOrderById", body);
}

export function getMyOrderList() : Promise<{code: number, data: {orders: FullOrder[]}}> {
  return request(apiname + "/getMyOrderList");
}

export function getOrderList() : Promise<{code: number, data: {orders: BriefOrder[]}}> {
  return request(apiname + "/getOrderList");
}