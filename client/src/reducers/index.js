import { combineReducers } from "redux";

import authReducer from "./auth.js";
import currentUserreducer from "./currentUser.js";
import questionReducer from "./questions.js";
import usersReducer from "./Users.js";

export default combineReducers({
    authReducer,currentUserreducer,questionReducer,usersReducer
})