/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import axios from '../axios';
import {
  EVENT_ITEM_CREATE_FAIL,
  EVENT_ITEM_CREATE_REQUEST,
  EVENT_ITEM_CREATE_SUCCESS,
  EVENT_ITEM_DELETE_FAIL,
  EVENT_ITEM_DELETE_REQUEST,
  EVENT_ITEM_DELETE_SUCCESS,
  EVENT_ITEM_DETAILS_FAIL,
  EVENT_ITEM_DETAILS_REQUEST,
  EVENT_ITEM_DETAILS_SUCCESS,
  EVENT_ITEM_LIST_FAIL,
  EVENT_ITEM_LIST_REQUEST,
  EVENT_ITEM_LIST_SUCCESS,
} from '../constants/evenItemConstant';

export const listEventItems = (search) => async (dispatch, getState) => {
  try {
    dispatch({ type: EVENT_ITEM_LIST_REQUEST });

    let url = '/items/events/';
    if (search) {
      url = `/items/events/?search=${search}`;
    }

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        // Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(url, config);

    dispatch({
      type: EVENT_ITEM_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EVENT_ITEM_LIST_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail : error.message,

    });
  }
};

export const deleteEventItem = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EVENT_ITEM_DELETE_REQUEST,
    });

    const {
      // eslint-disable-next-line no-unused-vars
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        // Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(
      `/items/events/${id}/`,
      config,
    );

    dispatch({
      type: EVENT_ITEM_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EVENT_ITEM_DELETE_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const createEventItem = (item) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EVENT_ITEM_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        // Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      '/items/events/',
      item,
      config,
    );

    dispatch({
      type: EVENT_ITEM_CREATE_SUCCESS,
    });

    dispatch({
      type: EVENT_ITEM_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EVENT_ITEM_CREATE_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const getEventItemDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EVENT_ITEM_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        // Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `/items/event/${id}/`,
      config,
    );

    dispatch({
      type: EVENT_ITEM_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EVENT_ITEM_DETAILS_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};
