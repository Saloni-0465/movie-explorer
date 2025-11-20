# Movie Explorer App 🎬

A beautiful React Native mobile application for discovering, exploring, and managing your favorite movies and TV shows.

## Features

- 🔐 **Authentication**: Sign up, login, and profile setup
- 🎯 **Personalization**: Select favorite genres for personalized recommendations
- 🔍 **Discovery**: Browse trending movies and TV shows
- 🔎 **Search**: Search movies, actors, and genres
- ⭐ **Favorites**: Save your favorite movies
- 📽️ **Watchlist**: Create a personal watchlist
- 👤 **Profile**: Manage your account and preferences

## Tech Stack

- **React Native** with Expo
- **React Navigation** for navigation
- **Redux Toolkit** for state management
- **TMDB API** for movie data
- **AsyncStorage** for local data persistence
- **Expo Linear Gradient** for beautiful gradients
- **Ionicons** for icons

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd movie-explorer
```

2. Install dependencies
```bash
npm install
```

3. **Set up TMDB API Key** (Required for movie data)
   - Get your free API key from [TMDB](https://www.themoviedb.org/settings/api)
   - Open `src/services/tmdbApi.js`
   - Replace `YOUR_TMDB_API_KEY` with your actual API key
   - See [TMDB_SETUP.md](./TMDB_SETUP.md) for detailed instructions

4. Start the development server
```bash
npm start
```

5. Run on iOS/Android
```bash
npm run ios
# or
npm run android
```

## Project Structure

```
movie-explorer/
├── App.js                 # Main app entry point
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Button.js
│   │   ├── Input.js
│   │   └── MovieCard.js
│   ├── navigation/        # Navigation configuration
│   │   └── MainNavigator.js
│   ├── screens/          # Screen components
│   │   ├── auth/         # Authentication screens
│   │   ├── main/         # Main tab screens
│   │   └── detail/       # Detail screens
│   ├── services/         # API services
│   │   └── tmdbApi.js    # TMDB API integration
│   ├── store/            # Redux store
│   │   ├── store.js
│   │   └── slices/       # Redux slices
│   └── utils/            # Utilities
│       ├── theme.js
│       └── storage.js
├── TMDB_SETUP.md         # TMDB API setup guide
└── package.json
```

## Screens

### Authentication
- Splash Screen
- Welcome Screen
- Login Screen
- Signup Screen
- Profile Setup Screen

### Main Tabs
- Discover Tab
- Search Tab
- Favorites Tab
- Profile Tab

### Detail Screens
- Movie Detail Screen
- Watchlist Screen

## State Management

The app uses Redux Toolkit for state management with two main slices:
- `authSlice`: Handles authentication and user data
- `movieSlice`: Handles movies, favorites, and watchlist

## Styling

The app uses a consistent theme system with:
- Color palette
- Typography scales
- Spacing system
- Border radius values

All defined in `src/utils/theme.js`

## TMDB API Integration

✅ **Completed**: The app now integrates with TMDB API for real movie data:
- Trending movies in Discover screen
- Real-time movie search
- Full movie details with cast, genres, and trailers
- High-quality movie posters and backdrops

See [TMDB_SETUP.md](./TMDB_SETUP.md) for setup instructions.

## Future Enhancements

- Firebase/Supabase backend integration
- Push notifications
- Social sharing
- Movie reviews and ratings
- Advanced filtering and sorting
- Trailer playback integration
- Movie recommendations based on user preferences

## License

MIT

