import { useForm } from '../../hooks/useForm';

export default function AuthForm({ handleAuth, isSigningUp }) {
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

<<<<<<< HEAD
  return (
    <form>
=======
import { useForm } from '../../hooks/useForm';
import styles from '../../App.module.css'

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
>>>>>>> 67b186999a79f6d8e4e2adaf461b8a5d7ef62b1b
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
        {isSigningUp ? 'Register' : 'Sign In'}
      </button>
    </form>
  );
<<<<<<< HEAD
}
=======

>>>>>>> 67b186999a79f6d8e4e2adaf461b8a5d7ef62b1b
