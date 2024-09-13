import { RepositoryListContainer } from '../../components/RepositoryList';
import { render, screen, within } from '@testing-library/react-native';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      render(<RepositoryListContainer repositories={repositories} />);

      // repository names
      expect(screen.getByText('jaredpalmer/formik')).toBeDefined();
      expect(screen.getByText('async-library/react-async')).toBeDefined();

      // descriptions
      expect(
        screen.getByText('Build forms in React, without the tears')
      ).toBeDefined();
      expect(
        screen.getByText('Flexible promise-based React data loader')
      ).toBeDefined();

      // languages
      expect(screen.getByText('TypeScript')).toBeDefined();
      expect(screen.getByText('JavaScript')).toBeDefined();

      // fork counts
      expect(screen.getByText('1.6k')).toBeDefined(); // Format of 1619
      expect(screen.getByText('69')).toBeDefined();

      // star counts
      expect(screen.getByText('21.9k')).toBeDefined(); // Format of 21856
      expect(screen.getByText('1.8k')).toBeDefined(); // Format of 1760

      // rating averages
      expect(screen.getByText('88')).toBeDefined();
      expect(screen.getByText('72')).toBeDefined();

      screen.debug();

      // review counts
      const reviewCountViews = screen.getAllByTestId('Reviews');
      const [firstReviewCountView, secondReviewCountView] = reviewCountViews;
      expect(within(firstReviewCountView).getByText('3')).toBeDefined();
      expect(within(secondReviewCountView).getByText('3')).toBeDefined();
    });
  });
});
