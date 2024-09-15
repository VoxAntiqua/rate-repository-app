import { TextInput, View, StyleSheet, Pressable } from 'react-native';
import { Formik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import Text from './Text';

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(5, 'Username must be at least 5 characters')
    .max(30, 'Username must be at most 30 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters')
    .max(50, 'Password must be at most 50 characters'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
});

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ username: '', password: '', confirmPassword: '' }}
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
          {touched.confirmPassword && errors.confirmPassword && (
            <Text color="error">{errors.confirmPassword}</Text>
          )}
          <TextInput
            style={[
              styles.input,
              touched.confirmPassword && errors.confirmPassword
                ? styles.inputError
                : null,
            ]}
            onChangeText={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            value={values.confirmPassword}
            secureTextEntry
            placeholder="Password confirmation"
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

const SignUp = () => {
  const onSubmit = (values) => {
    console.log('Sign up form submitted with values:', values);
  };

  return <SignUpContainer onSubmit={onSubmit} />;
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

export default SignUp;
