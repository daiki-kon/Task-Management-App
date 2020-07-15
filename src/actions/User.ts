import { User } from '../DefineInfo'

export const LOGIN_USER = 'LOGIN_USER';

export const loginUser = (
  userInfo: User
) => {
  return({
  type: LOGIN_USER as typeof LOGIN_USER,
  payload: { userInfo },
  }
)};

export type UserAction =
  | ReturnType<typeof loginUser>;
