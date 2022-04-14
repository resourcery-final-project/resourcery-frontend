import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Auth from './views/Auth/Auth';

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
      </Switch>
    </BrowserRouter>
  );
}
