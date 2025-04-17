import axios from 'axios';

const API_KEY = '567ce59573ca5c3d96b4d4c85770d133';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

axios.defaults.headers.common['Authorization'] = `Bearer ${API_KEY}`;

export const fetchTrendingMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/trending/movie/day`);
    return response.data.results;
  } catch (error) {