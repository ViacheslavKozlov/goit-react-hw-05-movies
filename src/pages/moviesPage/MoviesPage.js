import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import slugify from "slugify";
import { getSearchMovies } from "../../API/apiService";
import PropTypes from "prop-types";
import noPosts from "../../images/noPosts.jpg";
import style from "./MoviesPage.module.css";

const createSlug = string =>
  slugify(string, {
    lower: true
  });

const MoviesPage = () => {
  const [searchMovie, setSearchMovie] = useState("");
  const [foundedMovies, setFoundedMovies] = useState([]);
  const [page, setPage] = useState(1);

  const location = useLocation();
  const history = useHistory();

  useEffect(
    () => {
      const searchLine = new URLSearchParams(location.search).get("query");
      if (!searchLine) return;
      const get = async () => {
        try {
          const { results } = await getSearchMovies(searchLine, page);
          setSearchMovie("");
          setFoundedMovies(prevFoundedMovies => [...prevFoundedMovies, ...results]);

          if (searchLine.trim() === "" && foundedMovies.length === 0) {
            return console.log(alert(`there r no movies under typed request`));
          }

          if (page > 1)
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: "smooth"
            });
        } catch (err) {
          return console.log(alert(`this is the end`));
        }
      };
      get();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location.search, page]
  );

  const handleSubmit = async evt => {
    evt.preventDefault();
    const normilizedInput = searchMovie.trim();
    if (!normilizedInput) return;
    try {
      const { results } = await getSearchMovies(normilizedInput);
      // console.log(results);
      setFoundedMovies([]);
      setSearchMovie("");

      if (results.length === 0) {
        return alert("there r no movies under request");
      }
      history.push({ ...location, search: `query=${searchMovie}` });
    } catch (err) {
      return console.log(alert("this is the end"));
    }
  };

  const handleInputChange = evt => {
    setSearchMovie(evt.target.value);
  };

  const handleLoadMoreBtn = () => {
    setPage(prevPage => prevPage + 1);
  };

  const showButton = foundedMovies.length >= 20;

  return (
    <section>
      <form className={style.form} onSubmit={handleSubmit}>
        <input
          className={style.input}
          type="text"
          value={searchMovie}
          placeholder={"Type 2 find"}
          onChange={handleInputChange}
        />
        <button className={style.btn} type="submit">
          Search
        </button>
      </form>
      {foundedMovies && (
        <ul className={style.list}>
          {foundedMovies.map(({ id, title, poster_path }) => (
            <li className={style.listItem} key={id}>
              <Link
                to={{
                  pathname: `/movies/${createSlug(`${title} ${id}`)}`,
                  state: {
                    from: {
                      location,
                      lable: "back 2 movies"
                    }
                  }
                }}
              >
                <img
                  className={style.img}
                  src={poster_path ? `https://image.tmdb.org/t/p/w300${poster_path}` : `${noPosts}`}
                  alt={title}
                />
                <p className={style.itemTitle}>{title}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {showButton && (
        <button className={style.loadMoreBtn} onClick={handleLoadMoreBtn}>
          More movies
        </button>
      )}
    </section>
  );
};

MoviesPage.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  poster_path: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleInputChange: PropTypes.func,
  handleLoadMoreBtn: PropTypes.func
};

export default MoviesPage;
