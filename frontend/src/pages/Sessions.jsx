import { useEffect, useState } from 'react'
import { getSessions, scheduleSession } from '../services/sessions'

export default function Sessions(){
  const [list, setList] = useState([])
  const [form, setForm] = useState({ scheduledAt: '', notes: '' })
  const [error, setError] = useState('')

  async function load(){
    try{ setList(await getSessions()) }catch(e){ setError(e.message) }
  }
  useEffect(()=>{ load() },[])

  function change(e){ setForm({ ...form, [e.target.name]: e.target.value }) }

  async function submit(e){
    e.preventDefault()
    setError('')
    try{
      await scheduleSession(form)
      setForm({ scheduledAt:'', notes:'' })
      await load()
    }catch(e){ setError(e.message) }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <section className="card p-6">
        <h2 className="text-xl font-semibold mb-4">Schedule a session</h2>
        {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="label">Scheduled at</label>
            <input type="datetime-local" name="scheduledAt" value={form.scheduledAt} onChange={change} className="input" />
          </div>
          <div>
            <label className="label">Notes</label>
            <textarea name="notes" value={form.notes} onChange={change} rows={3} className="input" placeholder="Optional notes" />
          </div>
          <button className="btn" type="submit">Save</button>
        </form>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-3">Upcoming sessions</h2>
        <div className="space-y-3">
          {list.map(s => (
            <div key={s.id} className="card p-4">
              <div className="font-medium">Session</div>
              {s.notes && <div className="text-sm muted">{s.notes}</div>}
              {s.scheduledAt && <div className="text-xs muted-weak mt-1">{new Date(s.scheduledAt).toLocaleString()}</div>}
            </div>
          ))}
          {list.length === 0 && <div className="muted">No sessions yet. Schedule one.</div>}
        </div>
      </section>
    </div>
  )
}


