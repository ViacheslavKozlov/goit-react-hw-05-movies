import React, { useState, useEffect } from "react";
import { getMovieReviews } from "../../API/apiService";

const Reviews = ({ movieId }) => {
  const [reviews, setReviews] = useState(null);

  const reviewsId = document.querySelector("#reviews");

  useEffect(
    () => {
      const get = async () => {
        const { results } = await getMovieReviews(movieId);
        setReviews(results);

        if (reviewsId) {
          window.scrollTo({
            top: reviewsId.offsetTop,
            behavior: "smooth"
          });
        }
      };
      get();
    },
    [movieId, reviewsId]
  );
  return (
    <section id="reviews">
      {reviews && (
        <ul>
          {reviews.length ? (
            reviews.map(({ id, author, content }) => (
              <li key={id}>
                <h3>Author {author}</h3>
                <p>{content}</p>
              </li>
            ))
          ) : (
            <li>
              <p>Ur review could be the first</p>
            </li>
          )}
        </ul>
      )}
    </section>
  );
};

export default Reviews;
