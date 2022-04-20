import { useHistory } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { signIn, signUp } from '../../services/users';
import AuthForm from '../../components/AuthForm/AuthForm';

export default function Auth({ isSigningUp = false }) {
  const { user, setUser } = useUser();
  const history = useHistory();

  async function handleAuth(username, password) {
    try {
      if (isSigningUp) {
        const data = await signUp(username, password);
        console.log(data);
        setUser({ id: data.user.id, username: data.user.username });
        history.replace('/');
      } else {
        const data = await signIn(username, password);
        setUser({ id: data.user.id, username: data.user.username });
        history.replace('/');
      }
    } catch (error) {
      throw error;
    }
  }

  return (
    <div>
      <h1>resourcery</h1>
      <AuthForm handleAuth={handleAuth} isSigningUp={isSigningUp} />
    </div>
  );
}
