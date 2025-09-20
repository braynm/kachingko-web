import { createContext, useContext, useEffect, useState } from 'react'
type Theme = 'dark' | 'light' | 'system'

type ThemeProviderProps = {
  children: React.ReactNode,
  defaultTheme?: Theme,
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme,
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
  ...props
}: ThemeProviderProps) {
  const [isHydrated, setIsHydrated] = useState(false)
  const [theme, setTheme] = useState<Theme>(
    // () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
    defaultTheme
  )

  useEffect(() => {
    if (!isHydrated) return
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme, isHydrated])

  useEffect(() => {
    setIsHydrated(true)
    const storedTheme = localStorage.getItem(storageKey) as Theme
    if (storedTheme) {
      setTheme(storedTheme)
    }
  }, [storageKey])


  const value = {
    theme,
    setTheme: (theme: Theme) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(storageKey, theme)
      }

      setTheme(theme)
    }
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}


export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  return context
}
