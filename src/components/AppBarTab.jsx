import { Pressable, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

const AppBarTab = ({ label, linkTo }) => {
  return (
    <Pressable style={styles.container}>
      <Link to={linkTo}>
        <Text color="appBar" fontWeight="bold" fontSize="subheading">
          {label}
        </Text>
      </Link>
    </Pressable>
  );
};

export default AppBarTab;
