import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from 'services/api';
import MovieList from 'components/MovieList/MovieList';
import SearchForm from 'components/SearchForm/SearchForm';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const handleSearchSubmit = (value) => {
    setSearchParams({ query: value });
  };

  useEffect(() => {
    if (query) {
      const fetchSearchResults = async () => {
        setLoading(true);
        setError(null);
        try {
          const results = await searchMovies(query);
          setSearchResults(results);
        } catch (error) {
          console.error('Error searching movies:', error);
          setError('Failed to load search results.');
          setSearchResults([]);
        } finally {
          setLoading(false);
        }
      };

      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [query]);

  return (
    <div className={styles.moviesPage}>
      <SearchForm onSubmit={handleSearchSubmit} />

      {loading && <div>Loading search results...</div>}
      {error && <div>{error}</div>}

      {searchResults.length > 0 && (
        <div>
          <h2>Search results for "{query}"</h2>
          <MovieList movies={searchResults} />
        </div>
      )}

      {query &&
        searchResults.length === 0 &&
        !loading &&
        !error && <p>No movies found for "{query}".</p>}
    </div>
  );
};

export default MoviesPage;
