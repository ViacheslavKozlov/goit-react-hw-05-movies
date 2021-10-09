import React, { useState, useEffect } from "react";
import { getMovieCast } from "../../API/apiService";
import noPosts from "../../images/noPosts.png";

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
    <ul id="cast">
      {cast &&
        cast.map(({ id, profile_path, original_name, character }) => (
          <li key={id}>
            <img src={profile_path ? `https://image.tmdb.org/t/p/w300${profile_path}` : `${noPosts}`} alt={original_name} />
            <p>{original_name}</p>
            <p>Character:{character}</p>
          </li>
        ))}
    </ul>
  );
};

export default Cast;
