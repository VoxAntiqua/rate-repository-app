import { View, StyleSheet, Pressable, Alert } from 'react-native';
import Text from '../Text';
import theme from '../../theme';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-native';
import useDeleteReview from '../../hooks/useDeleteReview';

const ReviewItem = ({ item, refetch }) => {
  const style = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.itemBackground,
      display: 'flex',
      flexDirection: 'row',
      paddingVertical: 10,
    },
    textContainer: {
      marginVertical: 10,
      marginEnd: 15,
      flexShrink: 1,
    },
    scoreContainer: {
      width: 60,
      height: 60,
      borderRadius: 30,
      borderWidth: 4,
      borderColor: theme.colors.primary,
      margin: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    scoreStyle: {
      color: theme.colors.primary,
    },
    textSpacing: {
      marginBottom: 5,
    },
    buttonsContainer: {
      display: 'flex',
      flexDirection: 'row',
      gap: 20,
      paddingHorizontal: 20,
      paddingBottom: 20,
      backgroundColor: theme.colors.itemBackground,
    },
    buttonLeft: {
      height: 50,
      borderRadius: 5,
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      flexGrow: 1,
      flexBasis: 1,
    },
    buttonRight: {
      height: 50,
      borderRadius: 5,
      backgroundColor: theme.colors.error,
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      flexGrow: 1,
      flexBasis: 1,
    },
    buttonText: {
      color: theme.colors.appBarText,
      fontSize: theme.fontSize.subheading,
      fontWeight: theme.fontWeights.bold,
    },
  });

  const navigate = useNavigate();
  const [deleteReview] = useDeleteReview();

  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await deleteReview({ id: reviewId });
      console.log('Delete review response:', response);
      refetch();
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

  const deleteAlert = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('cancel pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => handleDeleteReview(item.id) },
      ]
    );
  };

  return (
    <View>
      <View style={style.container}>
        <View style={style.scoreContainer}>
          <Text
            style={style.scoreStyle}
            fontSize="subheading"
            fontWeight="bold"
          >
            {item.rating}
          </Text>
        </View>
        <View style={style.textContainer}>
          <Text
            fontWeight="bold"
            fontSize="subheading"
            style={style.textSpacing}
          >
            {item.repository.fullName}
          </Text>
          <Text color="textSecondary" style={style.textSpacing}>
            {format(new Date(item.createdAt), 'PP')}
          </Text>
          <Text>{item.text}</Text>
        </View>
      </View>
      <View style={style.buttonsContainer}>
        <Pressable
          style={style.buttonLeft}
          onPress={() => {
            navigate(`/repository/${item.repositoryId}`);
          }}
        >
          <Text style={style.buttonText}>View repository</Text>
        </Pressable>
        <Pressable style={style.buttonRight} onPress={deleteAlert}>
          <Text style={style.buttonText}>Delete review</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ReviewItem;
