import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchTrendingMovies } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const getTrendingMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const movies = await fetchTrendingMovies();
        if (isMounted) {
          setTrendingMovies(movies);
        }
      } catch (error) {
        console.error(
          'Error fetching trending movies:',
          error
        );
        if (isMounted) {
          setError('Failed to load trending movies.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    getTrendingMovies();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <div>Loading trending movies...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.homePage}>
      <h1 className={styles.title}>Trending today</h1>
      {trendingMovies.length > 0 ? (
        <MovieList movies={trendingMovies} />
      ) : (
        <p>No trending movies available.</p>
      )}
    </div>
  );
};

export default HomePage;
