import { View, StyleSheet, ScrollView } from 'react-native';

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
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab label="Repositories" linkTo="/" />
        <AppBarTab label="Sign in" linkTo="/signin" />
      </ScrollView>
    </View>
  );
};

export default AppBar;
