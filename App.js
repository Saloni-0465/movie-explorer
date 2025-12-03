import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Provider, useDispatch } from 'react-redux';
import { store } from './src/store/store';
import MainNavigator from './src/navigation/MainNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, ActivityIndicator } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/services/firebase';
import { getUserData } from './src/services/authService';
import { loadPersistedState } from './src/store/persistence';
import { login, logout, setOnboardingComplete } from './src/store/slices/authSlice';
import { addToFavorites, addToWatchlist } from './src/store/slices/movieSlice';
import { colors } from './src/utils/theme';

const AppContent = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const userData = await getUserData(firebaseUser.uid);
          if (userData) {
            dispatch(
              login({
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                name: userData.name || firebaseUser.displayName || firebaseUser.email?.split('@')[0],
                favoriteGenres: userData.favoriteGenres || [],
              })
            );
            if (userData.hasCompletedOnboarding) {
              dispatch(setOnboardingComplete());
            }
          }
        } else {
          dispatch(logout());
        }

        const persistedState = await loadPersistedState();
        if (persistedState) {
          if (persistedState.movie.favorites?.length > 0) {
            persistedState.movie.favorites.forEach((movie) => {
              dispatch(addToFavorites(movie));
            });
          }

          if (persistedState.movie.watchlist?.length > 0) {
            persistedState.movie.watchlist.forEach((movie) => {
              dispatch(addToWatchlist(movie));
            });
          }
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
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

