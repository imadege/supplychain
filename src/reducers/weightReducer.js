/* eslint-disable default-param-last */
/* eslint-disable import/prefer-default-export */
import {
  ITEM_CREATE_FAIL,
  ITEM_CREATE_REQUEST,
  ITEM_CREATE_RESET,
  ITEM_CREATE_SUCCESS,
  ITEM_DELETE_FAIL,
  ITEM_DELETE_REQUEST,
  ITEM_DELETE_SUCCESS,
  ITEM_DETAILS_FAIL,
  ITEM_DETAILS_REQUEST,
  ITEM_DETAILS_RESET,
  ITEM_DETAILS_SUCCESS,
  ITEM_LIST_FAIL,
  ITEM_LIST_REQUEST,
  ITEM_LIST_SUCCESS,
  ITEM_UPDATE_FAIL,
  ITEM_UPDATE_REQUEST,
  ITEM_UPDATE_RESET,
  ITEM_UPDATE_SUCCESS,
} from '../constants/itemConstants';

export const itemsListReducers = (state = { ITEMs: [] }, action) => {
  switch (action.type) {
    case ITEM_LIST_REQUEST:
      return { loading: true, ITEMs: [] };

    case ITEM_LIST_SUCCESS:
      return { loading: false, ITEMs: action.payload };

    case ITEM_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const itemDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ITEM_DELETE_REQUEST:
      return { loading: true };

    case ITEM_DELETE_SUCCESS:
      return { loading: false, success: true };

    case ITEM_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const itemUpdateReducer = (state = { item: {} }, action) => {
  switch (action.type) {
    case ITEM_UPDATE_REQUEST:
      return { loading: true };

    case ITEM_UPDATE_SUCCESS:
      return { loading: false, success: true };

    case ITEM_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    case ITEM_UPDATE_RESET:
      return { item: {} };

    default:
      return state;
  }
};

export const itemCreateReducer = (state = { item: {} }, action) => {
  switch (action.type) {
    case ITEM_CREATE_REQUEST:
      return { loading: true };

    case ITEM_CREATE_SUCCESS:
      return { loading: false, success: true };

    case ITEM_CREATE_FAIL:
      return { loading: false, error: action.payload };

    case ITEM_CREATE_RESET:
      return { item: {} };

    default:
      return state;
  }
};

export const itemDetailsReducer = (state = { item: {} }, action) => {
  switch (action.type) {
    case ITEM_DETAILS_REQUEST:
      return { ...state, loading: true };

    case ITEM_DETAILS_SUCCESS:
      return { loading: false, ITEM: action.payload };

    case ITEM_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    case ITEM_DETAILS_RESET:
      return { item: {} };

    default:
      return state;
  }
};
