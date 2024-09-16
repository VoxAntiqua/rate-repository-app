import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { Pressable, StyleSheet, View, Linking, FlatList } from 'react-native';
import Text from '../Text';
import { GET_REPOSITORY } from '../../graphql/queries';
import theme from '../../theme';
import RepositoryItem from '../RepositoryItem';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 5,
    marginBottom: 20,
    marginHorizontal: 20,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.appBarText,
    fontSize: theme.fontSize.subheading,
    fontWeight: theme.fontWeights.bold,
  },
  container: {
    backgroundColor: theme.colors.itemBackground,
  },
  separator: {
    height: 10,
  },
});

const RepositoryInfo = ({ repository }) => {
  const handleOpenGitHub = () => {
    if (repository.url) {
      Linking.openURL(repository.url);
    }
  };

  return (
    <>
      <RepositoryItem item={repository} />
      <View style={styles.container}>
        <Pressable style={styles.button} onPress={handleOpenGitHub}>
          <Text style={styles.buttonText}>Open in GitHub</Text>
        </Pressable>
      </View>
    </>
  );
};

const SingleRepository = () => {
  const { repositoryId } = useParams();
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return <Text>loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const repository = data?.repository;
  const reviewNodes = repository.reviews
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  const ItemSeparator = () => <View style={styles.separator} />;

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem item={item} />}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={() => (
        <>
          <RepositoryInfo repository={repository} />
          <ItemSeparator />
        </>
      )}
    />
  );
};

export default SingleRepository;
