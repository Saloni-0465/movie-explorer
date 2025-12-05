import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Provider, useDispatch } from 'react-redux';
import { store } from './src/store/store';
import MainNavigator from './src/navigation/MainNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, ActivityIndicator } from 'react-native';
import { loadPersistedState } from './src/store/persistence';
import { login, logout, setOnboardingComplete } from './src/store/slices/authSlice';
import { addToFavorites, addToWatchlist } from './src/store/slices/movieSlice';
import { colors } from './src/utils/theme';

const AppContent = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const persistedState = await loadPersistedState();

        if (persistedState?.auth?.uid) {
          dispatch(
            login({
              uid: persistedState.auth.uid,
              email: persistedState.auth.email,
              name: persistedState.auth.name,
              favoriteGenres: persistedState.auth.favoriteGenres || [],
            })
          );
          if (persistedState.auth.hasCompletedOnboarding) {
            dispatch(setOnboardingComplete());
          }
        } else {
          dispatch(logout());
        }

        if (persistedState?.movie) {
          if (Array.isArray(persistedState.movie.favorites)) {
            persistedState.movie.favorites.forEach((movie) => dispatch(addToFavorites(movie)));
          }
          if (Array.isArray(persistedState.movie.watchlist)) {
            persistedState.movie.watchlist.forEach((movie) => dispatch(addToWatchlist(movie)));
          }
        }
      } catch (error) {
        console.error('Error loading persisted state:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  return <MainNavigator />;
};

export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <NavigationContainer>
            <StatusBar style="light" />
            <AppContent />
          </NavigationContainer>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}
