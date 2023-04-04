import { combineReducers } from "redux";
import authReducer from "./authReducer";
import 'bootstrap/dist/css/bootstrap.css';

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
