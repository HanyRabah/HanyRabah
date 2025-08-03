"use client"

import React, { useState } from 'react'
import { useTheme, colorThemes, type ColorTheme } from '@/contexts/ThemeContext'
import { Button } from '@/components/ui/button'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu'
import { Moon, Sun, Palette, Check } from 'lucide-react'

export function ThemeSwitcher() {
  const { colorTheme, mode, setColorTheme, toggleMode } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex items-center gap-2">
      {/* Mode Toggle */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleMode}
        className="h-9 w-9 p-0"
        aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
      >
        {mode === 'light' ? (
          <Moon className="h-4 w-4" />
        ) : (
          <Sun className="h-4 w-4" />
        )}
      </Button>

      {/* Color Theme Selector */}
      <div className="hidden">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-9 w-9 p-0"
            aria-label="Change color theme"
          >
            <Palette className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Color Themes</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {Object.entries(colorThemes).map(([key, theme]) => (
            <DropdownMenuItem
              key={key}
              onClick={() => {
                setColorTheme(key as ColorTheme)
                setIsOpen(false)
              }}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={theme.previewStyle}
                />
                <span>{theme.name}</span>
              </div>
              {colorTheme === key && (
                <Check className="h-4 w-4" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      </div>
    </div>
  )
}

export function ThemePreview() {
  const { colorTheme } = useTheme()
  const theme = colorThemes[colorTheme]

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <div 
        className="w-3 h-3 rounded-full"
        style={theme.previewStyle}
      />
      <span>{theme.name} Theme</span>
    </div>
  )
}
