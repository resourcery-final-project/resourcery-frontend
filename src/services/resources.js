export async function createResource(formState) {
  const res = await fetch(`${process.env.API_URL}/api/v1/resources`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    mode: 'cors',
    body: JSON.stringify(formState),
  });

  if (!res.ok)
    throw new Error('Please make sure all necessary fields are filled out.');

  return res.json();
}
