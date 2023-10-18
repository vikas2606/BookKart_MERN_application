import {
  CART_LIST_SUCCESS,
  CART_CREATE_FAIL,
  CART_CREATE_REQUEST,
  CART_CREATE_SUCCESS,
  CART_DECREMENT_FAIL,
  CART_DECREMENT_REQUEST,
  CART_DECREMENT_SUCCESS,
  CART_DELETE_FAIL,
  CART_DELETE_REQUEST,
  CART_DELETE_SUCCESS,
  CART_INCREMENT_FAIL,
  CART_INCREMENT_REQUEST,
  CART_INCREMENT_SUCCESS,
  CART_LIST_FAIL,
  CART_LIST_REQUEST,
} from "../constants/cartConstants";
import axios from "axios";

export const CartList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CART_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/cart`, config);

    dispatch({
      type: CART_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: CART_LIST_FAIL,
      payload: message,
    });
  }
};

export const AddToCartAction =
  (bookId, quantity) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CART_CREATE_REQUEST,
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
        `/api/cart/`,
        {
          bookId,
          quantity,
        },
        config
      );

      dispatch({
        type: CART_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: CART_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const removeCartAction = (bookId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CART_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/cart/${bookId}`, config);

    dispatch({
      type: CART_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CART_DELETE_FAIL,
      payload: message,
    });
  }
};

export const cartIncrementAction = (bookId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CART_INCREMENT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/cart/increase/`, { bookId }, config);

    dispatch({
      type: CART_INCREMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CART_INCREMENT_FAIL,
      payload: message,
    });
  }
};

export const cartDecrementAction = (bookId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CART_DECREMENT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/cart/decrease/`, { bookId }, config);

    dispatch({
      type: CART_DECREMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CART_DECREMENT_FAIL,
      payload: message,
    });
  }
};
