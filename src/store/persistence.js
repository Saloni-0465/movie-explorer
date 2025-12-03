import { storage, StorageKeys } from '../utils/storage';

export const loadPersistedState = async () => {
  try {
    const [authData, favorites, watchlist] = await Promise.all([
      storage.getItem(StorageKeys.USER_DATA),
      storage.getItem(StorageKeys.FAVORITES),
      storage.getItem(StorageKeys.WATCHLIST),
    ]);

    return {
      auth: authData || {
        user: null,
        uid: null,
        isAuthenticated: false,
        hasCompletedOnboarding: false,
      },
      movie: {
        favorites: favorites || [],
        watchlist: watchlist || [],
        trendingMovies: [],
        searchResults: [],
      },
    };
  } catch (error) {
    console.error('Error loading persisted state:', error);
    return null;
  }
};

export const persistenceMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();

  if (action.type?.startsWith('auth/')) {
    if (action.type === 'auth/login' || action.type === 'auth/updateProfile') {
      storage.setItem(StorageKeys.USER_DATA, {
        user: state.auth.user,
        uid: state.auth.uid,
        isAuthenticated: state.auth.isAuthenticated,
        hasCompletedOnboarding: state.auth.hasCompletedOnboarding,
      });
    } else if (action.type === 'auth/logout') {
      storage.removeItem(StorageKeys.USER_DATA);
      storage.removeItem(StorageKeys.FAVORITES);
      storage.removeItem(StorageKeys.WATCHLIST);
    } else if (action.type === 'auth/setOnboardingComplete') {
      storage.setItem(StorageKeys.USER_DATA, {
        user: state.auth.user,
        uid: state.auth.uid,
        isAuthenticated: state.auth.isAuthenticated,
        hasCompletedOnboarding: true,
      });
    }
  }

  if (
    action.type === 'movie/addToFavorites' ||
    action.type === 'movie/removeFromFavorites'
  ) {
    storage.setItem(StorageKeys.FAVORITES, state.movie.favorites);
  }

  if (
    action.type === 'movie/addToWatchlist' ||
    action.type === 'movie/removeFromWatchlist'
  ) {
    storage.setItem(StorageKeys.WATCHLIST, state.movie.watchlist);
  }

  return result;
};

