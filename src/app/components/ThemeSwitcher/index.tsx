import { Toggle } from "@/app/components/ui/toggle"
import { MoonStar, Sun } from 'lucide-react'
import { useTheme } from './theme-provider'

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Toggle size="sm" className='transition-all duration-300 cursor-pointer' aria-label="Toggle italic" onClick={toggleTheme}>
      {theme === 'dark' ? <Sun /> : <MoonStar />}
    </Toggle>
  )
}
