import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectTheme } from '../store'

export default function ThemeEffect(){
  const theme = useSelector(selectTheme)
  useEffect(()=>{
    if(typeof document !== 'undefined'){
      document.documentElement.setAttribute('data-theme', theme)
    }
    if(typeof window !== 'undefined'){
      try{ localStorage.setItem('mh_theme', theme) }catch(e){}
    }
  },[theme])
  return null
}


