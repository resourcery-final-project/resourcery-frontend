import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Auth from './Auth';
import { UserProvider } from '../../context/UserContext';

test('testing login', async () => {
  render(
    <MemoryRouter>
      <UserProvider>
        <Auth />
      </UserProvider>
    </MemoryRouter>
  );

  const username = await screen.findByPlaceholderText('username');
  userEvent.type(username, 'mock');

  const password = await screen.findByPlaceholderText('password');
  userEvent.type(password, 'user');

  const button = await screen.findByRole('button');
  userEvent.click(button);
});
