import { LOGIN, SystemActionTypes } from './types';
import { User } from '../user/types';

export function login(user: User): SystemActionTypes {
  return {
    type: LOGIN,
    payload: {
      loggedIn: true,
      user,
    },
  };
}

export function logout(): SystemActionTypes {
  return {
    type: LOGIN,
    payload: {
      loggedIn: false,
      user: undefined,
    },
  };
}
