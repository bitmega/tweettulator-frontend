import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { PropsWithChildren, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { setCredentials } from "../features/auth/authSlice";
import { IUser, UserResponse } from "../interfaces/Auth";

export default function AppLayout({ children }: PropsWithChildren) {
  const dispatch: Dispatch<AnyAction> = useDispatch();
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    const userString: string | null = localStorage.getItem("user");
    const token: string | null = localStorage.getItem("token");
    if (userString && token) {
      const user: IUser = JSON.parse(userString);
      const payload: UserResponse = {
        user,
        token,
      };
      dispatch(setCredentials(payload));
      navigate("/");
    }
  }, [dispatch, navigate]);
  return <>{children}</>;
}
