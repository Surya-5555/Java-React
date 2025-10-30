import { createSlice } from '@reduxjs/toolkit'

const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'dark'
  const saved = localStorage.getItem('mh_theme')
  if (saved === 'light' || saved === 'dark') return saved
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

const themeSlice = createSlice({
  name: 'theme',
  initialState: { mode: getInitialTheme() },
  reducers: {
    setTheme(state, action){ state.mode = action.payload === 'light' ? 'light' : 'dark' },
    toggleTheme(state){ state.mode = state.mode === 'dark' ? 'light' : 'dark' },
  }
})

export const { setTheme, toggleTheme } = themeSlice.actions
export default themeSlice.reducer


