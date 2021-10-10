import React, { useState, useEffect } from "react";
import { getMovieCast } from "../../API/apiService";
import PropTypes from "prop-types";
import noPosts from "../../images/noPosts.jpg";
import style from "./MovieCast.module.css";

const Cast = ({ movieId }) => {
  const [cast, setCast] = useState(null);

  const castId = document.querySelector("cast");
  useEffect(
    () => {
      const get = async () => {
        const { cast } = await getMovieCast(movieId);
        setCast(cast);
        if (castId) {
          window.scrollTo({
            top: castId.offsetTop,
            behavior: "smooth"
          });
        }
      };
      get();
    },
    [movieId, castId]
  );

  return (
    <ul className={style.list} id="cast">
      {cast &&
        cast.map(({ id, profile_path, original_name, character }) => (
          <li className={style.listItem} key={id}>
            <img src={profile_path ? `https://image.tmdb.org/t/p/w300${profile_path}` : `${noPosts}`} alt={original_name} />
            <p>{original_name}</p>
            <p>Character:{character}</p>
          </li>
        ))}
    </ul>
  );
};

Cast.propTypes = {
  movieId: PropTypes.string.isRequired
};

export default Cast;
