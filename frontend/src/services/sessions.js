import api from './api'

export const getSessions = () => api.get('/api/sessions', { auth: true })
// payload should be { scheduledAt: string(ISO or yyyy-MM-ddTHH:mm), notes?: string }
export const scheduleSession = (payload) => api.post('/api/sessions', payload, { auth: true })


