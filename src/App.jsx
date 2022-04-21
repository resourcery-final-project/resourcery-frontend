import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Header from './components/Header/Header';
import Auth from './views/Auth/Auth';
import Map from './views/Map/Map';
import Resource from './views/Resource/Resource';
import ResourceDetail from './views/ResourceDetail/ResourceDetail';
import List from './views/ResourceList/ResourceList';
import UserProfile from './views/UserProfile/UserProfile';
import { useUser } from './context/UserContext';

export default function App() {
  const { user } = useUser();

  return (
    <div>
    <BrowserRouter>
      <Switch>
        <Route path="/signin">
          <Auth />
        </Route>
        <Route path="/signup">
          <Auth isSigningUp />
        </Route>
        <PrivateRoute exact path="/">
          <Map />
        </PrivateRoute>
        <PrivateRoute path="/create-resource">
          <Resource isCreating />
        </PrivateRoute>
        <PrivateRoute path="/update-resource/:id">
          <Resource />
        </PrivateRoute>
        <PrivateRoute path="/resource/:id">
          <ResourceDetail />
        </PrivateRoute>
        <PrivateRoute path="/user">
          <UserProfile />
        </PrivateRoute>
        <PrivateRoute path="/list">
          <List />
        </PrivateRoute>
      </Switch>
      {user.username && <Header />}
    </BrowserRouter>
    </div>
  );
}
