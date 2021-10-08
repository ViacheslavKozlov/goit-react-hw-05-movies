import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { getSearchMovies } from "../API/apiService";
import noPosts from "../images/noPosts.png";

const MoviesPage = () => {
  const [searchMovie, setSearchMovie] = useState("");
  const [foundedMovies, setFoundedMovies] = useState([]);

  const location = useLocation();
  const history = useHistory();
  useEffect(
    () => {
      const searchLine = new URLSearchParams(location.search).get("query");
      if (searchLine) {
        const get = async () => {
          const { results } = await getSearchMovies(searchLine);
          console.log(results);
          setFoundedMovies(results);
          setSearchMovie("");
        };
        get();
      }
    },
    [location.search]
  );

  const handleSubmit = async evt => {
    evt.preventDefault();
    const normilizedInput = searchMovie.trim();
    if (normilizedInput) {
      const { results } = await getSearchMovies(normilizedInput);
      console.log(results);
      setFoundedMovies(results);
      setSearchMovie("");

      if (!results) {
        return alert(console.log("there r no movies under request"));
      }
      history.push({ ...location, search: `query=${searchMovie}` });
    }
  };

  const handleInputChange = evt => {
    setSearchMovie(evt.target.value);
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input type="text" value={searchMovie} placeholder={"Type 2 find"} onChange={handleInputChange} />
        <button type="submit">Search</button>
      </form>
      {foundedMovies && (
        <ul>
          {foundedMovies.map(({ id, title, poster_path }) => (
            <li key={id}>
              <Link
                to={{
                  pathname: `/movies/${title}${id}`,
                  state: {
                    from: {
                      location,
                      label: "back 2 movies"
                    }
                  }
                }}
              >
                <img src={poster_path ? `https://image.tmdb.org/t/p/w300${poster_path}` : `${noPosts}`} alt={title} />
                <p>{title}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default MoviesPage;
