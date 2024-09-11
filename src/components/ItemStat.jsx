import { View, StyleSheet } from 'react-native';
import Text from './Text';

const ItemStat = ({ statName, statValue }) => {
  const style = StyleSheet.create({
    container: {
      display: 'flex',
      alignItems: 'center',
      gap: 5,
    },
  });

  return (
    <View style={style.container}>
      <Text fontWeight="bold">{statValue}</Text>
      <Text color="textSecondary">{statName}</Text>
    </View>
  );
};

export default ItemStat;
