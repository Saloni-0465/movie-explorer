import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography } from '../../utils/theme';

const SplashScreen = () => {
  return (
    <LinearGradient
      colors={[colors.background, colors.secondary]}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.logo}>🎬</Text>
        <Text style={styles.title}>Movie Explorer</Text>
        <Text style={styles.subtitle}>Discover Your Next Favorite Film</Text>
      </View>
      <ActivityIndicator size="large" color={colors.accent} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  logo: {
    fontSize: 80,
    marginBottom: spacing.md,
  },
  title: {
    ...typography.h1,
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
});

export default SplashScreen;

