import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { colors } from '../../utils/theme';

const TrailerWebViewScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { videoKey, movieTitle } = route.params || {};
  const [opening, setOpening] = useState(true);

  useEffect(() => {
    const openTrailer = async () => {
      if (!videoKey) {
        navigation.goBack();
        return;
      }

      try {
        setOpening(true);
        const watchUrl = `https://www.youtube.com/watch?v=${videoKey}`;
        
        await WebBrowser.openBrowserAsync(watchUrl, {
          presentationStyle: WebBrowser.WebBrowserPresentationStyle.FULLSCREEN,
          controlsColor: colors.accent,
          toolbarColor: colors.surface,
          enableBarCollapsing: false,
          showTitle: true,
          enableDefaultShare: false,
        });
        
        setOpening(false);
        navigation.goBack();
      } catch (error) {
        setOpening(false);
        setTimeout(() => navigation.goBack(), 500);
      }
    };

    openTrailer();
  }, [videoKey, navigation]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setOpening(false);
      };
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="close" size={28} color={colors.text} />
        </TouchableOpacity>
        {movieTitle && (
          <View style={styles.titleContainer}>
            <Ionicons name="film-outline" size={20} color={colors.textSecondary} />
            <View style={styles.titleTextContainer}>
              <Text style={styles.titleText} numberOfLines={1}>
                {movieTitle}
              </Text>
            </View>
          </View>
        )}
      </View>
      {opening && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.accent} />
          <Text style={styles.loadingText}>Opening trailer...</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  closeButton: {
    padding: 8,
    marginRight: 8,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleTextContainer: {
    flex: 1,
    marginLeft: 8,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.textSecondary,
  },
});

export default TrailerWebViewScreen;

