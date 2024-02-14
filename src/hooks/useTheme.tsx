import React from 'react'
import { theme, Theme } from '../themes/theme'

const ThemeContext = React.createContext<Theme | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const theme = React.useContext(ThemeContext)
  if (theme === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return theme
}
