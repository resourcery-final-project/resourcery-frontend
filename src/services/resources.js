export async function createResource(formState, userId) {
  const res = await fetch(`${process.env.API_URL}/api/v1/resources`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    mode: 'cors',
    body: JSON.stringify({ formState, userId }),
  });

  if (!res.ok)
    throw new Error('Please make sure all necessary fields are filled out.');

  return res.json();
}
