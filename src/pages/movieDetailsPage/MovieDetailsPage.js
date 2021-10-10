import React, { useState, useEffect } from "react";
import { Route, NavLink, useHistory, useLocation, useRouteMatch, useParams } from "react-router-dom";
import Cast from "../../Components/movieCast/MovieCast";
import Reviews from "../../Components/movieReviews/MovieReviews";
import { getMovieDetails } from "../../API/apiService";
import PropTypes from "prop-types";
import noPosts from "../../images/noPosts.jpg";
import style from "./MovieDetailsPage.module.css";

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
          <button className={style.btn} type="button" onClick={goBack}>
            {location?.state?.from?.label ?? "Go back"}
          </button>

          <div className={style.movieWrapper}>
            <img
              className={style.img}
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : { noPosts }}
              alt={movie.title}
            />
            <div className={style.infoWrapper}>
              <h2>{movie.title}</h2>
              <p>Rate {movie.vote_average}</p>
              <h3>Overview</h3>
              <p>{movie.overview ? movie.overview : "Overviews will be avaliable soon"}</p>
              <h3>Additional info</h3>
              <ul className={style.linkList}>
                <li className={style.linkListItem}>
                  <NavLink
                    className={style.link}
                    activeClassName={style.activeLink}
                    to={{
                      pathname: `${url}/cast`,
                      state: location.state
                    }}
                  >
                    Cast
                  </NavLink>
                </li>
                <li className={style.linkListItem}>
                  <NavLink
                    className={style.link}
                    activeClassName={style.activeLink}
                    to={{
                      pathname: `${url}/reviews`,
                      state: location.state
                    }}
                  >
                    Reviews
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>

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

MovieDetailsPage.propTypes = {
  onClick: PropTypes.func,
  movieId: PropTypes.string
};

export default MovieDetailsPage;
