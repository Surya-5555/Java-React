// Use relative path by default so Vite dev proxy can forward to the backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

async function request(path, { method = 'GET', body, auth = false } = {}){
  const headers = { 'Content-Type': 'application/json' }
  if(auth){
    const token = localStorage.getItem('mh_token')
    if(token){
      headers['Authorization'] = `Bearer ${token}`
    }
  }
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })
  if(!res.ok){
    const text = await res.text().catch(()=> '')
    throw new Error(text || `Request failed: ${res.status}`)
  }
  const contentType = res.headers.get('content-type') || ''
  if(contentType.includes('application/json')){
    return res.json()
  }
  return res.text()
}

export default {
  get: (path, opts={}) => request(path, { ...opts, method: 'GET' }),
  post: (path, body, opts={}) => request(path, { ...opts, method: 'POST', body }),
  put: (path, body, opts={}) => request(path, { ...opts, method: 'PUT', body }),
  del: (path, opts={}) => request(path, { ...opts, method: 'DELETE' }),
}


