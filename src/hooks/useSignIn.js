import { useMutation } from '@apollo/client';
import { SIGN_IN } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';
import { useApolloClient } from '@apollo/client';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, { data, error, loading }] = useMutation(SIGN_IN);

  const signIn = async ({ username, password }) => {
    try {
      const result = await mutate({ variables: { username, password } });
      const { data } = result;

      console.log('Mutation response data:', data); // Log the data for debugging

      if (data?.authenticate?.accessToken) {
        await authStorage.setAccessToken(data.authenticate.accessToken);
        await apolloClient.resetStore();
      }

      return result; // Return the result object, which includes data
    } catch (e) {
      console.error('Sign-in error:', e);
      throw e; // Re-throw error to be handled by calling code
    }
  };

  return [signIn, { data, error, loading }];
};

export default useSignIn;
