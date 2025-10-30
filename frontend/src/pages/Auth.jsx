import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { login, register } from '../services/auth'

export default function Auth(){
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({username:'', password:'', fullName:''})
  const nav = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from?.pathname || '/'

  function change(e){
    setForm({...form, [e.target.name]: e.target.value})
  }

  async function submit(e){
    e.preventDefault()
    setError('')
    setLoading(true)
    try{
      if(isLogin){
        const res = await login({username: form.username, password: form.password})
        localStorage.setItem('mh_token', res.token)
        nav(redirectTo)
      }else{
        await register({username: form.username, password: form.password, fullName: form.fullName})
        setIsLogin(true)
      }
    }catch(err){
      setError(err.message || 'Something went wrong')
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto card p-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">{isLogin ? 'Welcome back' : 'Create your account'}</h2>
      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="label">Username</label>
          <input name="username" placeholder="john" value={form.username} onChange={change} className="input" />
        </div>
        <div>
          <label className="label">Password</label>
          <input name="password" type="password" placeholder="••••••••" value={form.password} onChange={change} className="input" />
        </div>
        {!isLogin && (
          <div>
            <label className="label">Full name</label>
            <input name="fullName" placeholder="John Doe" value={form.fullName} onChange={change} className="input" />
          </div>
        )}
        <div className="flex items-center justify-between">
          <button disabled={loading} className="btn" type="submit">
            {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Register')}
          </button>
          <button type="button" className="text-sm text-slate-300 hover:underline" onClick={()=>setIsLogin(!isLogin)}>
            {isLogin ? 'Create an account' : 'Have an account? Login'}
          </button>
        </div>
      </form>
    </div>
  )
}
