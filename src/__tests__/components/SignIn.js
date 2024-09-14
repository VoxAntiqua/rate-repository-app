import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // render SignInContainer component, fill text inputs, press submit button

      await waitFor(() => {
        // expect onSubmit function to have been called once and with a correct first argument
      });
    });
  });
});
