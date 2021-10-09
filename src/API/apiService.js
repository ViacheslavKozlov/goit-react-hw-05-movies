import axios from "axios";
import { APIKEY } from "./apiKey";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
const getTrendingMovies = async () => {
  const queryLine = `trending/movie/day${APIKEY}`;

  const { data: movies } = await axios.get(queryLine);
  return movies;
};

const getSearchMovies = async (searchRequest, page) => {
  const queryLine = `search/movie${APIKEY}&language=en-US&page=${page}&include_adult=false&query=${searchRequest}`;
  const { data: movies } = await axios.get(queryLine);
  return movies;
};

const getMovieDetails = async movieId => {
  const queryLine = `movie/${movieId}${APIKEY}&language=en-US`;
  const { data: movie } = await axios.get(queryLine);
  // console.log(movie);
  return movie;
};

const getMovieCast = async movieId => {
  const queryLine = `movie/${movieId}/credits${APIKEY}&language=en-US`;
  const { data } = await axios.get(queryLine);
  return data;
};

const getMovieReviews = async movieId => {
  const queryLine = `movie/${movieId}/reviews${APIKEY}&language=en-US`;
  const { data } = await axios.get(queryLine);
  return data;
};

export { getTrendingMovies, getSearchMovies, getMovieDetails, getMovieReviews, getMovieCast };
