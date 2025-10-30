import api from './api'

export const getMoodTrends = () => api.get('/api/analytics/mood-trends', { auth: true })


