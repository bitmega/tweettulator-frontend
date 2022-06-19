import { ActionCreatorWithPayload, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IAuthState, IUser } from "../../interfaces/Auth";

const initialState: IAuthState = {
  user: null,
  token: null,
}

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state: IAuthState, { payload }: PayloadAction<IAuthState>) => {
      const { user, token } = payload;
      state.user = user;
      state.token = token;
      localStorage.setItem("token", JSON.stringify(token));
    },
    logout: (state: IAuthState, { payload }: PayloadAction<undefined>) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    }
  }
});

export const setCredentials: ActionCreatorWithPayload<IAuthState, string> = slice.actions.setCredentials;
export const logout: ActionCreatorWithPayload<undefined, string> = slice.actions.logout;


export const selectCurrentUser: (state: RootState) => IUser | null = (state: RootState) => state.auth.user;

export default slice.reducer;