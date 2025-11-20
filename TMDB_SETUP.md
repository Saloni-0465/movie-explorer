# TMDB API Setup Guide

This app uses The Movie Database (TMDB) API to fetch real movie data. Follow these steps to set up your API key.

## Step 1: Get Your TMDB API Key

1. Go to [TMDB Website](https://www.themoviedb.org/)
2. Create a free account or sign in
3. Navigate to [API Settings](https://www.themoviedb.org/settings/api)
4. Click "Request an API Key"
5. Select "Developer" as the type
6. Fill out the application form:
   - **Application name**: `Movie Explorer` (or any name you prefer)
   - **Application URL**: For development, you can use any of these:
     - `http://localhost` (most common for development)
     - `http://localhost:19000` (if using Expo)
     - `exp://localhost:19000` (Expo protocol)
     - `com.movieexplorer.app` (your app bundle identifier)
     - Any placeholder like `mobile-app` or `react-native-app`
     - **Note**: TMDB doesn't strictly validate this for mobile apps, so any valid URL format works
   - **Application summary**: Brief description like "A React Native mobile app for discovering and managing favorite movies"
7. Accept the terms and submit
8. Copy your API key (it will look like: `abc123def456ghi789jkl012mno345pq`)

## Step 2: Add API Key to Your App

1. Open `src/services/tmdbApi.js`
2. Find the line: `const API_KEY = 'YOUR_TMDB_API_KEY';`
3. Replace `'YOUR_TMDB_API_KEY'` with your actual API key:
   ```javascript
   const API_KEY = 'abc123def456ghi789jkl012mno345pq';
   ```

## Step 3: Test the Integration

1. Start your app: `npm start`
2. Navigate to the Discover screen
3. You should see trending movies loading from TMDB
4. Try searching for movies in the Search screen
5. Click on a movie to see full details

## Important Notes

- **No domain required**: For mobile app development, you don't need a real domain. Use `http://localhost` or any placeholder URL
- **API key approval**: TMDB usually approves API keys quickly (often instantly for developer accounts)
- **Free tier**: The API is free with generous rate limits for personal/development use

## Troubleshooting

### Error: "Failed to load movies. Please check your API key."

- Make sure you've replaced `YOUR_TMDB_API_KEY` with your actual key
- Verify your API key is correct (no extra spaces or quotes)
- Check that your API key is active in your TMDB account settings

### No movies showing up

- Check your internet connection
- Verify the API key is correctly set in `src/services/tmdbApi.js`
- Check the console for any error messages
- Make sure you're using a valid API key (not expired or revoked)

### API Rate Limits

TMDB API has rate limits:
- 40 requests per 10 seconds
- The app includes debouncing in search to help stay within limits

If you hit rate limits, wait a few seconds and try again.

## API Features Used

The app uses the following TMDB API endpoints:
- `/trending/movie/day` - Get trending movies
- `/search/movie` - Search for movies
- `/movie/{id}` - Get detailed movie information (with credits and videos)
- Image URLs for posters, backdrops, and profile pictures

## Additional Resources

- [TMDB API Documentation](https://developers.themoviedb.org/3)
- [TMDB API Support](https://www.themoviedb.org/talk)

