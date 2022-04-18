import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Auth from './views/Auth/Auth';
import Map from './views/Map/Map';
import Resource from './views/Resource/Resource';

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
        <Route path="/resourceform">
          <Resource />
        </Route>
        <Route>
          <
        </Route>
      </Switch>
      <Header />
    </BrowserRouter>
  );
}
