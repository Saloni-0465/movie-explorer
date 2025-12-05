# Movie Explorer

React Native app for browsing movies and TV shows. Built with Expo.

## Getting Started

Clone the repo and install dependencies:

```bash
git clone <repository-url>
cd movie-explorer
npm install
```

You'll need a TMDB API key to fetch movie data. Get one from [TMDB](https://www.themoviedb.org/settings/api) and add it to `src/services/tmdbApi.js`. Check `TMDB_SETUP.md` for details.

For Firebase auth, set up your `.env` file with Firebase credentials. See `FIREBASE_SETUP_COMPLETE.md` for instructions.

Run the app:

```bash
npm start
```

Then press `i` for iOS or `a` for Android.

## What's Included

- User authentication with Firebase
- Browse trending movies
- Search movies
- Save favorites and watchlist
- Movie details with trailers
- Profile management

## Tech Used

- React Native / Expo
- React Navigation
- Redux Toolkit
- Firebase (Auth & Firestore)
- TMDB API
- AsyncStorage

## Project Layout

```
src/
├── components/     # Button, Input, MovieCard
├── navigation/     # MainNavigator
├── screens/        # All screen components
│   ├── auth/      # Login, Signup, ProfileSetup
│   ├── main/      # Discover, Search, Favorites, Profile
│   └── detail/     # MovieDetail, Watchlist
├── services/       # Firebase, TMDB API
├── store/          # Redux store and slices
└── utils/          # Theme, storage helpers
```

## License

MIT
