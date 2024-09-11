import { Text as NativeText, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSize.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorTextSecondary: { color: theme.colors.textSecondary },
  colorPrimary: { color: theme.colors.colorPrimary },
  colorTextAppBar: { color: theme.colors.appBarText },
  colorError: { color: theme.colors.error },
  fontSizeSubheading: { fontSize: theme.fontSize.subheading },
  fontWeightBold: { fontWeight: theme.fontWeights.bold },
});

const Text = ({ color, fontSize, fontWeight, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    color === 'appBar' && styles.colorTextAppBar,
    color === 'error' && styles.colorError,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontWeight === 'bold' && styles.fontWeightBold,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;
