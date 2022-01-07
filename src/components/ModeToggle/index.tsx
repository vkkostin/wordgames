import React, { useEffect, useRef, useContext } from 'react';
import { LIGHT, DARK } from '../../constants';
import { ThemeContext } from '../../context/ThemeContext';

import './ModeToggle.css'

const ModeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const toggleRef= useRef() as React.MutableRefObject<HTMLInputElement>

  useEffect(() => {
    let initialTheme = theme
    const storedTheme = localStorage.getItem('theme')

    if (storedTheme) {
      initialTheme = storedTheme
      document.documentElement.style.colorScheme = storedTheme
      document.documentElement.dataset.theme = storedTheme
      toggleTheme(storedTheme)
    }

    toggleRef.current.classList.add(`switch--${initialTheme}`)
    toggleRef.current.classList.add(`switch--start-${initialTheme}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggleMode = () => {
    const newTheme = theme === LIGHT ? DARK : LIGHT
    toggleTheme(newTheme)

    document.documentElement.style.colorScheme = newTheme
    document.documentElement.dataset.theme = newTheme

    toggleRef.current.classList.remove(`switch--${theme}`)
    toggleRef.current.classList.add(`switch--${newTheme}`)
  }
  
  return (
    <div className="rail" onClick={toggleMode}>
      <span className="icon">🌜</span>
      <div ref={toggleRef} className="switch"></div>
      <span className="icon">🌞</span>
    </div>
  )
}

export default ModeToggle
