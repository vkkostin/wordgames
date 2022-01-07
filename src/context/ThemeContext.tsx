import React, { createContext, useState } from 'react'
import { LIGHT } from '../constants'

export const ThemeContext = createContext({
  theme: LIGHT,
  toggleTheme: (newTheme: string) => {}
})

ThemeContext.displayName = 'ThemeContext'

type ThemeContextProps = {
  children: JSX.Element;
}

const ThemeContextProvider = ({ children }: ThemeContextProps) => {
  const [theme, setTheme] = useState(LIGHT)

  const toggleTheme = (newTheme: string) => {
    localStorage.setItem('theme', newTheme)
    setTheme(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContextProvider
