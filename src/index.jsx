import { render } from 'react-dom';import App from './App';
import { UserProvider } from './context/UserContext';
import { MarkerProvider } from './context/MarkerContext';

render(
  <React.StrictMode>
    <UserProvider>
      <MarkerProvider>
        <App />
      </MarkerProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
