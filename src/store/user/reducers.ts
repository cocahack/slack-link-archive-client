import { SET_USERLIST, UserListActionTypes, UserListState } from './types';

const initialState: UserListState = {
  users: [],
};

export function userListReducer(
  state = initialState,
  action: UserListActionTypes,
): UserListState {
  switch (action.type) {
    case SET_USERLIST:
      return {
        users: action.payload,
      };
    default:
      return state;
  }
}
