import { InfoList } from "../service/InfoAPI";

export const InfoActionType = {
  PUBLISH: "PUBLISH",
  CANCELINFO: "CANCELINFO",
  GETINFOLIST: "GETINFOLIST",
}

export const publishInfoAction = () => (dispatch : Function) => {
  dispatch({
    type: InfoActionType.PUBLISH,
  });
}

export const cancelInfoAction = () => (dispatch : Function) => {
  dispatch({
    type: InfoActionType.CANCELINFO,
  });
}

export const getInfoListAction = (payload : {infos: InfoList[]}) => (dispatch : Function) => {
  dispatch({
    type: InfoActionType.GETINFOLIST,
    payload: payload,
  });
}