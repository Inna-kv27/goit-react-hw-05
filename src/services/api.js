import axios from 'axios';

const API_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NjdjZTU5NTczY2E1YzNkOTZiNGQ0Yzg1NzcwZDEzMyIsIm5iZiI6MTc0NDg5NTU3OC42MTYsInN1YiI6IjY4MDBmZTVhZWY1YWU2ODdjYmQ5ZTNmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pb0omgZ52vNxPHO37exdiL6AOvtMqCjWJFsRfZTzwZ4';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

axios.defaults.headers.common[
  'Authorization'
] = `Bearer ${API_KEY}`;

export const fetchTrendingMovies = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/trending/movie/day`
    );
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/search/movie?query=${query}&include_adult=false`
    );
    return response.data.results;
  } catch (error) {
    console.error(
      `Error searching movies with query "${query}":`,
      error
    );
    throw error;
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${movieId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching details for movie ID ${movieId}:`,
      error
    );
    throw error;
  }
};

export const fetchMovieCredits = async (movieId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${movieId}/credits`
    );
    return response.data.cast;
  } catch (error) {
    console.error(
      `Error fetching credits for movie ID ${movieId}:`,
      error
    );
    throw error;
  }
};

export const fetchMovieReviews = async (movieId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${movieId}/reviews`
    );
    return response.data.results;
  } catch (error) {
    console.error(
      `Error fetching reviews for movie ID ${movieId}:`,
      error
    );
    throw error;
  }
};

export { IMAGE_BASE_URL };
