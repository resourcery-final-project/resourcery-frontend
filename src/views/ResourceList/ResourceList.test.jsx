import {
  screen,
  render,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import ResourceList from './ResourceList';
import { UserProvider } from '../../context/UserContext';

const mockUser = {
  id: 1,
  username: 'mock',
  password: 'user',
};

const data = [
  {
    title: 'All Saints Episcopal Church',
    address: '4033 SE Woodstock Blvd. Portland, OR 97202',
    phone: 'Main Line: 503-777-3829',
    description: 'Hot meals.',
    hours: 'Hours: 11:30 a.m. Sat.',
    type: 'Ready To Eat',
  },
  {
    title: 'Blanchet House of Hospitality',
    address: '310 NW Glisan St. Portland, OR 97209',
    phone: 'Main Line: 503-241-4340',
    description: 'Free hot meals. No questions asked.',
    hours:
      'Hours: 6:30-7:30 a.m. (breakfast), 11:30 a.m. -12:30 p.m. (lunch), 5-6 p.m. (dinner) Mon.- Sat.',
    type: 'Ready To Eat',
  },
  {
    title: 'Zachs Slop Shack',
    address: '310 Fake St.',
    phone: 'Main Line: 333-333-333',
    description: 'Free hot meals. Some questions asked.',
    hours:
      'Hours: 6:30-7:30 a.m. (breakfast), 11:30 a.m. -12:30 p.m. (lunch), 5-6 p.m. (dinner) Mon.- Sat.',
    type: 'Fruit Tree',
  },
];

const server = setupServer(
  rest.get(`${process.env.API_URL}/api/v1/resources`, (req, res, ctx) => {
    return res(ctx.json(data));
  }),
  rest.get(`${process.env.API_URL}/api/v1/users/session`, (req, res, ctx) => {
    return res(ctx.json(mockUser));
  })
);

beforeAll(() => server.listen());

afterAll(() => server.close());

test('testing that resources show up on the list page', async () => {
  render(
    <UserProvider mockUser={mockUser}>
      <ResourceList />
    </UserProvider>
  );
  const loading = await screen.findByText(/loading/i);
  await screen.waitForElementToBeRemoved(loading);
  const resource = await screen.findByRole('link', {
    name: /Blanchet House/i,
  });
});
