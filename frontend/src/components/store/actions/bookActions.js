import axios from "axios";
import {
  BOOK_LIST_FAIL,
  BOOK_LIST_REQUEST,
  BOOK_LIST_SUCCESS,
  BOOK_UPDATE_REQUEST,
  BOOK_UPDATE_SUCCESS,
  BOOK_UPDATE_FAIL,
  BOOK_CREATE_FAIL,
  BOOK_CREATE_REQUEST,
  BOOK_CREATE_SUCCESS,
  BOOK_DELETE_FAIL,
  BOOK_DELETE_REQUEST,
  BOOK_DELETE_SUCCESS,
} from "../constants/bookConstants";

export const listBooks =
  (query = "", page = 1, limit = 10) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: BOOK_LIST_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/books?query=${query}&page=${page}&limit=${limit}`,
        config
      );

      dispatch({
        type: BOOK_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: BOOK_LIST_FAIL,
        payload: message,
      });
    }
  };

export const createBookAction =
  (
    title,
    authors,

    language_code,
    num_pages,

    publication_date,
    publisher
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: BOOK_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/books/create`,
        {
          title,
          authors,

          language_code,
          num_pages,

          publication_date,
          publisher,
        },
        config
      );

      dispatch({
        type: BOOK_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: BOOK_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const deleteBookAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOK_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/books/${id}`, config);

    dispatch({
      type: BOOK_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: BOOK_DELETE_FAIL,
      payload: message,
    });
  }
};

export const updateBookAction =
  (
    id,
    title,
    authors,

    language_code,
    num_pages,

    publication_date,
    publisher
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: BOOK_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/books/${id}`,
        {
          title,
          authors,

          language_code,
          num_pages,

          publication_date,
          publisher,
        },
        config
      );

      dispatch({
        type: BOOK_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: BOOK_UPDATE_FAIL,
        payload: message,
      });
    }
  };
