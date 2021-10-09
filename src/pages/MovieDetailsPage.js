import React, { useState, useEffect } from "react";
import { Route, NavLink, useHistory, useLocation, useRouteMatch, useParams } from "react-router-dom";
import Cast from "../Components/MovieCast/MovieCast";
import Reviews from "../Components/MovieReviews/MovieReviews";
import { getMovieDetails } from "../API/apiService";
import noPosts from "../images/noPosts.png";

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const history = useHistory();
  const { url } = useRouteMatch();
  const { slug } = useParams();
  //   const movieId = 767499;
  const getId = line => line.match(/[a-z0-9]+$/)[0];
  const movieId = getId(slug);

  useEffect(
    () => {
      const get = async () => {
        const currentMovie = await getMovieDetails(movieId);
        setMovie(currentMovie);
      };
      get();
    },
    [movieId]
  );

  const goBack = () => {
    history.push(location?.state?.from?.location ?? "/movies");
  };

  return (
    <>
      {movie && (
        <section>
          <button type="button" onClick={goBack}>
            {location?.state?.from?.label ?? "Back"}
          </button>
          <img
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : { noPosts }}
            alt={movie.title}
          />
          <h2>{movie.title}</h2>
          <p>Rate {movie.vote_average}</p>
          <h3>Overview</h3>
          <p>{movie.overview ? movie.overview : "Overviews will be avaliable soon"}</p>
          <h3>Additional info</h3>
          <ul>
            <li>
              <NavLink
                to={{
                  pathname: `${url}/cast`,
                  state: location.state
                }}
              >
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{
                  pathname: `${url}/reviews`,
                  state: location.state
                }}
              >
                Reviews
              </NavLink>
            </li>
          </ul>
          <Route path={`${url}/cast`}>
            <Cast movieId={movieId} />
          </Route>
          <Route path={`${url}/reviews`}>
            <Reviews movieId={movieId} />
          </Route>
        </section>
      )}
    </>
  );
};

export default MovieDetailsPage;
