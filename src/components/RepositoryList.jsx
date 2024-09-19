import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { Link } from 'react-router-native';
import { Menu, Button, PaperProvider, Searchbar } from 'react-native-paper';
import { useState } from 'react';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  menuButtonContainer: {
    alignItems: 'center',
    margin: 20,
  },
  menuButton: {
    height: 50,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: theme.colors.appBarText,
    fontSize: theme.fontSize.subheading,
    fontWeight: theme.fontWeights.bold,
  },
  menuContainer: {
    backgroundColor: theme.colors.itemBackground,
  },
  searchbar: {
    backgroundColor: theme.colors.itemBackground,
    height: 50,
    borderRadius: 5,
    margin: 20,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  setOrderBy,
  setOrderDirection,
  searchQuery,
  setSearchQuery,
}) => {
  const [visible, setVisible] = useState(false);
  const [order, setOrder] = useState('latest');

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleOrderSelection = (selectedOrder) => {
    setOrder(selectedOrder);
    switch (selectedOrder) {
      case 'latest':
        setOrderBy('CREATED_AT');
        setOrderDirection('DESC');
        break;
      case 'ratingDescending':
        setOrderBy('RATING_AVERAGE');
        setOrderDirection('DESC');
        break;
      case 'ratingAscending':
        setOrderBy('RATING_AVERAGE');
        setOrderDirection('ASC');
        break;
      default:
        setOrderBy('CREATED_AT');
        setOrderDirection('DESC');
    }
    closeMenu();
  };

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
            <Searchbar
              style={styles.searchbar}
              inputStyle={{ color: theme.colors.textPrimary }}
              placeholder="Filter repositories..."
              placeholderTextColor={theme.colors.textSecondary}
              iconColor={theme.colors.textPrimary}
              value={searchQuery}
              onChangeText={setSearchQuery}
              clearIcon="close"
              onIconPress={() => setSearchQuery('')}
            />
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
                onPress={() => handleOrderSelection('latest')}
                title="Latest"
              />
              <Menu.Item
                onPress={() => handleOrderSelection('ratingDescending')}
                title="Rating (descending)"
              />
              <Menu.Item
                onPress={() => handleOrderSelection('ratingAscending')}
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
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('DESC');
  const [searchQuery, setSearchQuery] = useState('');

  const { repositories } = useRepositories({
    orderBy,
    orderDirection,
    searchKeyword: searchQuery,
  });

  return (
    <RepositoryListContainer
      repositories={repositories}
      setOrderBy={setOrderBy}
      setOrderDirection={setOrderDirection}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
    />
  );
};

export default RepositoryList;
