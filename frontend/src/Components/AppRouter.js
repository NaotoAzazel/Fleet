import { Route, Routes } from "react-router-dom";
import { routes } from "../Router/Router.js"
import PageNotFound from "./Pages/PageNotFound.jsx";
import { Helmet } from "react-helmet";
import { useMemo } from "react";

function AppRouter() {
  const memoizedRoutes = useMemo(() => {
    return routes.map(route => ({
      ...route,
      element: (
        <>
          <Helmet>
            <title>{route.pageTitle}</title>
          </Helmet>
          <route.element />
        </>
      )
    }));
  }, [routes]);

  return (
    <Routes>
      {memoizedRoutes.map(route => 
        <Route 
          id={route.path}
          element={route.element} 
          path={route.path}
          exact={route.exact}
          key={route.path}
        />
      )}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default AppRouter