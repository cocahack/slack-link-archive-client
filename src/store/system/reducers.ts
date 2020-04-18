import { LOGIN, LOGOUT, SystemActionTypes, SystemState } from './types';

const initialState: SystemState = {
  loggedIn: false,
  user: undefined,
};

export function systemReducer(
  state = initialState,
  action: SystemActionTypes,
): SystemState {
  switch (action.type) {
    case LOGIN:
      return {
        ...action.payload,
      };
    case LOGOUT:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
}
