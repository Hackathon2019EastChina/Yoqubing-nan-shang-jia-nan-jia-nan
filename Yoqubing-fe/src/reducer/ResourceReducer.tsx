import { ResourceActionType } from "../action/ResourceAction";
import { ResourceList } from "../service/ResourceAPI";

const initialState : {resources : ResourceList[]} = {
  resources: [],
}

const ResourceReducer = (state = initialState, action : Action) => {
  switch(action.type) {
    case ResourceActionType.GETRESOURCELIST:
      return {resources: action.payload.resources};
    default:
      return state;
  }
}

export default ResourceReducer;