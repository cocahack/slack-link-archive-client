export interface User {
  email: string;
  userId: string;
  userName: string;
  userImage: string;
}

export interface UserListState {
  users: User[];
}

export const SET_USERLIST = 'SET_USERLIST';

interface SetUserListAction {
  type: typeof SET_USERLIST;
  payload: User[];
}

export type UserListActionTypes = SetUserListAction;
