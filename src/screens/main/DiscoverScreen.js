import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import MovieCard from '../../components/MovieCard';
import { colors, spacing, typography } from '../../utils/theme';
import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../store/slices/movieSlice';

// Mock data for trending movies (replace with TMDB API)
const mockTrendingMovies = [
  {
    id: 1,
    title: 'Inception',
    release_date: '2010-07-16',
    poster_path: '/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    vote_average: 8.8,
  },
  {
    id: 2,
    title: 'The Dark Knight',
    release_date: '2008-07-18',
    poster_path: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    vote_average: 9.0,
  },
  {
    id: 3,
    title: 'Interstellar',
    release_date: '2014-11-07',
    poster_path: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    vote_average: 8.6,
  },
  {
    id: 4,
    title: 'Pulp Fiction',
    release_date: '1994-10-14',
    poster_path: '/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
    vote_average: 8.9,
  },
  {
    id: 5,
    title: 'The Matrix',
    release_date: '1999-03-31',
    poster_path: '/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
    vote_average: 8.7,
  },
  {
    id: 6,
    title: 'Fight Club',
    release_date: '1999-10-15',
    poster_path: '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
    vote_average: 8.8,
  },
];

const DiscoverScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.movie.favorites);
  const [movies, setMovies] = useState(mockTrendingMovies);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('trending');

  useEffect(() => {
    // In real app, fetch from TMDB API here
    setMovies(mockTrendingMovies);
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleMoviePress = (movie) => {
    navigation.navigate('MovieDetail', { movie });
  };

  const handleFavoritePress = (movie) => {
    const isFavorite = favorites.some((fav) => fav.id === movie.id);
    if (isFavorite) {
      dispatch(removeFromFavorites(movie.id));
    } else {
      dispatch(addToFavorites(movie));
    }
  };

  const renderMovie = ({ item }) => {
    const isFavorite = favorites.some((fav) => fav.id === item.id);
    return (
      <MovieCard
        movie={item}
        onPress={() => handleMoviePress(item)}
        onFavoritePress={() => handleFavoritePress(item)}
        isFavorite={isFavorite}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.sectionTitle}>Trending Now 🔥</Text>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => {
            // Navigate to filters screen
          }}
        >
          <Ionicons name="filter-outline" size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={movies}
        renderItem={renderMovie}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.accent}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="film-outline" size={64} color={colors.textSecondary} />
            <Text style={styles.emptyText}>No movies found</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  sectionTitle: {
    ...typography.h2,
    fontSize: 24,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
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
    paddingVertical: spacing.xxl * 2,
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
});

export default DiscoverScreen;

