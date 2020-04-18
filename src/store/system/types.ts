import { User } from '../user/types';

export interface SystemState {
  loggedIn: boolean;
  user: User | undefined;
}

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

interface LogInAction {
  type: typeof LOGIN;
  payload: SystemState;
}

interface LogOutAction {
  type: typeof LOGOUT;
  payload: SystemState;
}

export type SystemActionTypes = LogInAction | LogOutAction;
