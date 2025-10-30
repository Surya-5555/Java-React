import { useEffect, useState } from 'react'
import { getMoods, createMood, updateMood, deleteMood } from '../services/moods'

const MOOD_OPTIONS = ['HAPPY','SAD','NEUTRAL','ANGRY','ANXIOUS','CALM']

export default function Moods(){
  const [list, setList] = useState([])
  const [form, setForm] = useState({ mood: 'NEUTRAL', note: '' })
  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState('')

  async function load(){
    try{
      const data = await getMoods()
      setList(data)
    }catch(e){ setError(e.message) }
  }

  useEffect(()=>{ load() },[])

  function change(e){
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function submit(e){
    e.preventDefault()
    setError('')
    try{
      if(editingId){
        await updateMood(editingId, form)
        setEditingId(null)
      }else{
        await createMood(form)
      }
      setForm({ mood: 'NEUTRAL', note: '' })
      await load()
    }catch(e){ setError(e.message) }
  }

  async function remove(id){
    if(!confirm('Delete this mood?')) return
    try{ await deleteMood(id); await load() }catch(e){ setError(e.message) }
  }

  function edit(m){
    setEditingId(m.id)
    setForm({ mood: m.mood, note: m.note || '' })
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <section className="card p-6">
        <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit mood' : 'Track a new mood'}</h2>
        {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="label">Mood</label>
            <select name="mood" value={form.mood} onChange={change} className="input bg-white/10">
              {MOOD_OPTIONS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Note</label>
            <textarea name="note" value={form.note} onChange={change} rows={3} className="input" placeholder="Optional notes" />
          </div>
          <div className="flex gap-2">
            <button className="btn" type="submit">{editingId ? 'Update' : 'Save'}</button>
            {editingId && <button type="button" onClick={()=>{setEditingId(null); setForm({ mood:'NEUTRAL', note:''})}} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15">Cancel</button>}
          </div>
        </form>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-3">Recent moods</h2>
        <div className="space-y-3">
          {list.map(m => (
            <div key={m.id} className="card p-4 flex items-start justify-between gap-4">
              <div>
                <div className="font-medium">{m.mood}</div>
                {m.note && <div className="text-sm muted">{m.note}</div>}
                {m.createdAt && <div className="text-xs muted-weak mt-1">{new Date(m.createdAt).toLocaleString()}</div>}
              </div>
              <div className="flex gap-2">
                <button onClick={()=>edit(m)} className="btn-secondary px-3 py-1 text-sm">Edit</button>
                <button onClick={()=>remove(m.id)} className="px-3 py-1 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500/70">Delete</button>
              </div>
            </div>
          ))}
          {list.length === 0 && <div className="muted">No moods yet. Add your first mood.</div>}
        </div>
      </section>
    </div>
  )
}


