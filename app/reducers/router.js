import { Actions } from 'react-native-router-flux';

const initialState = {
  name: '',
  route: null
};

export default function counter(state = initialState, action = {}) {
  switch (action.type) {
    case Actions.BEFORE_ROUTE:
      return {
        ...state,
        name: action.name,
        route: action.route
      };
    case Actions.AFTER_ROUTE:
      return {
        ...state,
        name: action.name,
        route: action.route
      };
    case Actions.AFTER_POP:
      return {
        ...state,
        name: action.name,
        route: action.route
      };
    case Actions.BEFORE_POP:
      return {
        ...state,
        name: action.name,
        route: action.route
      };
    case Actions.AFTER_DISMISS:
      return {
        ...state,
        name: action.name,
        route: action.route
      };
    case Actions.BEFORE_DISMISS:
      return {
        ...state,
        name: action.name,
        route: action.route
      };
    default:
      return state;
  }
}
