import { useHistory } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { useForm } from '../../hooks/useForm';
import { signIn, signUp } from '../../services/users';
import AuthForm from '../../components/AuthForm/AuthForm';

export default function Auth({ isSigningUp = false }) {
  const { setUser } = useUser();
  const history = useHistory();

  const { formState, handleFormChange } = useForm({
    username: '',
    password: '',
  });

  async function handleAuth(username, password) {
    try {
      if (isSigningUp) {
        const data = await signUp(username, password);
        setUser({ id: data.id, username: data.username });
        history.replace('/');
      } else {
        const data = await signIn(username, password);
        setUser({ id: data.id, username: data.username });
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
