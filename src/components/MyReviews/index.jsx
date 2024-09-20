import { FlatList, View, StyleSheet } from 'react-native';
import useCurrentUser from '../../hooks/useCurrentUser';
import ReviewItem from './ReviewItem';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.itemBackground,
  },
  separator: {
    height: 10,
  },
});

const MyReviews = () => {
  const { user, loading, error, refetch } = useCurrentUser({
    includeReviews: true,
  });

  if (loading) return null;
  if (error) {
    console.error('Error fetching user data:', error);
    return null;
  }

  const reviewNodes = user.reviews
    ? user.reviews.edges.map((edge) => edge.node)
    : [];

  const ItemSeparator = () => <View style={styles.separator} />;

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem item={item} refetch={refetch} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default MyReviews;
