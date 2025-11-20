const API_KEY = 'b47d9500193dd317ac6048c054861e37';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const IMAGE_SIZES = {
  poster: {
    small: 'w185',
    medium: 'w342',
    large: 'w500',
    original: 'original',
  },
  backdrop: {
    small: 'w300',
    medium: 'w780',
    large: 'w1280',
    original: 'original',
  },
  profile: {
    small: 'w45',
    medium: 'w185',
    large: 'w632',
    original: 'original',
  },
};

export const getImageUrl = (path, type = 'poster', size = 'medium') => {
  if (!path) return null;
  const sizeKey = IMAGE_SIZES[type]?.[size] || IMAGE_SIZES[type].medium;
  return `${IMAGE_BASE_URL}/${sizeKey}${path}`;
};

const apiRequest = async (endpoint, params = {}) => {
  const queryParams = new URLSearchParams({
    api_key: API_KEY,
    ...params,
  });

  const url = `${BASE_URL}${endpoint}?${queryParams.toString()}`;
  const response = await fetch(url);

  if (!response.ok) {
    let errorMessage = `API Error: ${response.status}`;
    try {
      const errorData = await response.json();
      if (errorData.status_message) {
        errorMessage = errorData.status_message;
      }
    } catch (e) {
      // ignore
    }
    throw new Error(errorMessage);
  }

  return await response.json();
};

export const getTrendingMovies = async (timeWindow = 'day', page = 1) => {
  const data = await apiRequest(`/trending/movie/${timeWindow}`, { page });
  return data.results || [];
};

export const searchMovies = async (query, page = 1) => {
  if (!query || query.trim().length < 1) {
    return [];
  }
  const data = await apiRequest('/search/movie', {
    query: query.trim(),
    page,
    include_adult: false,
  });
  return data.results || [];
};

export const getMovieDetails = async (movieId) => {
  return await apiRequest(`/movie/${movieId}`, {
    append_to_response: 'credits,videos',
  });
};

export const getPopularMovies = async (page = 1) => {
  const data = await apiRequest('/movie/popular', { page });
  return data.results || [];
};

export const getTopRatedMovies = async (page = 1) => {
  const data = await apiRequest('/movie/top_rated', { page });
  return data.results || [];
};

export const getUpcomingMovies = async (page = 1) => {
  const data = await apiRequest('/movie/upcoming', { page });
  return data.results || [];
};

export const getMovieGenres = async () => {
  const data = await apiRequest('/genre/movie/list');
  return data.genres || [];
};

export const getMoviesByGenre = async (genreId, page = 1) => {
  const data = await apiRequest('/discover/movie', {
    with_genres: genreId,
    page,
  });
  return data.results || [];
};

export const getMovieRecommendations = async (movieId, page = 1) => {
  const data = await apiRequest(`/movie/${movieId}/recommendations`, { page });
  return data.results || [];
};

