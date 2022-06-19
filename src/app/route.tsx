import { Route, Routes } from "react-router-dom";
import Login from "../features/auth/Login";
import Thread from "../features/thread/Thread";
import PrivateRoute from "../utils/PrivateRoute";

export function AppRouting() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Thread />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
