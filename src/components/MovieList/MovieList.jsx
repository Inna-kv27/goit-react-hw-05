// src/components/MovieList/MovieList.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './MovieList.module.css';
import { IMAGE_BASE_URL } from '../../services/api';

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={styles.movieList}>
      {movies.map((movie) => (
        <li key={movie.id} className={styles.movieItem}>
          <Link
            to={`/movies/${movie.id}`}
            state={{ from: location }}
            className={styles.movieLink}
          >
            <img
              src={
                movie.poster_path
                  ? `${IMAGE_BASE_URL}${movie.poster_path}`
                  : 'https://via.placeholder.com/300/0000FF/808080/?Text=No+Poster'
              }
              alt={movie.title}
              className={styles.moviePoster}
            />
            <h3 className={styles.movieTitle}>
              {movie.title}
            </h3>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
