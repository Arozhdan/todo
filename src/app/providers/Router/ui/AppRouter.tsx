import { FC, memo, Suspense, useCallback } from "react";
import { Route, Routes } from "react-router-dom";
import { AppRoutesProps, routeConfig } from "../config/routerConfig";
import { RequireAuth } from "./RequireAuth";

const Layout: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <>{children}</>;
};

const AppRouter = () => {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const element = (
      <Suspense fallback={<>loading...</>}>{route.element}</Suspense>
    );
    const renderElement = route.layout ? <Layout>{element}</Layout> : element;
    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          route.authOnly ? (
            <RequireAuth>{renderElement}</RequireAuth>
          ) : (
            renderElement
          )
        }
      />
    );
  }, []);

  return (
    <>
      <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>
    </>
  );
};

export default memo(AppRouter);
