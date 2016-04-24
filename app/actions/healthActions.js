import * as types from '../constants/actionTypes';

export function update(data) {
  return {
    type: types.UPDATE,
    data
  }
}
