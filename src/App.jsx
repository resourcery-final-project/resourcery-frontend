import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Auth from './views/Auth/Auth';
import Map from './views/Map/Map';
import Resource from './views/Resource/Resource';
import ResourceDetail from './views/ResourceDetail/ResourceDetail';
import List from './views/ResourceList/ResourceList';
import UserProfile from './views/UserProfile/UserProfile';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signin">
          <Auth />
        </Route>
        <Route path="/signup">
          <Auth isSigningUp />
        </Route>
        <Route exact path="/">
          <Map />
        </Route>
        <Route path="/create-resource">
          <Resource isCreating />
        </Route>
        <Route path="/update-resource">
          <Resource />
        </Route>
        <Route path="/resource/:id">
          <ResourceDetail />
        </Route>
        <Route path="/user">
          <UserProfile />
        </Route>
        <Route path="/list">
          <List />
        </Route>
      </Switch>
      <Header />
    </BrowserRouter>
  );
}
