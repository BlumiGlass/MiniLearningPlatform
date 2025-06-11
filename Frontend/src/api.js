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

export async function fetchPromptsHistory(userId) {
  try {
    const response = await fetch(`http://localhost:5065/api/prompts/user/${userId}`);
    if (!response.ok) throw new Error('Failed to fetch history');
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    return [];
  }
}

export async function fetchCategories() {
  try {
    const response = await fetch('http://localhost:5065/api/categories');
    if (!response.ok) throw new Error('Failed to fetch categories');
    return await response.json();
  } catch (err) {
    return [];
  }
}

export async function fetchSubCategories(categoryId) {
  try {
    const response = await fetch(`http://localhost:5065/api/subCategories/${categoryId}`);
    if (!response.ok) throw new Error('Failed to fetch subcategories');
    return await response.json();
  } catch (err) {
    return [];
  }
}

export async function createPrompt({ userId, categoryId, subCategoryId, promptText }) {
  try {
    const response = await fetch('http://localhost:5065/api/prompts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, categoryId, subCategoryId, promptText })
    });
    if (!response.ok) throw new Error('Failed to create prompt');
    return await response.json();
  } catch (err) {
    return { status: 'error', message: err.message };
  }
}