import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Spinner from "./loader/Loader";
import MainNavigation from "./MainNavigation/MainNavigation";

const HomePage = lazy(() => import("../pages/HomePage"));
const MoviesPage = lazy(() => import("../pages/MoviesPage"));
const Page404 = lazy(() => import("../pages/404Page"));

const App = () => {
  return (
    <>
      <MainNavigation />
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          {/* <Route path="/movies/:slug">
            <MovieDetailsPage />
          </Route> */}

          <Route path="/movies">
            <MoviesPage />
          </Route>
          <Route>
            <Page404 />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
};

export default App;
