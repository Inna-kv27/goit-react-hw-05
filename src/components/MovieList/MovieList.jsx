import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGE_BASE_URL } from 'services/api';
import styles from './MovieList.module.css';

const MovieList = ({ movies }) => {
  return (
    <ul className={styles.movieList}>
      {movies.map((movie) => (
        <li key={movie.id} className={styles.movieItem}>
          <Link
            to={`/movies/${movie.id}`}
            state={{ from: location }}
          >
            {movie.poster_path ? (
              <img
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                className={styles.moviePoster}
              />
            ) : (
              <div className={styles.noPoster}>
                No poster available
              </div>
            )}
            <p className={styles.movieTitle}>
              {movie.title || movie.name}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
