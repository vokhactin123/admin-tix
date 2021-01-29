import { combineReducers } from "redux";
import userReducer from "./userReducer";
import loginReducer from "./loginReducer";
import filmReducer from "./filmReducer";
import showtimeReducer from "./showtimeReducer";
export const rootReducer = combineReducers({
  loginReducer,
  userReducer,
  filmReducer,
  showtimeReducer,
});
