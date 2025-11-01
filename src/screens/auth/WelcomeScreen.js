import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button';
import { colors, spacing, typography } from '../../utils/theme';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={[colors.background, colors.secondary, colors.primary]}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.emoji}>🎬</Text>
            <Text style={styles.title}>Welcome to</Text>
            <Text style={styles.appName}>Movie Explorer</Text>
            <Text style={styles.subtitle}>
              Discover trending movies, explore genres, and build your personal
              watchlist
            </Text>
          </View>

          <View style={styles.buttons}>
            <Button
              title="Get Started"
              onPress={() => navigation.navigate('Signup')}
              style={styles.primaryButton}
            />
            <Button
              title="Login"
              variant="outline"
              onPress={() => navigation.navigate('Login')}
              style={styles.secondaryButton}
            />
          </View>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl * 2,
    paddingBottom: spacing.xxl,
  },
  header: {
    alignItems: 'center',
  },
  emoji: {
    fontSize: 100,
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h2,
    fontSize: 28,
    marginBottom: spacing.sm,
  },
  appName: {
    ...typography.h1,
    fontSize: 42,
    fontWeight: 'bold',
    color: colors.accent,
    marginBottom: spacing.md,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: spacing.md,
  },
  buttons: {
    width: '100%',
  },
  primaryButton: {
    marginBottom: spacing.md,
  },
  secondaryButton: {
    marginTop: spacing.sm,
  },
});

export default WelcomeScreen;

