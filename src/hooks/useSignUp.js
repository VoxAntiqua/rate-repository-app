import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';

const useSignUp = () => {
  const [mutate, { data, error, loading }] = useMutation(CREATE_USER);

  const signUp = async ({ username, password }) => {
    try {
      const response = await mutate({
        variables: {
          username,
          password,
        },
      });
      return response;
    } catch (e) {
      console.error('Error creating user', e);
      throw e;
    }
  };

  return [signUp, { data, error, loading }];
};

export default useSignUp;
