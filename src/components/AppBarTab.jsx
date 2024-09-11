import { Pressable, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

const AppBarTab = ({ label }) => {
  return (
    <Pressable style={styles.container}>
      <Text color="appBar" fontWeight="bold" fontSize="subheading">
        {label}
      </Text>
    </Pressable>
  );
};

export default AppBarTab;
