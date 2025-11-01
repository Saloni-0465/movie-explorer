import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import MovieCard from '../../components/MovieCard';
import { colors, spacing, typography } from '../../utils/theme';

const FavoritesScreen = () => {
  const navigation = useNavigation();
  const favorites = useSelector((state) => state.movie.favorites);

  const handleMoviePress = (movie) => {
    navigation.navigate('MovieDetail', { movie });
  };

  const renderMovie = ({ item }) => {
    return (
      <MovieCard
        movie={item}
        onPress={() => handleMoviePress(item)}
        isFavorite={true}
      />
    );
  };

  return (
    <View style={styles.container}>
      {favorites.length > 0 ? (
        <>
          <View style={styles.header}>
            <Text style={styles.countText}>
              {favorites.length} {favorites.length === 1 ? 'Favorite' : 'Favorites'}
            </Text>
          </View>
          <FlatList
            data={favorites}
            renderItem={renderMovie}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={styles.listContent}
            columnWrapperStyle={styles.row}
            showsVerticalScrollIndicator={false}
          />
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emoji}>⭐</Text>
          <Text style={styles.emptyTitle}>No Favorites Yet</Text>
          <Text style={styles.emptyText}>
            Start exploring and add movies to your favorites
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  countText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  row: {
    justifyContent: 'space-between',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  emoji: {
    fontSize: 80,
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    ...typography.h2,
    marginBottom: spacing.sm,
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default FavoritesScreen;

