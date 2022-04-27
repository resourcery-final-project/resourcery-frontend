export async function getUser() {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/api/v1/users/current`,
      {
        credentials: 'include',
      }
    );
    return res.json();
  } catch (error) {
    return null;
  }
}

export async function signIn(username, password) {
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/users/session`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify({ username, password }),
    }
  );

  if (!res.ok) throw new Error('Invalid username/password');

  return res.json();
}

export async function signUp(username, password) {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    mode: 'cors',
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok)
    throw new Error('This username is taken, please choose another.');

  return res.json();
}

export async function signOut() {
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/users/session`,
    {
      method: 'DELETE',
      credentials: 'include',
      mode: 'cors',
    }
  );

  if (!res.ok) throw new Error('Unable to sign out.');

  return res.ok;
}
