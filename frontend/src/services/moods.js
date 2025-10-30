import api from './api'

export const getMoods = () => api.get('/api/moods', { auth: true })
export const createMood = (payload) => api.post('/api/moods', payload, { auth: true })
export const updateMood = (id, payload) => api.put(`/api/moods/${id}`, payload, { auth: true })
export const deleteMood = (id) => api.del(`/api/moods/${id}`, { auth: true })


