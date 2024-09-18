import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { Link } from 'react-router-native';
import { Menu, Button, PaperProvider } from 'react-native-paper';
import { useState } from 'react';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  menuButtonContainer: {
    alignItems: 'center',
    margin: 10,
  },
  menuButton: {
    height: 50,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    color: theme.colors.appBarText,
    fontSize: theme.fontSize.subheading,
    fontWeight: theme.fontWeights.bold,
  },
  menuContainer: {
    backgroundColor: theme.colors.itemBackground,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const [visible, setVisible] = useState(false);
  const [order, setOrder] = useState('latest');

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const getOrderLabel = (order) => {
    switch (order) {
      case 'latest':
        return 'Latest';
      case 'ratingDescending':
        return 'Rating (descending)';
      case 'ratingAscending':
        return 'Rating (ascending)';
      default:
        return 'Latest';
    }
  };

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <PaperProvider>
      <FlatList
        ListHeaderComponent={
          <View>
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <Button
                  onPress={openMenu}
                  mode="contained"
                  style={styles.menuButton}
                  labelStyle={styles.buttonText}
                >
                  Order by: {getOrderLabel(order)}
                </Button>
              }
              contentStyle={styles.menuContainer}
            >
              <Menu.Item
                onPress={() => {
                  setOrder('latest');
                  closeMenu();
                }}
                title="Latest"
              />
              <Menu.Item
                onPress={() => {
                  setOrder('ratingDescending');
                  closeMenu();
                }}
                title="Rating (descending)"
              />
              <Menu.Item
                onPress={() => {
                  setOrder('ratingAscending');
                  closeMenu();
                }}
                title="Rating (ascending)"
              />
            </Menu>
          </View>
        }
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <Pressable>
            <Link to={`/repository/${item.id}`}>
              <RepositoryItem item={item} />
            </Link>
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
      />
    </PaperProvider>
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;
