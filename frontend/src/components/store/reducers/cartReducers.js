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

export const cartListReducer = (state = { CART: [] }, action) => {
  switch (action.type) {
    case CART_LIST_REQUEST:
      return { cart_list_loading: true };
    case CART_LIST_SUCCESS:
      return { cart_list_loading: false, carts: action.payload };
    case CART_LIST_FAIL:
      return { cart_list_loading: false, cart_list_error: action.payload };

    default:
      return state;
  }
};

export const cartCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CART_CREATE_REQUEST:
      return { cart_create_loading: true };
    case CART_CREATE_SUCCESS:
      return { cart_create_loading: false, cart_create_success: true };
    case CART_CREATE_FAIL:
      return { cart_create_loading: false, cart_create_error: action.payload };

    default:
      return state;
  }
};

export const cartDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CART_DELETE_REQUEST:
      return { cart_delete_loading: true };
    case CART_DELETE_SUCCESS:
      return { cart_delete_loading: false, cart_delete_success: true };
    case CART_DELETE_FAIL:
      return {
        cart_delete_loading: false,
        cart_delete_error: action.payload,
        cart_delete_success: false,
      };

    default:
      return state;
  }
};

export const cartIncrementReducer = (state = {}, action) => {
  switch (action.type) {
    case CART_INCREMENT_REQUEST:
      return { cart_increment_loading: true };
    case CART_INCREMENT_SUCCESS:
      return { cart_increment_loading: false, cart_increment_success: true };
    case CART_INCREMENT_FAIL:
      return {
        cart_increment_loading: false,
        cart_increment_error: action.payload,
        cart_increment_success: false,
      };

    default:
      return state;
  }
};

export const cartDecrementReducer = (state = {}, action) => {
  switch (action.type) {
    case CART_DECREMENT_REQUEST:
      return { cart_decrement_loading: true };
    case CART_DECREMENT_SUCCESS:
      return { cart_decrement_loading: false, cart_decrement_success: true };
    case CART_DECREMENT_FAIL:
      return {
        cart_decrement_loading: false,
        cart_decrement_error: action.payload,
        cart_decrement_success: false,
      };

    default:
      return state;
  }
};
