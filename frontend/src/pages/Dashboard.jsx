import { useEffect, useState } from 'react'
import { getRecommendations } from '../services/recommendations'
import { getMoods } from '../services/moods'

export default function Dashboard(){
  const [recs, setRecs] = useState([])
  const [latestMood, setLatestMood] = useState(null)
  const [error, setError] = useState('')

  useEffect(()=>{
    getRecommendations().then(setRecs).catch(()=>{})
    getMoods().then(list=>{
      setLatestMood(list?.[0] || null)
    }).catch(err=> setError(err.message))
  },[])

  return (
    <div className="space-y-6">
      <section className="card p-8">
        <h1 className="text-3xl font-semibold mb-2">Hello 👋</h1>
        <p className="muted">{latestMood ? `Your latest mood: ${latestMood.mood}` : 'Track your mood to get personalized insights.'}</p>
      </section>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <section>
        <h2 className="text-xl font-semibold mb-4">Wellness recommendations</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {recs.map(r => (
            <div key={r.id} className="card p-5">
              <h3 className="font-medium mb-1">Tip</h3>
              <p className="text-sm muted">{r.text}</p>
            </div>
          ))}
          {recs.length === 0 && (
            <div className="muted">No recommendations available right now.</div>
          )}
        </div>
      </section>
    </div>
  )
}


