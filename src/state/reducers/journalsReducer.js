import {
  GET_JOURNALS,
  JOURNALS_LOADING,
  PAGE_COUNT,
  GET_FAMILTY_MEMBERS,
} from "../../Constants/constants";

const initialState = {
  isLoading: false,
  journalsData: [],
  pageCount: 1,
  familyData: [],
};

const journalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case JOURNALS_LOADING:
      return { ...state, isLoading: action.payload };

    case GET_JOURNALS:
      return { ...state, journalsData: action.payload };

    case PAGE_COUNT:
      return { ...state, pageCount: action.payload };

    case GET_FAMILTY_MEMBERS:
      return { ...state, familyData: action.payload };

    default:
      return state;
  }
};

export default journalsReducer;
