import { OrderActionType } from "../action/OrderAction";
import { FullOrder, BriefOrder } from "../service/OrderAPI";

const initialState : {my: FullOrder[], other: BriefOrder[], current: FullOrder[]} = {
  my: [],
  other: [],
  current: [],
}

const OrderReducer = (state = initialState, action : Action) => {
  switch(action.type) {
    case OrderActionType.GETMYORDERLIST:
      return {...state, my: action.payload.orders};
    case OrderActionType.GETORDERLIST:
      return {...state, other: action.payload.orders};
    case OrderActionType.GETORDERBYID:
      return {...state, current: [action.payload]};
    default:
      return state;
  }
}

export default OrderReducer;