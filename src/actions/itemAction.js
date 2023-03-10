/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import axios from '../axios';
import {
  ITEM_CREATE_FAIL,
  ITEM_CREATE_REQUEST,
  ITEM_CREATE_SUCCESS,
  ITEM_DELETE_FAIL,
  ITEM_DELETE_REQUEST,
  ITEM_DELETE_SUCCESS,
  ITEM_DETAILS_FAIL,
  ITEM_DETAILS_REQUEST,
  ITEM_DETAILS_SUCCESS,
  ITEM_LIST_FAIL,
  ITEM_LIST_REQUEST,
  ITEM_LIST_SUCCESS,
  ITEM_UPDATE_FAIL,
  ITEM_UPDATE_REQUEST,
  ITEM_UPDATE_SUCCESS,
} from '../constants/itemConstants';

export const listItems = (search) => async (dispatch, getState) => {
  try {
    dispatch({ type: ITEM_LIST_REQUEST });
    let url = '/items/';
    if (search) {
      url = `/items/?search=${search}`;
    }

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(url, config);

    dispatch({
      type: ITEM_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ITEM_LIST_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail : error.message,

    });
  }
};

export const deleteItem = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ITEM_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.delete(
      `/items/${id}/`,
      config,
    );

    dispatch({
      type: ITEM_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ITEM_DELETE_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const updateItem = (item) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ITEM_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.put(
      `/items/${item.id}/`,
      item,
      config,
    );

    dispatch({
      type: ITEM_UPDATE_SUCCESS,
    });

    dispatch({
      type: ITEM_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ITEM_UPDATE_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const createItem = (item) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ITEM_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.post(
      '/items/',
      item,
      config,
    );

    dispatch({
      type: ITEM_CREATE_SUCCESS,
    });

    dispatch({
      type: ITEM_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ITEM_CREATE_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const getItemDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ITEM_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `/items/${id}/`,
      config,
    );

    dispatch({
      type: ITEM_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ITEM_DETAILS_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};
