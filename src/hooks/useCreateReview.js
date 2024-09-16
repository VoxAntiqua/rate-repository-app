import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
  const [mutate, { data, error, loading }] = useMutation(CREATE_REVIEW);

  const createReview = async ({ ownerName, repositoryName, rating, text }) => {
    try {
      const response = await mutate({
        variables: {
          ownerName,
          repositoryName,
          rating: Number(rating),
          text,
        },
      });
      return response;
    } catch (e) {
      console.error('Error creating review:', e);
      throw e;
    }
  };

  return { createReview, data, error, loading };
};

export default useCreateReview;
