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

const WatchlistScreen = () => {
  const navigation = useNavigation();
  const watchlist = useSelector((state) => state.movie.watchlist);

  const handleMoviePress = (movie) => {
    navigation.navigate('MovieDetail', { movie });
  };

  const renderMovie = ({ item }) => {
    return (
      <MovieCard
        movie={item}
        onPress={() => handleMoviePress(item)}
        isFavorite={false}
      />
    );
  };

  return (
    <View style={styles.container}>
      {watchlist.length > 0 ? (
        <>
          <View style={styles.header}>
            <Text style={styles.countText}>
              {watchlist.length} {watchlist.length === 1 ? 'Movie' : 'Movies'} in Watchlist
            </Text>
          </View>
          <FlatList
            data={watchlist}
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
          <Text style={styles.emoji}>📽️</Text>
          <Text style={styles.emptyTitle}>Your Watchlist is Empty</Text>
          <Text style={styles.emptyText}>
            Start exploring and add movies to your watchlist
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

export default WatchlistScreen;

