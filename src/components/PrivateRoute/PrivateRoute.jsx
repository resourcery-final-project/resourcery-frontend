import { Redirect, Route, useLocation } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

export default function PrivateRoute({ children, ...routeProps }) {
  const { user, loading } = useUser();
  const location = useLocation();

  if (loading) return <h2>Loading...</h2>;

  return (
    <Route {...routeProps}>
      {user.username ? (
        children
      ) : (
        <Redirect to={{ pathname: '/signin', state: { from: location } }} />
      )}
    </Route>
  );
}
