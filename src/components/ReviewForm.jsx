import { StyleSheet, View, TextInput, Pressable } from 'react-native';
import { Formik } from 'formik';
import Text from './Text';
import theme from '../theme';
import * as yup from 'yup';

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

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner's username is required"),
  repositoryName: yup.string().required("Repository's name is required"),
  rating: yup
    .number()
    .required('Rating is required')
    .min(0, 'Rating must be at least 0')
    .max(100, 'Rating cannot exceed 100'),
  review: yup.string().optional(),
});

const ReviewFormContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        ownerName: '',
        repositoryName: '',
        rating: '',
        review: '',
      }}
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
          {touched.ownerName && errors.ownerName && (
            <Text color="error">{errors.ownerName}</Text>
          )}
          <TextInput
            style={[
              styles.input,
              touched.ownerName && errors.ownerName ? styles.inputError : null,
            ]}
            onChangeText={handleChange('ownerName')}
            onBlur={handleBlur('ownerName')}
            value={values.ownerName}
            placeholder="Repository owner's username"
            placeholderTextColor={theme.colors.textSecondary}
          />

          {touched.repositoryName && errors.repositoryName && (
            <Text color="error">{errors.repositoryName}</Text>
          )}
          <TextInput
            style={[
              styles.input,
              touched.repositoryName && errors.repositoryName
                ? styles.inputError
                : null,
            ]}
            onChangeText={handleChange('repositoryName')}
            onBlur={handleBlur('repositoryName')}
            value={values.repositoryName}
            placeholder="Repository's name"
            placeholderTextColor={theme.colors.textSecondary}
          />

          {touched.rating && errors.rating && (
            <Text color="error">{errors.rating}</Text>
          )}
          <TextInput
            style={[
              styles.input,
              touched.rating && errors.rating ? styles.inputError : null,
            ]}
            onChangeText={handleChange('rating')}
            onBlur={handleBlur('rating')}
            value={values.rating}
            placeholder="Rating (0-100)"
            placeholderTextColor={theme.colors.textSecondary}
            keyboardType="numeric"
          />

          {touched.review && errors.review && (
            <Text color="error">{errors.review}</Text>
          )}
          <TextInput
            style={styles.input}
            onChangeText={handleChange('review')}
            onBlur={handleBlur('review')}
            value={values.review}
            placeholder="Review"
            placeholderTextColor={theme.colors.textSecondary}
            multiline
          />

          <Pressable onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Create Review</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

const ReviewForm = () => {
  const onSubmit = (values) => {
    console.log('Review form submitted with values:', values);
  };
  return <ReviewFormContainer onSubmit={onSubmit} />;
};

export default ReviewForm;
