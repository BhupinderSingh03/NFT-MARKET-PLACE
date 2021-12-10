import React, { useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";

const PaypalAssets = React.lazy(() => import("../screens/paypalAssets"));

const PublicAssets = React.lazy(() => import("../screens/publicAssets"));

const MyAssets = React.lazy(() => import("../screens/myAssets"));

/**
 * Config for client side routing using react lazy loading
 * @returns
 */
const RoutesComponent = () => {
  const location = useLocation();
  useEffect(() => {
    console.log("Location changed", location);
  }, [location]);
  return (
    <div className="container">
      <Switch>{renderComponent("/", PublicAssets, true)}</Switch>
      <Switch>{renderComponent("/paypal", PaypalAssets)}</Switch>
      <Switch>{renderComponent("/ownable", MyAssets)}</Switch>
    </div>
  );
};

const renderComponent = (path, Component, isExact) => {
  if (isExact) {
    return (
      <Route
        path={path}
        exact
        render={(props) => {
          return (
            <React.Suspense fallback={"...loading"}>
              <Component {...props} />
            </React.Suspense>
          );
        }}
      />
    );
  } else {
    return (
      <Route
        path={path}
        render={(props) => {
          return (
            <React.Suspense fallback={"...loading"}>
              <Component {...props} />
            </React.Suspense>
          );
        }}
      />
    );
  }
};

export default RoutesComponent;
