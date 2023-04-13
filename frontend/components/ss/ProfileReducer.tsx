import {UPDATE_USER_NAME, UPDATE_USER_IMG, ADD_PROFILE} from '../redux/actions/types';

const initialState = {
  userName: null,
  userImg: require('../../Assets/EmptyIcon.png'),
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_NAME:
      return {...state, userName: action.payload};
    case UPDATE_USER_IMG:
      return {...state, userImg: action.payload};
    case ADD_PROFILE:
      return {...state, user: action.payload};
    default:
      return state;
  }
};
