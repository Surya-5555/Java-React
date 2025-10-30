import { useEffect, useState } from 'react'
import { getMoodTrends } from '../services/analytics'

export default function Analytics(){
  const [data, setData] = useState({})
  const [error, setError] = useState('')

  useEffect(()=>{
    getMoodTrends().then(setData).catch(e=> setError(e.message))
  },[])

  const entries = Object.entries(data)

  return (
    <div className="card p-6">
      <h2 className="text-lg font-semibold mb-4">Mood trends</h2>
      {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
      {entries.length === 0 && <div className="muted">No mood data to analyze yet.</div>}
      {entries.length > 0 && (
        <div className="space-y-3">
          {entries.map(([mood, count]) => (
            <div key={mood} className="flex items-center gap-3">
              <div className="w-28 font-medium">{mood}</div>
              <div className="flex-1 h-3 bar-track rounded">
                <div className="h-3 rounded bar-fill" style={{ width: `${Math.min(100, (count / Math.max(...entries.map(e=>e[1]))) * 100)}%` }} />
              </div>
              <div className="w-10 text-right text-sm">{count}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}


