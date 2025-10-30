import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectTheme } from '../store'
import ThemeToggle from './ThemeToggle.jsx'

function NavLink({ to, label, navLinkClass }){
  const location = useLocation()
  const isActive = location.pathname === to
  return (
    <Link
      to={to}
      className={`${navLinkClass ? navLinkClass(isActive) : ''} transition-all`}
    >
      {label}
    </Link>
  )
}

export default function Navbar(){
  const theme = useSelector(selectTheme)
  const navigate = useNavigate()
  const token = typeof window !== 'undefined' ? localStorage.getItem('mh_token') : null

  function logout(){
    localStorage.removeItem('mh_token')
    navigate('/login')
  }

  const headerClass = theme === 'light'
    ? 'app-header sticky top-0 z-40 bg-white border-b border-gray-200'
    : 'app-header sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/5 bg-white/5 border-b border-white/10'

  const brandTitleClass = theme === 'light' ? 'brand-title font-semibold text-slate-900 text-lg' : 'brand-title font-semibold text-slate-100 text-lg'

  const navLinkClass = (active) => {
    if(theme === 'light'){
      return active ? 'px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white' : 'px-4 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100'
    }
    return active ? 'px-4 py-2 rounded-lg text-sm font-medium bg-white/15 text-white ring-1 ring-white/20' : 'px-4 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-white/10'
  }

  return (
    <header className={headerClass}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 text-white flex items-center justify-center font-bold shadow-md">MH</div>
          <span className={brandTitleClass}>Mindful Health</span>
        </Link>
        <nav className="nav hidden md:flex items-center gap-2">
          {token && (
            <>
              <NavLink to="/" label="Dashboard" navLinkClass={navLinkClass} />
              <NavLink to="/moods" label="Moods" navLinkClass={navLinkClass} />
              <NavLink to="/sessions" label="Sessions" navLinkClass={navLinkClass} />
              <NavLink to="/analytics" label="Analytics" navLinkClass={navLinkClass} />
            </>
          )}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {token && (
            <div className="hidden sm:block">
              <input placeholder="Search..." className="input w-48" />
            </div>
          )}
          {token ? (
            <button onClick={logout} className="btn text-sm px-4 py-2">Logout</button>
          ) : (
            <Link to="/login" className="btn text-sm px-4 py-2">Login</Link>
          )}
        </div>
      </div>
    </header>
  )
}


