import api from './api'

export async function login({ username, password }){
  const res = await api.post('/api/auth/login', { username, password })
  return res
}

export async function register({ username, password, fullName }){
  const res = await api.post('/api/auth/register', { username, password, fullName })
  return res
}


