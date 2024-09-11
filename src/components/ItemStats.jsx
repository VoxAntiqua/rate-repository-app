import { View, StyleSheet } from 'react-native';
import ItemStat from './ItemStat';

const ItemStats = ({
  forksCount,
  stargazersCount,
  ratingAverage,
  reviewCount,
}) => {
  const style = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: 15,
      justifyContent: 'space-around',
    },
  });

  return (
    <View style={style.container}>
      <ItemStat statName={'Stars'} statValue={stargazersCount} />
      <ItemStat statName={'Forks'} statValue={forksCount} />
      <ItemStat statName={'Reviews'} statValue={reviewCount} />
      <ItemStat statName={'Rating'} statValue={ratingAverage} />
    </View>
  );
};

export default ItemStats;
