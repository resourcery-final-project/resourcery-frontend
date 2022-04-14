export async function getUser() {
  try {
    const res = await fetch(`${process.env.API_URL}/api/v1/users/current`, {
      credentials: 'include',
    });
    return res.json();
  } catch (error) {
    return null;
  }
}

export async function signIn({ username, password }) {
  const res = await fetch(`${process.env.API_URL}/api/v1/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    mode: 'cors',
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) throw new Error('Invalid username/password');

  return res.json();
}

export async function signOut() {
  const res = await fetch(`${process.env.API_URL}/api/v1/users`, {
    method: 'DELETE',
    credentials: 'include',
    mode: 'cors',
  });

  return res.ok;
}
