import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import Button from '../../components/Button';
import { colors, spacing, typography, borderRadius } from '../../utils/theme';
import { setOnboardingComplete, updateProfile } from '../../store/slices/authSlice';

const genres = [
  'Action', 'Adventure', 'Animation', 'Comedy', 'Crime',
  'Documentary', 'Drama', 'Family', 'Fantasy', 'History',
  'Horror', 'Music', 'Mystery', 'Romance', 'Science Fiction',
  'Thriller', 'War', 'Western',
];

const ProfileSetupScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selectedGenres, setSelectedGenres] = useState([]);

  const toggleGenre = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleComplete = () => {
    dispatch(updateProfile({ favoriteGenres: selectedGenres }));
    dispatch(setOnboardingComplete());
    // Navigation will be handled by MainNavigator
  };

  return (
    <LinearGradient
      colors={[colors.background, colors.secondary]}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.emoji}>🎯</Text>
          <Text style={styles.title}>Choose Your Favorites</Text>
          <Text style={styles.subtitle}>
            Select genres you love to get personalized recommendations
          </Text>
        </View>

        <View style={styles.genresContainer}>
          {genres.map((genre) => {
            const isSelected = selectedGenres.includes(genre);
            return (
              <TouchableOpacity
                key={genre}
                style={[
                  styles.genreChip,
                  isSelected && styles.genreChipSelected,
                ]}
                onPress={() => toggleGenre(genre)}
              >
                <Text
                  style={[
                    styles.genreText,
                    isSelected && styles.genreTextSelected,
                  ]}
                >
                  {genre}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.footer}>
          <Text style={styles.hint}>
            {selectedGenres.length > 0
              ? `${selectedGenres.length} genre(s) selected`
              : 'Select at least one genre to continue'}
          </Text>
          <Button
            title="Continue"
            onPress={handleComplete}
            disabled={selectedGenres.length === 0}
            style={styles.button}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl * 1.5,
    paddingBottom: spacing.xxl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  emoji: {
    fontSize: 80,
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h1,
    fontSize: 28,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: spacing.md,
    lineHeight: 22,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.xxl,
  },
  genreChip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.round,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  genreChipSelected: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  genreText: {
    ...typography.body,
    color: colors.text,
  },
  genreTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  footer: {
    marginTop: spacing.lg,
  },
  hint: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  button: {
    marginTop: spacing.sm,
  },
});

export default ProfileSetupScreen;

