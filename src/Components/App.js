import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Spinner from "./loader/Loader";
import MainNavigation from "./navigation/Navigation";

const HomePage = lazy(() => import("../pages/homePage/HomePage")); /* webpackChunkName: "HomePage"  */
const MoviesPage = lazy(() => import("../pages/moviesPage/MoviesPage")); /* webpackChunkName: "MoviesPage"  */
const MovieDetailsPage = lazy(() =>
  import("../pages/movieDetailsPage/MovieDetailsPage")
); /* webpackChunkName: "MovieDetailsPage"  */
const Page404 = lazy(() => import("../pages/404Page/404Page")); /* webpackChunkName: "404Page"  */

const App = () => {
  return (
    <>
      <MainNavigation />
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>

          <Route path="/movies/:slug">
            <MovieDetailsPage />
          </Route>

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
