import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInContainer } from '../../components/SignIn';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // mock onSubmit function
      const onSubmit = jest.fn();

      // render SignInContainer
      const { getByPlaceholderText, getByText } = render(
        <SignInContainer onSubmit={onSubmit} />
      );

      // find input fields and submit button
      const usernameInput = getByPlaceholderText('Username');
      const passwordInput = getByPlaceholderText('Password');
      const submitButton = getByText('Sign in');

      // simulate user input
      fireEvent.changeText(usernameInput, 'testuser');
      fireEvent.changeText(passwordInput, 'testpassword');

      // simulate form submission
      fireEvent.press(submitButton);

      await waitFor(() => {
        // check if onSubmit was called with correct first argument
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'testuser',
          password: 'testpassword',
        });
      });
    });
  });
});
