import { useSelector } from "react-redux";
import { Navigate, RouteProps } from "react-router-dom";
import { selectCurrentUser } from "../features/auth/authSlice";

type PropsWithChildren = RouteProps & { children: JSX.Element };

export default function PrivateRoute({ children }: PropsWithChildren): JSX.Element {
  const user = useSelector(selectCurrentUser);
  return user ? children : <Navigate to="/login" replace />;
}
