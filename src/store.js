import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer, userRegisterReducer } from './reducers/userReducer';
import {
  itemCreateReducer, itemDeleteReducer, itemDetailsReducer, itemsListReducers, itemUpdateReducer,
} from './reducers/itemReducer';
import {
  eventItemCreateReducer, eventItemDeleteReducer, eventItemDetailsReducer, eventItemsListReducers,
} from './reducers/itemEventReducer';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,

  itemsList: itemsListReducers,
  itemDelete: itemDeleteReducer,
  itemUpdate: itemUpdateReducer,
  itemCreate: itemCreateReducer,
  itemDetails: itemDetailsReducer,

  eventItemList: eventItemsListReducers,
  eventItemDelete: eventItemDeleteReducer,
  eventItemCreate: eventItemCreateReducer,
  eventItemDetails: eventItemDetailsReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,

  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
