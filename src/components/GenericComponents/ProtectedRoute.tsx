import { Navigate } from "react-router-dom";
import UserService from "../../security/UserService";
import { ReactElement } from "react";

export default function ProtectedRoute(props: { children: JSX.Element }) {
  console.log(UserService.getInstance().isLoggedIn());
  return UserService.getInstance().isLoggedIn() ? (
    props.children
  ) : (
    <Navigate to="/" replace />
  );
}
