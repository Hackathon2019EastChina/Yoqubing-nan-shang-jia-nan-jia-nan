import { InfoActionType } from "../action/InfoAction";
import { InfoList } from "../service/InfoAPI";

const initialState : {infos: InfoList[]} = {
  infos: [],
}

const InfoReducer = (state = initialState, action : Action) => {
  switch(action.type) {
    case InfoActionType.GETINFOLIST:
      return {infos: action.payload.infos};
    default:
      return state;
  }
}

export default InfoReducer;