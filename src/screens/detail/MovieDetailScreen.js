import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../../components/Button';
import { colors, spacing, typography, borderRadius } from '../../utils/theme';
import { addToFavorites, removeFromFavorites, addToWatchlist, removeFromWatchlist } from '../../store/slices/movieSlice';
import { getMovieDetails, getImageUrl } from '../../services/tmdbApi';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const MovieDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { movie: initialMovie } = route.params || {};
  
  const favorites = useSelector((state) => state.movie.favorites);
  const watchlist = useSelector((state) => state.movie.watchlist);
  
  const [movie, setMovie] = useState(initialMovie);
  const [loading, setLoading] = useState(!!initialMovie?.id);
  const [error, setError] = useState(null);
  
  const isFavorite = favorites.some((fav) => fav.id === movie?.id);
  const isInWatchlist = watchlist.some((item) => item.id === movie?.id);

  useEffect(() => {
    if (initialMovie?.id) {
      loadMovieDetails();
    }
  }, [initialMovie?.id]);

  const loadMovieDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getMovieDetails(initialMovie.id);
      setMovie(data);
    } catch (err) {
      console.error('Error loading movie details:', err);
      setError('Failed to load movie details');
    } finally {
      setLoading(false);
    }
  };

  if (!initialMovie && !movie) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Movie not found</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.accent} />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>
    );
  }

  if (error && !movie) {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={64} color={colors.error} />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadMovieDetails}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const imageUrl = movie?.poster_path
    ? getImageUrl(movie.poster_path, 'poster', 'large')
    : null;

  const backdropUrl = movie?.backdrop_path
    ? getImageUrl(movie.backdrop_path, 'backdrop', 'large')
    : null;

  const handleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(movie.id));
    } else {
      dispatch(addToFavorites(movie));
    }
  };

  const handleWatchlist = () => {
    if (isInWatchlist) {
      dispatch(removeFromWatchlist(movie.id));
    } else {
      dispatch(addToWatchlist(movie));
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {backdropUrl ? (
        <Image source={{ uri: backdropUrl }} style={styles.backdrop} />
      ) : (
        <View style={styles.backdropPlaceholder}>
          <Ionicons name="film-outline" size={64} color={colors.textSecondary} />
        </View>
      )}
      <LinearGradient
        colors={['transparent', colors.background]}
        style={styles.gradient}
      />

      <View style={styles.content}>
        <View style={styles.posterContainer}>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.poster} />
          ) : (
            <View style={styles.posterPlaceholder}>
              <Ionicons name="film-outline" size={48} color={colors.textSecondary} />
            </View>
          )}
        </View>

        <View style={styles.info}>
          <Text style={styles.title}>{movie.title || movie.name}</Text>
          
          <View style={styles.metaRow}>
            {movie.release_date && (
              <View style={styles.metaItem}>
                <Ionicons name="calendar-outline" size={16} color={colors.textSecondary} />
                <Text style={styles.metaText}>
                  {new Date(movie.release_date || movie.first_air_date).getFullYear()}
                </Text>
              </View>
            )}
            {movie.vote_average && (
              <View style={styles.metaItem}>
                <Ionicons name="star" size={16} color="#ffd700" />
                <Text style={styles.metaText}>{movie.vote_average.toFixed(1)}</Text>
              </View>
            )}
            {movie.runtime && (
              <View style={styles.metaItem}>
                <Ionicons name="time-outline" size={16} color={colors.textSecondary} />
                <Text style={styles.metaText}>{movie.runtime} min</Text>
              </View>
            )}
          </View>

          {movie.genres && movie.genres.length > 0 && (
            <View style={styles.genresContainer}>
              {movie.genres.map((genre) => (
                <View key={genre.id || genre} style={styles.genreTag}>
                  <Text style={styles.genreText}>{genre.name || genre}</Text>
                </View>
              ))}
            </View>
          )}

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.iconButton, isFavorite && styles.iconButtonActive]}
              onPress={handleFavorite}
            >
              <Ionicons
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={24}
                color={isFavorite ? colors.accent : colors.text}
              />
              <Text style={[styles.iconButtonText, isFavorite && styles.iconButtonTextActive]}>
                {isFavorite ? 'Favorited' : 'Favorite'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.iconButton, isInWatchlist && styles.iconButtonActive]}
              onPress={handleWatchlist}
            >
              <Ionicons
                name={isInWatchlist ? 'bookmark' : 'bookmark-outline'}
                size={24}
                color={isInWatchlist ? colors.accent : colors.text}
              />
              <Text style={[styles.iconButtonText, isInWatchlist && styles.iconButtonTextActive]}>
                {isInWatchlist ? 'In Watchlist' : 'Watchlist'}
              </Text>
            </TouchableOpacity>
          </View>

          {movie.videos?.results && movie.videos.results.length > 0 && (
            <Button
              title="▶ Watch Trailer"
              variant="primary"
              style={styles.trailerButton}
              onPress={() => {
                const trailer = movie.videos.results.find(
                  (video) => video.type === 'Trailer' && video.site === 'YouTube'
                );
                if (trailer) {
                  console.log('Trailer URL:', `https://www.youtube.com/watch?v=${trailer.key}`);
                }
              }}
            />
          )}

          {movie.overview && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Overview</Text>
              <Text style={styles.overview}>{movie.overview}</Text>
            </View>
          )}

          {movie.credits?.cast && movie.credits.cast.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Cast</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {movie.credits.cast.slice(0, 10).map((actor) => (
                  <View key={actor.id} style={styles.castItem}>
                    {actor.profile_path ? (
                      <Image
                        source={{ uri: getImageUrl(actor.profile_path, 'profile', 'medium') }}
                        style={styles.castImage}
                      />
                    ) : (
                      <View style={styles.castPlaceholder}>
                        <Ionicons name="person-outline" size={24} color={colors.textSecondary} />
                      </View>
                    )}
                    <Text style={styles.castName} numberOfLines={2}>{actor.name}</Text>
                    {actor.character && (
                      <Text style={styles.castCharacter} numberOfLines={1}>
                        {actor.character}
                      </Text>
                    )}
                  </View>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backdrop: {
    width: SCREEN_WIDTH,
    height: 300,
    resizeMode: 'cover',
  },
  backdropPlaceholder: {
    width: SCREEN_WIDTH,
    height: 300,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
  },
  content: {
    marginTop: -100,
    paddingHorizontal: spacing.lg,
  },
  posterContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  poster: {
    width: 200,
    height: 300,
    borderRadius: borderRadius.md,
    resizeMode: 'cover',
    borderWidth: 4,
    borderColor: colors.surface,
  },
  posterPlaceholder: {
    width: 200,
    height: 300,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: colors.border,
  },
  info: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.xxl,
  },
  title: {
    ...typography.h1,
    fontSize: 28,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  metaText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  genreTag: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.round,
    backgroundColor: colors.accent + '20',
    borderWidth: 1,
    borderColor: colors.accent,
  },
  genreText: {
    ...typography.caption,
    color: colors.accent,
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  iconButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
  },
  iconButtonActive: {
    backgroundColor: colors.accent + '20',
    borderColor: colors.accent,
  },
  iconButtonText: {
    ...typography.bodySmall,
    color: colors.text,
  },
  iconButtonTextActive: {
    color: colors.accent,
    fontWeight: '600',
  },
  trailerButton: {
    marginBottom: spacing.lg,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: spacing.md,
  },
  overview: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  castItem: {
    marginRight: spacing.md,
    alignItems: 'center',
    width: 80,
  },
  castImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    resizeMode: 'cover',
    marginBottom: spacing.xs,
  },
  castPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
  },
  castName: {
    ...typography.caption,
    textAlign: 'center',
    fontSize: 11,
  },
  errorText: {
    ...typography.body,
    color: colors.error,
    textAlign: 'center',
    marginTop: spacing.xxl,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  retryButton: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.accent,
    borderRadius: 8,
  },
  retryButtonText: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
  castCharacter: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 10,
    textAlign: 'center',
    marginTop: 2,
  },
});

export default MovieDetailScreen;

