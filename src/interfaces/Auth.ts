export interface IUser {
  first_name: string;
  last_name: string;
}

export interface UserResponse {
  user: IUser;
  token: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

//App 
export interface IAuthState {
  user: null | IUser;
  token: null | string;
}
