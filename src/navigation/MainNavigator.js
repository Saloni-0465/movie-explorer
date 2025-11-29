import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/theme';

import SplashScreen from '../screens/auth/SplashScreen';
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import ProfileSetupScreen from '../screens/auth/ProfileSetupScreen';

import DiscoverScreen from '../screens/main/DiscoverScreen';
import SearchScreen from '../screens/main/SearchScreen';
import FavoritesScreen from '../screens/main/FavoritesScreen';
import ProfileScreen from '../screens/main/ProfileScreen';

import MovieDetailScreen from '../screens/detail/MovieDetailScreen';
import WatchlistScreen from '../screens/detail/WatchlistScreen';
import PrivacySecurityScreen from '../screens/main/PrivacySecurityScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
    <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
  </Stack.Navigator>
);

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Discover') {
          iconName = focused ? 'film' : 'film-outline';
        } else if (route.name === 'Search') {
          iconName = focused ? 'search' : 'search-outline';
        } else if (route.name === 'Favorites') {
          iconName = focused ? 'star' : 'star-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: colors.accent,
      tabBarInactiveTintColor: colors.textSecondary,
      tabBarStyle: {
        backgroundColor: colors.surface,
        borderTopColor: colors.border,
        borderTopWidth: 1,
        paddingBottom: 8,
        paddingTop: 8,
        height: 60,
      },
      headerStyle: {
        backgroundColor: colors.background,
        borderBottomColor: colors.border,
        borderBottomWidth: 1,
      },
      headerTintColor: colors.text,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    })}
  >
    <Tab.Screen
      name="Discover"
      component={DiscoverScreen}
      options={{ headerTitle: '🎬 Discover' }}
    />
    <Tab.Screen
      name="Search"
      component={SearchScreen}
      options={{ headerTitle: '🔍 Search' }}
    />
    <Tab.Screen
      name="Favorites"
      component={FavoritesScreen}
      options={{ headerTitle: '⭐ Favorites' }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{ headerTitle: '👤 Profile' }}
    />
  </Tab.Navigator>
);

const MainNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const hasCompletedOnboarding = useSelector(
    (state) => state.auth.hasCompletedOnboarding
  );

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated || !hasCompletedOnboarding ? (
        <Stack.Screen name="Auth" component={AuthStack} />
      ) : (
        <>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen
            name="MovieDetail"
            component={MovieDetailScreen}
            options={{
              headerShown: true,
              headerStyle: { backgroundColor: colors.background },
              headerTintColor: colors.text,
              title: 'Movie Details',
            }}
          />
          <Stack.Screen
            name="Watchlist"
            component={WatchlistScreen}
            options={{
              headerShown: true,
              headerStyle: { backgroundColor: colors.background },
              headerTintColor: colors.text,
              title: 'My Watchlist',
            }}
          />
          <Stack.Screen
            name="PrivacySecurity"
            component={PrivacySecurityScreen}
            options={{
              headerShown: true,
              headerStyle: { backgroundColor: colors.background },
              headerTintColor: colors.text,
              title: 'Privacy & Security',
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default MainNavigator;

