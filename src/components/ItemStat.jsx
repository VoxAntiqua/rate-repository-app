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

  // Utility function to format the stat value
  const formatStatValue = (value) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1).replace(/\.0$/, '')}k`;
    }
    return value.toString();
  };

  return (
    <View style={style.container}>
      <Text fontWeight="bold">{formatStatValue(statValue)}</Text>
      <Text color="textSecondary">{statName}</Text>
    </View>
  );
};

export default ItemStat;
