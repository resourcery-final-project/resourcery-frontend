import { useHistory } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { signIn, signUp } from '../../services/users';
import AuthForm from '../../components/AuthForm/AuthForm';
import styles from '../../App.module.css';


export default function Auth({ isSigningUp = false }) {
  const { setUser } = useUser();
  const history = useHistory();
  const { title, titleimage } = styles;

  async function handleAuth(username, password) {
    try {
      if (isSigningUp) {
        const data = await signUp(username, password);
        setUser({ id: data.id, username: data.username });
        alert('You have been successfully Signed Up!');
        history.replace('/');
      } else {
        const data = await signIn(username, password);
        setUser({ id: data.user.id, username: data.user.username });
        alert('You have been successfully Signed In!');
        history.replace('/');
      }
    } catch (error) {
      throw error;
    }
  }

  return (
    <div>
      <div className={title}>
        <img className={titleimage} src='/assets/resourcery-logo.png' />
        <h1>resourcery</h1>
      </div>
      <AuthForm handleAuth={handleAuth} isSigningUp={isSigningUp} />
    </div>
  );
}
