import {
  LOADING,
  GET_ALL_USERS,
  GET_WEEKLY_ALL_USERS,
  GET_WEEKLY_ALL_USERS_UNREGISTER,
  GET_USERS_MSG,
  WEEKLY_FAMILY_MEMBER,
  WEEKLY_JOURNAL,
  ALL_COUNT,
  ALL_COUNT_LOADING,
} from "../../Constants/constants";

const initialState = {
  isLoading: false,
  usersData: [],
  GraphData: [],
  FamilyMembers: [],
  WeeklyJournal: [],
  UnRegisterGraph: [],
  filtredusers: [],
  allCount: [],
  countLoading: false,
  message: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, isLoading: action.payload };

    case GET_ALL_USERS:
      return { ...state, usersData: action.payload };

    case GET_USERS_MSG:
      return { ...state, message: action.payload };

    case GET_WEEKLY_ALL_USERS:
      return { ...state, GraphData: action.payload };

    case GET_WEEKLY_ALL_USERS_UNREGISTER:
      return { ...state, UnRegisterGraph: action.payload };

    case WEEKLY_FAMILY_MEMBER:
      return { ...state, FamilyMembers: action.payload };

    case WEEKLY_JOURNAL:
      return { ...state, WeeklyJournal: action.payload };

    case ALL_COUNT:
      return { ...state, allCount: action.payload };

    case ALL_COUNT_LOADING:
      return { ...state, countLoading: action.payload };

    default:
      return state;
  }
};

export default usersReducer;
