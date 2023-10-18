import {
  BOOK_UPDATE_REQUEST,
  BOOK_UPDATE_SUCCESS,
  BOOK_UPDATE_FAIL,
  BOOK_CREATE_FAIL,
  BOOK_CREATE_REQUEST,
  BOOK_CREATE_SUCCESS,
  BOOK_DELETE_FAIL,
  BOOK_DELETE_REQUEST,
  BOOK_DELETE_SUCCESS,
  BOOK_LIST_REQUEST,
  BOOK_LIST_SUCCESS,
  BOOK_LIST_FAIL,
} from "../constants/bookConstants";

export const bookListReducer = (state = { BOOK: [] }, action) => {
  switch (action.type) {
    case BOOK_LIST_REQUEST:
      return { book_list_loading: true };
    case BOOK_LIST_SUCCESS:
      return { book_list_loading: false, books: action.payload };
    case BOOK_LIST_FAIL:
      return { book_list_loading: false, book_list_error: action.payload };

    default:
      return state;
  }
};

export const bookCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case BOOK_CREATE_REQUEST:
        return { book_create_loading: true };
      case BOOK_CREATE_SUCCESS:
        return { book_create_loading: false, book_create_success: true };
      case BOOK_CREATE_FAIL:
        return { book_create_loading: false, book_create_error: action.payload };
  
      default:
        return state;
    }
  };
  
  export const bookDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case BOOK_DELETE_REQUEST:
        return { book_delete_loading: true };
      case BOOK_DELETE_SUCCESS:
        return { book_delete_loading: false, book_delete_success: true };
      case BOOK_DELETE_FAIL:
        return { book_delete_loading: false, book_delete_error: action.payload, book_delete_success: false };
  
      default:
        return state;
    }
  };
  
  export const bookUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case BOOK_UPDATE_REQUEST:
        return { book_update_loading: true };
      case BOOK_UPDATE_SUCCESS:
        return { book_update_loading: false, book_update_success: true };
      case BOOK_UPDATE_FAIL:
        return { book_update_loading: false, book_update_error: action.payload, book_update_success: false };
  
      default:
        return state;
    }
  };