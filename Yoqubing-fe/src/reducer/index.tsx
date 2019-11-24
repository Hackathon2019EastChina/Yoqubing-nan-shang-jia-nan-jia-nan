import { combineReducers } from "redux";
import UserReducer from "./UserReducer";
import InfoReducer from "./InfoReducer";
import OrderReducer from "./OrderReducer";
import ResourceReducer from "./ResourceReducer";

const rootReducer = combineReducers({
  UserReducer: UserReducer,
  InfoReducer: InfoReducer,
  OrderReducer: OrderReducer,
  ResourceReducer: ResourceReducer,
});

export default rootReducer;