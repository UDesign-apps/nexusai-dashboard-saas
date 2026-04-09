import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type ColorTheme = 'indigo' | 'arctic' | 'forest' | 'sunrise' | 'lavender'
type ThemeMode  = 'light' | 'dark' | 'system'

interface ThemeCtx {
  mode: ThemeMode
  isDark: boolean
  colorTheme: ColorTheme
  setMode: (m: ThemeMode) => void
  setColorTheme: (t: ColorTheme) => void
}

const Ctx = createContext<ThemeCtx | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(
    () => (localStorage.getItem('theme-mode') as ThemeMode) || 'dark'
  )
  const [colorTheme, setColorTheme] = useState<ColorTheme>(
    () => (localStorage.getItem('color-theme') as ColorTheme) || 'indigo'
  )

  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const isDark = mode === 'dark' || (mode === 'system' && systemDark)

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', isDark ? 'dark' : 'light')
    root.setAttribute('data-color-theme', colorTheme)
    localStorage.setItem('theme-mode', mode)
    localStorage.setItem('color-theme', colorTheme)
  }, [mode, isDark, colorTheme])

  return (
    <Ctx.Provider value={{ mode, isDark, colorTheme, setMode, setColorTheme }}>
      {children}
    </Ctx.Provider>
  )
}

export const useTheme = () => {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
