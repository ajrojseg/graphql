const accessTokenKey = 'accessToken';

export const login = async (email, password) => {
  const response = await fetch('http://localhost:9000/login', {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({email, password})
  });
  if (response.ok) {
    const { token }  = await response.json();
    localStorage.setItem(accessTokenKey, token);
  }
  return response.ok;
}

export const isLoggedIn = () => {
  return !!localStorage.getItem(accessTokenKey);
}

export const logout = () => {
  localStorage.removeItem(accessTokenKey);
}

export const getAccessToken = () => {
  return localStorage.getItem(accessTokenKey);
}