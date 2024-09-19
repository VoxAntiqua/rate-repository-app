import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';
import useCurrentUser from '../hooks/useCurrentUser';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Text from './Text';

import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    display: 'flex',
    flexDirection: 'row',
  },
  signOutButton: {
    padding: 10,
  },
});

const AppBar = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const { user, loading, error } = useCurrentUser({ includeReviews: false });

  if (loading) return null;
  if (error) {
    console.error('Error fetching user data:', error);
    return null;
  }

  const handleSignOut = async () => {
    try {
      await authStorage.removeAccessToken();
      await apolloClient.resetStore();
    } catch (e) {
      console.error('Sign out error:', e);
    }
  };

  const isLoggedIn = Boolean(user);

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab label="Repositories" linkTo="/" />
        {isLoggedIn ? (
          <>
            <AppBarTab label="Create a review" linkTo="review" />
            <AppBarTab label="My reviews" linkTo="myReviews" />
            <Pressable style={styles.signOutButton} onPress={handleSignOut}>
              <Text color="appBar" fontWeight="bold" fontSize="subheading">
                Sign out
              </Text>
            </Pressable>
          </>
        ) : (
          <>
            <AppBarTab label="Sign in" linkTo="/signin" />
            <AppBarTab label="Sign up" linkTo="/signup" />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
