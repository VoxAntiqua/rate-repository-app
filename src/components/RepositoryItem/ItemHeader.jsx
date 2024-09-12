import { View, StyleSheet } from 'react-native';
import Text from '../Text';
import theme from '../../theme';

const ItemHeader = ({ fullName, description, language }) => {
  const style = StyleSheet.create({
    container: {
      display: 'flex',
      gap: 5,
      marginVertical: 15,
      marginEnd: 15,
      flexShrink: 1,
    },
    textContainer: {
      flexShrink: 1,
    },
    languageContainer: {
      backgroundColor: theme.colors.primary,
      borderRadius: 5,
      alignSelf: 'baseline',
      marginTop: 1,
    },
    languageStyle: {
      color: theme.colors.appBarText,
      padding: 5,
    },
  });

  return (
    <View style={style.container}>
      <Text fontWeight="bold" fontSize="subheading" style={style.textContainer}>
        {fullName}
      </Text>
      <Text color="textSecondary" style={style.textContainer}>
        {description}
      </Text>
      <View style={style.languageContainer}>
        <Text style={style.languageStyle}>{language}</Text>
      </View>
    </View>
  );
};

export default ItemHeader;
