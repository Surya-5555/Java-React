import api from './api'

export const getRecommendations = () => api.get('/api/recommendations', { auth: false })


