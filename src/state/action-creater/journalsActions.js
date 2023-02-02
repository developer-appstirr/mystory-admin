import { getApi, postApi, deleteApi } from "../../api";
import {
  GET_JOURNALS,
  JOURNALS_LOADING,
  GET_FAMILTY_MEMBERS,
} from "../../Constants/constants";
import ls from "localstorage-slim";

export const GET_ALL_JOURNALS = (pagecount) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: JOURNALS_LOADING,
        payload: true,
      });
      const currentToken = ls.get("user", { decrypt: true });
      const token = currentToken?.access_token;
      let { data } = await getApi(
        `${process.env.REACT_APP_API_KEY}${process.env.REACT_APP_API_KEY_ADMIN}/journals?page=${pagecount}&count=10`,
        token
      );
      if (data.isSuccess) {
        dispatch({
          type: JOURNALS_LOADING,
          payload: false,
        });
        dispatch({
          type: GET_JOURNALS,
          payload: data,
        });
        return Promise.resolve({ data: data });
      } else {
        dispatch({
          type: JOURNALS_LOADING,
          payload: false,
        });
        return Promise.resolve({ status: false });
      }
    } catch ({ message }) {
      dispatch({
        type: JOURNALS_LOADING,
        payload: false,
      });

      return Promise.reject({ status: false, message });
    }
  };
};

export const GET_ALL_JOURNALS_BY_DATE = (pagecount, date) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: JOURNALS_LOADING,
        payload: true,
      });
      const currentToken = ls.get("user", { decrypt: true });
      const token = currentToken?.access_token;
      let { data } = await getApi(
        `${process.env.REACT_APP_API_KEY}${process.env.REACT_APP_API_KEY_ADMIN}/DailyJournal?date=${date}&count=100&page=${pagecount}`,
        token
      );
      if (data.isSuccess) {
        dispatch({
          type: JOURNALS_LOADING,
          payload: false,
        });
        dispatch({
          type: GET_JOURNALS,
          payload: data,
        });
        return Promise.resolve({ data: data });
      } else {
        dispatch({
          type: JOURNALS_LOADING,
          payload: false,
        });
        return Promise.resolve({ status: false });
      }
    } catch ({ message }) {
      dispatch({
        type: JOURNALS_LOADING,
        payload: false,
      });

      return Promise.reject({ status: false, message });
    }
  };
};

export const GET_FAMILY_MEMBERS = (pagecount) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: JOURNALS_LOADING,
        payload: true,
      });
      const currentToken = ls.get("user", { decrypt: true });
      const token = currentToken?.access_token;
      let { data } = await getApi(
        `${process.env.REACT_APP_API_KEY}${process.env.REACT_APP_API_KEY_ADMIN}/family-members?page=${pagecount}&count=10`,
        token
      );
      if (data.isSuccess) {
        dispatch({
          type: JOURNALS_LOADING,
          payload: false,
        });
        dispatch({
          type: GET_FAMILTY_MEMBERS,
          payload: data,
        });
        return Promise.resolve({ data: data });
      } else {
        dispatch({
          type: JOURNALS_LOADING,
          payload: false,
        });
        return Promise.resolve({ status: false });
      }
    } catch ({ message }) {
      dispatch({
        type: JOURNALS_LOADING,
        payload: false,
      });

      return Promise.reject({ status: false, message });
    }
  };
};

export const GET_FAMILY_MEMBERS_BYDATE = (pagecount, date) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: JOURNALS_LOADING,
        payload: true,
      });
      const currentToken = ls.get("user", { decrypt: true });
      const token = currentToken?.access_token;
      let { data } = await getApi(
        `${process.env.REACT_APP_API_KEY}${process.env.REACT_APP_API_KEY_ADMIN}/DailyInvite?date=${date}&count=10&page=${pagecount}`,
        token
      );
      if (data.isSuccess) {
        dispatch({
          type: JOURNALS_LOADING,
          payload: false,
        });
        dispatch({
          type: GET_FAMILTY_MEMBERS,
          payload: data,
        });
        return Promise.resolve({ data: data });
      } else {
        dispatch({
          type: JOURNALS_LOADING,
          payload: false,
        });
        return Promise.resolve({ status: false });
      }
    } catch ({ message }) {
      dispatch({
        type: JOURNALS_LOADING,
        payload: false,
      });

      return Promise.reject({ status: false, message });
    }
  };
};

export const DELETE_JOURNAL = async (objdata) => {
  try {
    const currentToken = ls.get("user", { decrypt: true });
    const token = currentToken?.access_token;
    let { data } = await deleteApi(
      `${process.env.REACT_APP_API_KEY}${process.env.REACT_APP_API_KEY_ADMIN}/journal?userId=${objdata?.userID}&journalId=${objdata?.journalID}`,
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
