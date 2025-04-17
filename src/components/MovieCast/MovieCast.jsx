import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  fetchMovieCredits,
  IMAGE_BASE_URL,
} from 'services/api';
import styles from './MovieCast.module.css';

const defaultImg =
  'https://via.placeholder.com/150/0000FF/808080/?Text=No+Image';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const getMovieCast = async () => {
      setLoading(true);
      setError(null);
      try {
        const credits = await fetchMovieCredits(movieId);
        setCast(credits);
      } catch (error) {
        console.error('Error fetching movie cast:', error);
        setError('Failed to load cast.');
      } finally {
        setLoading(false);
      }
    };

    getMovieCast();
  }, [movieId]);

  if (loading) {
    return <div>Loading cast...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.movieCast}>
      <h2>Cast</h2>
      {cast.length > 0 ? (
        <ul className={styles.castList}>
          {cast.map((actor) => (
            <li key={actor.id} className={styles.castItem}>
              <img
                src={
                  actor.profile_path
                    ? `${IMAGE_BASE_URL}${actor.profile_path}`
                    : defaultImg
                }
                alt={actor.name}
                className={styles.actorPhoto}
              />
              <p className={styles.actorName}>
                {actor.name}
              </p>
              <p className={styles.actorCharacter}>
                Character: {actor.character}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No cast information available.</p>
      )}
    </div>
  );
};

export default MovieCast;
