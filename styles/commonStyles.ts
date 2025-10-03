
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  primary: '#8B5CF6',      // Modern purple (from the logo)
  secondary: '#1E1B4B',    // Deep navy blue (from the logo)
  accent: '#F59E0B',       // Warm amber for highlights
  background: '#FFFFFF',   // Clean white background
  backgroundAlt: '#F8FAFC', // Very light grey background
  backgroundDark: '#0F172A', // Dark background for dark mode
  text: '#1E293B',         // Modern dark grey text
  textLight: '#64748B',    // Light grey text
  textDark: '#F1F5F9',     // Light text for dark backgrounds
  grey: '#E2E8F0',         // Light grey
  card: '#FFFFFF',         // White cards
  cardDark: '#1E293B',     // Dark cards for dark mode
  success: '#10B981',      // Modern green
  error: '#EF4444',        // Modern red
  warning: '#F59E0B',      // Amber warning
  border: '#E2E8F0',       // Light border color
  borderDark: '#334155',   // Dark border color
  shadow: 'rgba(0, 0, 0, 0.1)', // Subtle shadow
};

export const buttonStyles = StyleSheet.create({
  instructionsButton: {
    backgroundColor: colors.primary,
    alignSelf: 'center',
    width: '100%',
  },
  backButton: {
    backgroundColor: colors.backgroundAlt,
    alignSelf: 'center',
    width: '100%',
  },
  dangerButton: {
    backgroundColor: colors.error,
    alignSelf: 'center',
    width: '100%',
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    maxWidth: 800,
    width: '100%',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 18,
    color: colors.textLight,
    marginBottom: 24,
    lineHeight: 26,
  },
  text: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  textLight: {
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 20,
  },
  section: {
    width: '100%',
    marginBottom: 24,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 24,
    marginVertical: 8,
    width: '100%',
    boxShadow: `0px 4px 20px ${colors.shadow}`,
    elevation: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardCompact: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    width: '100%',
    boxShadow: `0px 2px 12px ${colors.shadow}`,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.border,
  },
  input: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.background,
    marginBottom: 16,
    fontWeight: '500',
  },
  inputFocused: {
    borderColor: colors.primary,
    boxShadow: `0px 0px 0px 3px ${colors.primary}20`,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientCard: {
    borderRadius: 16,
    padding: 24,
    marginVertical: 8,
    width: '100%',
  },
  logoContainer: {
    backgroundColor: colors.secondary,
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
    boxShadow: `0px 8px 32px ${colors.primary}40`,
    elevation: 8,
  },
  modernButton: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `0px 4px 16px ${colors.shadow}`,
    elevation: 4,
  },
  dangerZone: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
    borderWidth: 1,
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
  },
});
