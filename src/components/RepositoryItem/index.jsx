import { View, StyleSheet, Image } from 'react-native';
import theme from '../../theme';
import ItemHeader from './ItemHeader';
import ItemStats from './ItemStats';

const RepositoryItem = ({ item }) => {
  const style = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.itemBackground,
    },
    languageContainer: {
      backgroundColor: theme.colors.primary,
      borderRadius: 5,
      alignSelf: 'baseline',
      marginTop: 10,
    },
    logo: {
      width: 60,
      height: 60,
      borderRadius: 5,
      margin: 20,
    },
    flexboxRow: {
      display: 'flex',
      flexDirection: 'row',
      gap: 0,
    },
  });

  return (
    <View style={style.container}>
      <View style={style.flexboxRow}>
        <Image style={style.logo} source={{ uri: item.ownerAvatarUrl }} />
        <ItemHeader
          fullName={item.fullName}
          description={item.description}
          language={item.language}
        />
      </View>

      <ItemStats
        stargazersCount={item.stargazersCount}
        forksCount={item.forksCount}
        reviewCount={item.reviewCount}
        ratingAverage={item.ratingAverage}
      />
    </View>
  );
};

export default RepositoryItem;
