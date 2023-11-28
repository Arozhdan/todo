import { Home } from "@/pages/Home";
import { RouteProps } from "react-router-dom";

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
  layout?: boolean;
};

export enum AppRoutes {
  HOME = "home",
  SIGN_IN = "sign_in",
  SIGN_UP = "sign_up",

  // last
  NOT_FOUND = "not_found",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: "/",
  [AppRoutes.SIGN_IN]: "/sign-in",
  [AppRoutes.SIGN_UP]: "/sign-up",

  // последний
  [AppRoutes.NOT_FOUND]: "*",
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.HOME]: {
    path: RoutePath.home,
    element: <Home />,
  },
  [AppRoutes.SIGN_IN]: {
    path: RoutePath.sign_in,
    element: (
      <>
        <h1>Sign In</h1>
        <p>To do.</p>
      </>
    ),
  },
  [AppRoutes.SIGN_UP]: {
    path: RoutePath.sign_up,
    element: (
      <>
        <h1>Sign Up</h1>
        <p>To do.</p>
      </>
    ),
  },

  // catch all
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: (
      <>
        <h1>404</h1>
      </>
    ),
  },
};
