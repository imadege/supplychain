/* eslint-disable default-param-last */
/* eslint-disable import/prefer-default-export */
import {
  EVENT_ITEM_CREATE_FAIL,
  EVENT_ITEM_CREATE_REQUEST,
  EVENT_ITEM_CREATE_RESET,
  EVENT_ITEM_CREATE_SUCCESS,
  EVENT_ITEM_DELETE_FAIL,
  EVENT_ITEM_DELETE_REQUEST,
  EVENT_ITEM_DELETE_SUCCESS,
  EVENT_ITEM_DETAILS_FAIL,
  EVENT_ITEM_DETAILS_REQUEST,
  EVENT_ITEM_DETAILS_RESET,
  EVENT_ITEM_DETAILS_SUCCESS,
  EVENT_ITEM_LIST_FAIL,
  EVENT_ITEM_LIST_REQUEST,
  EVENT_ITEM_LIST_SUCCESS,
} from '../constants/evenItemConstant';

export const eventItemsListReducers = (state = { events: [] }, action) => {
  switch (action.type) {
    case EVENT_ITEM_LIST_REQUEST:
      return { loading: true, events: [] };

    case EVENT_ITEM_LIST_SUCCESS:
      return { loading: false, events: action.payload };

    case EVENT_ITEM_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const eventItemDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case EVENT_ITEM_DELETE_REQUEST:
      return { loading: true };

    case EVENT_ITEM_DELETE_SUCCESS:
      return { loading: false, success: true };

    case EVENT_ITEM_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const eventItemCreateReducer = (state = { event: {} }, action) => {
  switch (action.type) {
    case EVENT_ITEM_CREATE_REQUEST:
      return { loading: true };

    case EVENT_ITEM_CREATE_SUCCESS:
      return { loading: false, success: true };

    case EVENT_ITEM_CREATE_FAIL:
      return { loading: false, error: action.payload };

    case EVENT_ITEM_CREATE_RESET:
      return { event: {} };

    default:
      return state;
  }
};

export const eventItemDetailsReducer = (state = { event: {} }, action) => {
  switch (action.type) {
    case EVENT_ITEM_DETAILS_REQUEST:
      return { ...state, loading: true };

    case EVENT_ITEM_DETAILS_SUCCESS:
      return { loading: false, EVENT_ITEM: action.payload };

    case EVENT_ITEM_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    case EVENT_ITEM_DETAILS_RESET:
      return { event: {} };

    default:
      return state;
  }
};
