import { useForm } from '../../hooks/useForm';
import styles from '../../App.module.css';
import { Link } from 'react-router-dom';

export default function AuthForm({ handleAuth, isSigningUp }) {
  const { form } = styles;
  const { formState, handleFormChange } = useForm({
    username: '',
    password: '',
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const { username, password } = formState;

    try {
      await handleAuth(username, password);
    } catch (error) {
      throw error;
    }
  }

  return (
    <form className={form}>
      <input
        name="username"
        placeholder="username"
        aria-label="username"
        value={formState.username}
        onChange={handleFormChange}
      />
      <input
        name="password"
        placeholder="password"
        aria-label="password"
        value={formState.password}
        onChange={handleFormChange}
      />

      <button onClick={handleSubmit}>
        {isSigningUp ? 'Sign Up' : 'Sign In'}
      </button>
      {isSigningUp ? (
        <>
          <p>Already have an account?</p>
          <Link to="/signin">Sign in</Link>
        </>
      ) : (
        <>
          <p>Don't have an account?</p>
          <Link to="/signup">Sign up</Link>
        </>
      )}
    </form>
  );
}
