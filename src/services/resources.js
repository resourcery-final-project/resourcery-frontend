export async function createResource(formState) {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/resources`, {
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

export async function getAllResources() {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/resources`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    mode: 'cors',
  });

  if (!res.ok) throw new Error('Unable to get all the resources');

  return res.json();
}
