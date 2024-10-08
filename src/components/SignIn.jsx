import { TextInput, View, StyleSheet, Pressable } from 'react-native';
import { Formik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import Text from './Text';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

export const SignInContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
      }) => (
        <View style={styles.container}>
          {touched.username && errors.username && (
            <Text color="error">{errors.username}</Text>
          )}
          <TextInput
            style={[
              styles.input,
              touched.username && errors.username ? styles.inputError : null,
            ]}
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            value={values.username}
            placeholder="Username"
            placeholderTextColor={theme.colors.textSecondary}
          />
          {touched.password && errors.password && (
            <Text color="error">{errors.password}</Text>
          )}
          <TextInput
            style={[
              styles.input,
              touched.password && errors.password ? styles.inputError : null,
            ]}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            secureTextEntry
            placeholder="Password"
            placeholderTextColor={theme.colors.textSecondary}
          />
          <Pressable onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Sign in</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const result = await signIn({ username, password });
      console.log('Sign-in result:', result); // Log the entire result object
      navigate('/');
    } catch (e) {
      if (e.networkError) {
        console.log('Network error:', e.networkError);
      } else if (e.graphQLErrors) {
        console.log('GraphQL errors:', e.graphQLErrors);
      } else {
        console.log('Other error:', e);
      }
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: theme.colors.mainBackground,
    flex: 1,
  },
  input: {
    height: 50,
    borderColor: theme.colors.textSecondary,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: theme.fontSize.body,
    color: theme.colors.textPrimary,
    backgroundColor: theme.colors.itemBackground,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  button: {
    height: 50,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.appBarText,
    fontSize: theme.fontSize.subheading,
    fontWeight: theme.fontWeights.bold,
  },
});

export default SignIn;
