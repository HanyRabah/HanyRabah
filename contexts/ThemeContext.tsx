"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'

export type ColorTheme = 'teal' | 'purple' | 'blue' | 'orange' | 'green'
export type Mode = 'light' | 'dark'

interface ThemeContextType {
  colorTheme: ColorTheme
  mode: Mode
  setColorTheme: (theme: ColorTheme) => void
  setMode: (mode: Mode) => void
  toggleMode: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const colorThemes = {
  teal: {
    name: 'Teal',
    primary: '#14b8a6',
    secondary: '#0d9488',
    tertiary: '#DDFFE7',
    forth: '#167D7F',
    muted: '#115e59',
    accent: '#10b981',
    previewStyle: {
      background: 'linear-gradient(to right, #14b8a6, #0d9488)'
    }
  },
  purple: {
    name: 'Purple',
    primary: '#8b5cf6',
    secondary: '#7c3aed',
    tertiary: '#8155BA',
    forth: '#BEAFC2',
    muted: '#6b21a8',
    accent: '#a855f7',
    previewStyle: {
      background: 'linear-gradient(to right, #8b5cf6, #7c3aed)'
    }
  },
  blue: {
    name: 'Blue',
    primary: '#3b82f6',
    secondary: '#2563eb',
    tertiary: '#145DA0',
    forth: '#2E8BC0',
    muted: '#1e40af',
    accent: '#60a5fa',
    previewStyle: {
      background: 'linear-gradient(to right, #3b82f6, #2563eb)'
    }
  },
  orange: {
    name: 'Orange',
    primary: '#f97316',
    secondary: '#ea580c',
    tertiary: '#DF362D',
    forth: '#FF8300',
    muted: '#c2410c',
    accent: '#fb923c',
    previewStyle: {
      background: 'linear-gradient(to right, #f97316, #ea580c)'
    }
  },
  green: {
    name: 'Green',
    primary: '#22c55e',
    secondary: '#16a34a',
    tertiary: '#21B6A8',
    forth: '#A3EBB1',
    muted: '#15803d',
    accent: '#4ade80',
    previewStyle: {
      background: 'linear-gradient(to right, #22c55e, #16a34a)'
    }
  }
}

const randomizeTheme = () => {
  const themes = Object.keys(colorThemes)
  const randomTheme = themes[Math.floor(Math.random() * themes.length)]
  return randomTheme as ColorTheme
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [colorTheme, setColorTheme] = useState<ColorTheme>(randomizeTheme())
  const [mode, setMode] = useState<Mode>('dark')

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedColorTheme = localStorage.getItem('color-theme') as ColorTheme
    const savedMode = localStorage.getItem('mode') as Mode
    
    if (savedColorTheme && colorThemes[savedColorTheme]) {
      setColorTheme(savedColorTheme)
    }
    
    if (savedMode) {
      setMode(savedMode)
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setMode(prefersDark ? 'dark' : 'light')
    }
  }, [])

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement
    const theme = colorThemes[colorTheme]
    
    // Helper function to convert hex to RGB
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null
    }
    
    // Apply color theme CSS variables
    root.style.setProperty('--theme-primary', theme.primary)
    root.style.setProperty('--theme-secondary', theme.secondary)
    root.style.setProperty('--theme-muted', theme.muted)
    root.style.setProperty('--theme-accent', theme.accent)
    
    // Apply RGB versions for opacity support
    const primaryRgb = hexToRgb(theme.primary)
    const secondaryRgb = hexToRgb(theme.secondary)
    const mutedRgb = hexToRgb(theme.muted)
    const accentRgb = hexToRgb(theme.accent)
    
    if (primaryRgb) {
      root.style.setProperty('--theme-primary-rgb', `${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}`)
    }
    if (secondaryRgb) {
      root.style.setProperty('--theme-secondary-rgb', `${secondaryRgb.r}, ${secondaryRgb.g}, ${secondaryRgb.b}`)
    }
    if (mutedRgb) {
      root.style.setProperty('--theme-muted-rgb', `${mutedRgb.r}, ${mutedRgb.g}, ${mutedRgb.b}`)
    }
    if (accentRgb) {
      root.style.setProperty('--theme-accent-rgb', `${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}`)
    }
    
    // Apply mode class
    root.classList.remove('light', 'dark')
    root.classList.add(mode)
    
    // Save to localStorage
    localStorage.setItem('color-theme', colorTheme)
    localStorage.setItem('mode', mode)
  }, [colorTheme, mode])

  const toggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light')
  }

  const value = {
    colorTheme,
    mode,
    setColorTheme,
    setMode,
    toggleMode
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
