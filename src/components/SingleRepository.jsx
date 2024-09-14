import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import RepositoryItem from './RepositoryItem';
import { Pressable, StyleSheet, View, Linking } from 'react-native';
import Text from './Text';
import { GET_REPOSITORY } from '../graphql/queries';
import theme from '../theme';

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 5,
    marginBottom: 15,
    marginHorizontal: 15,
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
});

const SingleRepository = () => {
  const { repositoryId } = useParams();
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId },
  });

  if (loading) {
    return <Text>loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const repository = data?.repository;

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

export default SingleRepository;
