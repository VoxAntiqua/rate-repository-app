import { View, StyleSheet } from 'react-native';
import Text from '../Text';
import theme from '../../theme';
import { format } from 'date-fns';

const ReviewItem = ({ item }) => {
  const style = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.itemBackground,
      display: 'flex',
      flexDirection: 'row',
      paddingVertical: 10,
    },
    textContainer: {
      marginVertical: 10,
      marginEnd: 15,
      flexShrink: 1,
    },
    scoreContainer: {
      width: 60,
      height: 60,
      borderRadius: 30,
      borderWidth: 4,
      borderColor: theme.colors.primary,
      margin: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    scoreStyle: {
      color: theme.colors.primary,
    },
    textSpacing: {
      marginBottom: 5,
    },
  });

  return (
    <View style={style.container}>
      <View style={style.scoreContainer}>
        <Text style={style.scoreStyle} fontSize="subheading" fontWeight="bold">
          {item.rating}
        </Text>
      </View>
      <View style={style.textContainer}>
        <Text fontWeight="bold" fontSize="subheading" style={style.textSpacing}>
          {item.user.username}
        </Text>
        <Text color="textSecondary" style={style.textSpacing}>
          {format(new Date(item.createdAt), 'PP')}
        </Text>
        <Text>{item.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
