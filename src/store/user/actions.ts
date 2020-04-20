import { SET_USERLIST, User, UserListActionTypes } from './types';

export function setUserList(list: User[]): UserListActionTypes {
  return {
    type: SET_USERLIST,
    payload: list,
  };
}
