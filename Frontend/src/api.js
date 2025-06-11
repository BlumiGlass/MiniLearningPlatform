export async function loginRequest(userId) {
  try {
    const response = await fetch(`http://localhost:5065/api/users/${userId}`);
    if (!response.ok) throw new Error('Login failed with status ' + response.status);
    const data = await response.json();
    return data;
  } catch (err) {
    if(err.message.includes('404')) {
      return { status: 'notfound' };
    }
    return { status: 'error', message: err.message };
  }
}

export async function signupRequest(userObj) {
  try {
    const response = await fetch('http://localhost:5065/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userObj)
    });
    if (!response.ok) throw new Error('Signup failed with status ' + response.status);
    const data = await response.json();
    return data;
  } catch (err) {
    return { status: 'error', message: err.message };
  }
}