import {
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Formik } from 'formik';
import theme from '../theme';

const SignIn = () => {
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            value={values.username}
            placeholder="Username"
            placeholderTextColor={theme.colors.textSecondary}
          />
          <TextInput
            style={styles.input}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            secureTextEntry
            placeholder="Password"
            placeholderTextColor={theme.colors.textSecondary}
          />
          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
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
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: theme.fontSize.body,
    color: theme.colors.textPrimary,
    backgroundColor: theme.colors.itemBackground,
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
