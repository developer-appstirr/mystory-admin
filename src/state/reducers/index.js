import { combineReducers } from "redux";
import authReducer from "./authReducer";
import storiesReducer from "./storiesReducer";
import usersReducer from "./usersReducer";
import journalsReducer from "./journalsReducer";
import notificationsReducer from "./notificationsReducer";

const reducers = combineReducers({
  allAuth: authReducer,
  allSories: storiesReducer,
  allUsers: usersReducer,
  allJournals: journalsReducer,
  allnotifications: notificationsReducer,
});

export default reducers;
