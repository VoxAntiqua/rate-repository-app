import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';

const useCurrentUser = ({ includeReviews }) => {
  const { data, loading, error, refetch } = useQuery(ME, {
    variables: { includeReviews },
    fetchPolicy: 'cache-and-network',
  });

  const user = data ? data.me : null;
  return { user, loading, error, refetch };
};

export default useCurrentUser;
