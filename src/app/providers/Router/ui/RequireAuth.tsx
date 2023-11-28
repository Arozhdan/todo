import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RoutePath } from "../config/routerConfig";

export function RequireAuth({ children }: { children: JSX.Element }) {
  // const auth = useSelector(getUserAuthData)
  const location = useLocation();

  // if (!auth.user) {
  //   return <Navigate to={RoutePath.sign_in} state={{ from: location }} replace />
  // }

  return children;
}
