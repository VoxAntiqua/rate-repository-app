import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';

const useDeleteReview = () => {
  const [mutate, { data, error, loading }] = useMutation(DELETE_REVIEW);

  const deleteReview = async ({ id }) => {
    try {
      const response = await mutate({
        variables: {
          id,
        },
      });
      return response;
    } catch (e) {
      console.error('Error deleting review', e);
      throw e;
    }
  };

  return [deleteReview, { data, error, loading }];
};

export default useDeleteReview;
