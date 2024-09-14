import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import RepositoryItem from './RepositoryItem';
import Text from './Text';
import { GET_REPOSITORY } from '../graphql/queries';

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

  return (
    <>
      <RepositoryItem item={repository} />
      <Text>single repository view</Text>
    </>
  );
};

export default SingleRepository;
