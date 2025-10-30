import { useSelector, useDispatch } from 'react-redux'
import { selectTheme } from '../store'
import { toggleTheme } from '../store/themeSlice'

export default function ThemeToggle(){
  const theme = useSelector(selectTheme)
  const dispatch = useDispatch()
  return (
    <button
      aria-label="Toggle theme"
      aria-pressed={theme === 'dark' ? 'true' : 'false'}
      onClick={()=>dispatch(toggleTheme())}
      className="h-9 w-9 rounded-lg flex items-center justify-center bg-white/10 hover:bg-white/15 text-slate-100"
      title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      <span className="text-lg" role="img" aria-hidden>
        {theme === 'dark' ? '🌙' : '☀️'}
      </span>
    </button>
  )
}


