import {
  LOADING,
  GET_ALL_PARENTCATEGORIES,
  GET_SUB_CATEGORIES,
  GET_ALL_STORIES,
  PAGE_COUNT,
} from "../../Constants/constants";

const initialState = {
  isLoading: false,
  storiesData: [],
  parentCategoriesData: [],
  subCategoriesData: [],
  pageCount: 1,
};

const storiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, isLoading: action.payload };

    case GET_ALL_STORIES:
      return { ...state, storiesData: action.payload };

    case GET_ALL_PARENTCATEGORIES:
      return { ...state, parentCategoriesData: action.payload };

    case GET_SUB_CATEGORIES:
      return { ...state, subCategoriesData: action.payload };

    case PAGE_COUNT:
      return { ...state, pageCount: action.payload };

    default:
      return state;
  }
};

export default storiesReducer;
