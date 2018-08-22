import { StyleSheet } from 'react-native';

/**
 * Application wide theme settings
 */
export const theme = {
  color: '#3e7e00',
};

export default StyleSheet.create({
  tabBarTheme: {
    backgroundColor: theme.color,
    paddingTop: 15, // Don't go under status bar
  },
});
