import { getApi, postApi, deleteApi, deleteApiWithData } from "../../api";
import {
  GET_ALL_STORIES,
  LOADING,
  GET_ALL_PARENTCATEGORIES,
  GET_SUB_CATEGORIES,
} from "../../Constants/constants";
import ls from "localstorage-slim";

export const GET_STORIES = (objdata, objsortby, pagecount) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADING,
        payload: true,
      });
      const currentToken = ls.get("user", { decrypt: true });
      const token = currentToken?.access_token;
      let { data } = await getApi(
        `${process.env.REACT_APP_API_KEY}${process.env.REACT_APP_API_KEY_ADMIN}/stories?page=${pagecount}&count=10&categoryid=${objdata}&sortby=${objsortby}`,
        token
      );
      if (data.isSuccess) {
        dispatch({
          type: LOADING,
          payload: false,
        });
        dispatch({
          type: GET_ALL_STORIES,
          payload: data,
        });
        return Promise.resolve({ data: data });
      } else {
        dispatch({
          type: LOADING,
          payload: false,
        });
        return Promise.resolve({ status: false });
      }
    } catch ({ message }) {
      dispatch({
        type: LOADING,
        payload: false,
      });

      return Promise.reject({ status: false, message });
    }
  };
};

export const GET_PARENT_CATEGORY = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADING,
        payload: true,
      });
      const currentToken = ls.get("user", { decrypt: true });
      const token = currentToken?.access_token;
      let { data } = await getApi(
        `${process.env.REACT_APP_API_KEY}${process.env.REACT_APP_API_KEY_ADMIN}/category/parent`,
        token
      );
      if (data.isSuccess) {
        dispatch({
          type: LOADING,
          payload: false,
        });
        dispatch({
          type: GET_ALL_PARENTCATEGORIES,
          payload: data,
        });
        return Promise.resolve({ data: data });
      } else {
        dispatch({
          type: LOADING,
          payload: false,
        });
        return Promise.resolve({ status: false });
      }
    } catch ({ message }) {
      dispatch({
        type: LOADING,
        payload: false,
      });

      return Promise.reject({ status: false, message });
    }
  };
};

export const GET_SUB_CATEGORY = (objdata) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADING,
        payload: true,
      });
      const currentToken = ls.get("user", { decrypt: true });
      const token = currentToken?.access_token;
      let { data } = await getApi(
        `${process.env.REACT_APP_API_KEY}${process.env.REACT_APP_API_KEY_ADMIN}/category/subcategory?parentCategory=${objdata}`,
        token
      );
      if (data.isSuccess) {
        dispatch({
          type: LOADING,
          payload: false,
        });
        dispatch({
          type: GET_SUB_CATEGORIES,
          payload: data,
        });
        return Promise.resolve({ data: data });
      } else {
        dispatch({
          type: LOADING,
          payload: false,
        });
        return Promise.resolve({ status: false });
      }
    } catch ({ message }) {
      dispatch({
        type: LOADING,
        payload: false,
      });

      return Promise.reject({ status: false, message });
    }
  };
};

export const GET_STORIES_BY_DATE = (date, subCatagory) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADING,
        payload: true,
      });
      const currentToken = ls.get("user", { decrypt: true });
      const token = currentToken?.access_token;
      let { data } = await getApi(
        `${process.env.REACT_APP_API_KEY}${process.env.REACT_APP_API_KEY_ADMIN}/DailyStories?date=${date}&subCatagory=${subCatagory}&count=100000000&page=1`,
        token
      );
      if (data.isSuccess) {
        dispatch({
          type: LOADING,
          payload: false,
        });
        dispatch({
          type: GET_ALL_STORIES,
          payload: data,
        });
        return Promise.resolve({ data: data });
      } else {
        dispatch({
          type: LOADING,
          payload: false,
        });
        return Promise.resolve({ status: false });
      }
    } catch ({ message }) {
      dispatch({
        type: LOADING,
        payload: false,
      });

      return Promise.reject({ status: false, message });
    }
  };
};

export const DELETE_POST = async (objdata) => {
  try {
    const currentToken = ls.get("user", { decrypt: true });
    const token = currentToken?.access_token;
    let { data } = await deleteApi(
      `${process.env.REACT_APP_API_KEY}${process.env.REACT_APP_API_KEY_ADMIN}/deletePost/${objdata}`,
      token
    );
    if (data.isSuccess) {
      return Promise.resolve({ data: data });
    } else {
      return Promise.resolve({ status: false });
    }
  } catch ({ message }) {
    return Promise.reject({ status: false, message });
  }
};

export const DELETE_MEDIA = async (objdata) => {
  try {
    const currentToken = ls.get("user", { decrypt: true });
    const token = currentToken?.access_token;
    let { data } = await deleteApi(
      `${process.env.REACT_APP_API_KEY}${process.env.REACT_APP_API_KEY_ADMIN}/deleteMedia?userId=${objdata}`,
      token
    );
    if (data.isSuccess) {
      return Promise.resolve({ data: data });
    } else {
      return Promise.resolve({ status: false });
    }
  } catch ({ message }) {
    return Promise.reject({ status: false, message });
  }
};

export const DeleteMediaBulk = async (mediaData) => {
  try {
    const currentToken = ls.get("user", { decrypt: true });
    const token = currentToken?.access_token;
    let { data } = await deleteApiWithData(
      `${process.env.REACT_APP_API_KEY}${process.env.REACT_APP_API_KEY_ADMIN}/deleteMediaBulk`,
      token,
      mediaData
    );
    if (data.isSuccess) {
      return Promise.resolve({ data: data });
    } else {
      return Promise.resolve({ status: false });
    }
  } catch ({ message }) {
    return Promise.reject({ status: false, message });
  }
};
