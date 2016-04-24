import * as types from '../constants/actionTypes';

const initialState = [];

export default function update(state = initialState, action = {}) {
  switch (action.type) {
    case types.UPDATE:
      return [
        ...state,
        ...action.data
      ];
    default:
      return state;
  }
}
