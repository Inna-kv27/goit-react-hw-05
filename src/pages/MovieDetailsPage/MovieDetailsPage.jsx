import React, {
  useState,
  useEffect,
  Suspense,
  lazy,
} from 'react';
import {
  useParams,
  Link,
  Outlet,
  useLocation,
} from 'react-router-dom';
import {
  fetchMovieDetails,
  IMAGE_BASE_URL,
} from '../../services/api';
import GoBackBtn from '../../components/GoBackBtn/GoBackBtn';
import styles from './MovieDetailsPage.module.css';

const MovieCast = lazy(() =>
  import('../../components/MovieCast/MovieCast')
);
const MovieReviews = lazy(() =>
  import('../../components/MovieReviews/MovieReviews')
);

const defaultImg =
  'https://via.placeholder.com/300/0000FF/808080/?Text=No+Poster';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (!movieId) return;

    let isMounted = true;

    const getMovieDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const details = await fetchMovieDetails(movieId);
        if (isMounted) {
          setMovie(details);
        }
      } catch (error) {
        console.error(
          `Error fetching details for movie ${movieId}:`,
          error
        );
        if (isMounted) {
          setError('Failed to load movie details.');
          setMovie(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    getMovieDetails();

    return () => {
      isMounted = false;
    };
  }, [movieId]);

  if (loading) {
    return <div>Loading movie details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!movie) {
    return <div>Movie not found.</div>;
  }

  return (
    <div className={styles.movieDetailsPage}>
      <GoBackBtn />
      <div className={styles.movieInfo}>
        <img
          src={
            movie.poster_path
              ? `${IMAGE_BASE_URL}${movie.poster_path}`
              : defaultImg
          }
          alt={movie.title}
          className={styles.poster}
        />
        <div className={styles.details}>
          <h2 className={styles.title}>
            {movie.title} (
            {movie.release_date?.substring(0, 4)})
          </h2>
          <p className={styles.userScore}>
            User Score:{' '}
            {Math.round(movie.vote_average * 10)}%
          </p>
          <h3>Overview</h3>
          <p className={styles.overview}>
            {movie.overview}
          </p>
          <h4>Genres</h4>
          <ul className={styles.genres}>
            {movie.genres?.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.additionalInfo}>
        <h3>Additional information</h3>
        <ul>
          <li>
            <Link to={`cast`} state={{ from: location }}>
              Cast
            </Link>
          </li>
          <li>
            <Link to={`reviews`} state={{ from: location }}>
              Reviews
            </Link>
          </li>
        </ul>
        <Suspense fallback={<div>Loading subpage...</div>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
