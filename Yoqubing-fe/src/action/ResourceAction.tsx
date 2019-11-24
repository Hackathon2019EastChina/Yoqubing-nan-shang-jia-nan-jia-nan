import { ResourceList } from "../service/ResourceAPI";

export const ResourceActionType = {
  UPLOAD: "UPLOAD",
  REMOVE: "REMOVE",
  GETRESOURCELIST: "GETRESOURCELIST",
}

export const uploadResourceAction = () => (dispatch : Function) => {
  dispatch({
    type: ResourceActionType.UPLOAD,
  });
}

export const removeResourceAction = () => (dispatch : Function) => {
  dispatch({
    type: ResourceActionType.REMOVE,
  });
}

export const getResourceListAction = (payload : {resources: ResourceList[]}) => (dispatch : Function) => {
  dispatch({
    type: ResourceActionType.GETRESOURCELIST,
    payload: payload,
  });
}