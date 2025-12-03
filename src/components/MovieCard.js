import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, typography } from '../utils/theme';
import { getImageUrl } from '../services/tmdbApi';

const MovieCard = ({ movie, onPress, onFavoritePress, isFavorite = false }) => {
  if (!movie || (!movie.title && !movie.name)) {
    return null;
  }

  const imageUrl = movie.poster_path
    ? getImageUrl(movie.poster_path, 'poster', 'medium')
    : null;

  const title = movie.title || movie.name || 'Untitled';
  const releaseDate = movie.release_date || movie.first_air_date;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Ionicons name="film-outline" size={40} color={colors.textSecondary} />
          </View>
        )}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
        />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={(e) => {
            e.stopPropagation();
            onFavoritePress?.();
          }}
        >
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorite ? colors.accent : '#fff'}
          />
        </TouchableOpacity>
        {movie.vote_average != null && typeof movie.vote_average === 'number' && (
          <View style={styles.rating}>
            <Ionicons name="star" size={14} color="#ffd700" />
            <Text style={styles.ratingText}>{movie.vote_average.toFixed(1)}</Text>
          </View>
        )}
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {String(title)}
        </Text>
        {releaseDate && (
          <Text style={styles.date}>
            {new Date(releaseDate).getFullYear()}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 160,
    marginRight: spacing.md,
  },
  imageContainer: {
    width: '100%',
    height: 240,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
  },
  favoriteButton: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rating: {
    position: 'absolute',
    bottom: spacing.sm,
    left: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  ratingText: {
    ...typography.caption,
    color: '#fff',
    marginLeft: 4,
    fontWeight: '600',
  },
  info: {
    paddingHorizontal: spacing.xs,
  },
  title: {
    ...typography.body,
    fontWeight: '600',
    marginBottom: 4,
  },
  date: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});

export default MovieCard;

