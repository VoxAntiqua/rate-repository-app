import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';

const useCurrentUser = ({ includeReviews }) => {
  const { data, loading, error } = useQuery(ME, {
    variables: { includeReviews },
    fetchPolicy: 'cache-and-network',
  });

  const user = data ? data.me : null;
  return { user, loading, error };
};

export default useCurrentUser;
