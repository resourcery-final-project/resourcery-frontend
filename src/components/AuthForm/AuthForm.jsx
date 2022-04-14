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

  return (
    <form>
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
}