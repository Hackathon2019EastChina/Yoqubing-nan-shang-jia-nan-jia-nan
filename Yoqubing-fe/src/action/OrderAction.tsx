import { FullOrder, BriefOrder } from "../service/OrderAPI";

export const OrderActionType = {
  PUBLISH: "PUBLISH",
  CANCEL: "CANCEL",
  FINISH: "FINISH",
  GETMYORDERLIST: "GETMYORDERLIST",
  GETORDERLIST: "GETORDERLIST",
  GETORDERBYID: "GETORDERBYID",
}

export const publishOrderAction = () => (dispatch : Function) => {
  dispatch({
    type: OrderActionType.PUBLISH,
  });
}

export const cancelOrderAction = () => (dispatch : Function) => {
  dispatch({
    type: OrderActionType.CANCEL,
  });
}

export const finishOrderAction = () => (dispatch : Function) => {
  dispatch({
    type: OrderActionType.FINISH,
  });
}

export const getMyOrderListAction = (payload : {orders: FullOrder[]}) => (dispatch : Function) => {
  dispatch({
    type: OrderActionType.GETMYORDERLIST,
    payload: payload,
  });
}

export const getOrderListAction = (payload : {orders: BriefOrder[]}) => (dispatch : Function) => {
  dispatch({
    type: OrderActionType.GETORDERLIST,
    payload: payload,
  });
}

export const getOrderByIdAction = (payload : FullOrder) => (dispatch : Function) => {
  dispatch({
    type: OrderActionType.GETORDERBYID,
    payload: payload,
  });
}