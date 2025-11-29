import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius } from '../../utils/theme';

const PrivacySecurityScreen = () => {
  const [dataSharing, setDataSharing] = useState(true);
  const [analytics, setAnalytics] = useState(true);
  const [locationTracking, setLocationTracking] = useState(false);
  const [biometricAuth, setBiometricAuth] = useState(false);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacy Settings</Text>

        <View style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Ionicons name="share-social-outline" size={24} color={colors.text} />
            <View style={styles.menuItemTextContainer}>
              <Text style={styles.menuItemText}>Data Sharing</Text>
              <Text style={styles.menuItemSubtext}>
                Share anonymous usage data
              </Text>
            </View>
          </View>
          <Switch
            value={dataSharing}
            onValueChange={setDataSharing}
            trackColor={{ false: colors.border, true: colors.accent }}
            thumbColor="#fff"
          />
        </View>

        <View style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Ionicons name="analytics-outline" size={24} color={colors.text} />
            <View style={styles.menuItemTextContainer}>
              <Text style={styles.menuItemText}>Analytics</Text>
              <Text style={styles.menuItemSubtext}>
                Track app usage
              </Text>
            </View>
          </View>
          <Switch
            value={analytics}
            onValueChange={setAnalytics}
            trackColor={{ false: colors.border, true: colors.accent }}
            thumbColor="#fff"
          />
        </View>

        <View style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Ionicons name="location-outline" size={24} color={colors.text} />
            <View style={styles.menuItemTextContainer}>
              <Text style={styles.menuItemText}>Location Services</Text>
              <Text style={styles.menuItemSubtext}>
                Location-based recommendations
              </Text>
            </View>
          </View>
          <Switch
            value={locationTracking}
            onValueChange={setLocationTracking}
            trackColor={{ false: colors.border, true: colors.accent }}
            thumbColor="#fff"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Security</Text>

        <View style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Ionicons name="finger-print-outline" size={24} color={colors.text} />
            <View style={styles.menuItemTextContainer}>
              <Text style={styles.menuItemText}>Biometric Authentication</Text>
              <Text style={styles.menuItemSubtext}>
                Fingerprint or face ID
              </Text>
            </View>
          </View>
          <Switch
            value={biometricAuth}
            onValueChange={setBiometricAuth}
            trackColor={{ false: colors.border, true: colors.accent }}
            thumbColor="#fff"
          />
        </View>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Ionicons name="lock-closed-outline" size={24} color={colors.text} />
            <View style={styles.menuItemTextContainer}>
              <Text style={styles.menuItemText}>Change Password</Text>
              <Text style={styles.menuItemSubtext}>
                Update password
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Ionicons name="key-outline" size={24} color={colors.text} />
            <View style={styles.menuItemTextContainer}>
              <Text style={styles.menuItemText}>Two-Factor Authentication</Text>
              <Text style={styles.menuItemSubtext}>
                Extra security layer
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data & Privacy</Text>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Ionicons name="download-outline" size={24} color={colors.text} />
            <View style={styles.menuItemTextContainer}>
              <Text style={styles.menuItemText}>Download Your Data</Text>
              <Text style={styles.menuItemSubtext}>
                Export account data
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Ionicons name="trash-outline" size={24} color={colors.text} />
            <View style={styles.menuItemTextContainer}>
              <Text style={styles.menuItemText}>Clear Cache</Text>
              <Text style={styles.menuItemSubtext}>
                Remove cached files
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.infoSection}>
        <Ionicons name="information-circle-outline" size={24} color={colors.accent} />
        <Text style={styles.infoText}>
          We don't sell your data. It's only used to improve the app.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  section: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemTextContainer: {
    marginLeft: spacing.md,
    flex: 1,
  },
  menuItemText: {
    ...typography.body,
    marginBottom: spacing.xs,
  },
  menuItemSubtext: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    fontSize: 12,
  },
  infoSection: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    marginBottom: spacing.xxl,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginLeft: spacing.sm,
    flex: 1,
    lineHeight: 20,
  },
});

export default PrivacySecurityScreen;

