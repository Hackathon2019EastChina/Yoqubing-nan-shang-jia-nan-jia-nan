import { UserActionType } from "../action/UserAction";

const initialState = {
  session: {
    token: "",
    id: 0,
    name: "",
  },
  information: {},
}

const SessionReducer = (state = initialState, action : Action) => {
  switch(action.type) {
    case UserActionType.LOGIN:
      return {...initialState, session: action.payload};
    case UserActionType.LOGOUT:
      return initialState;
    case UserActionType.ME:
      return {...state, information: action.payload};
    default:
      return state;
  }
}

export default SessionReducer;