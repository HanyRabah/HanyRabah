export function ThemeScript() {
  const themeScript = `
    (function() {
      const colorThemes = {
        blue: {
          primary: '#3b82f6',
          secondary: '#2563eb',
          tertiary: '#145DA0',
          forth: '#2E8BC0',
          muted: '#1e40af',
          accent: '#60a5fa'
        }
      };

      function hexToRgb(hex) {
        const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : null;
      }

      function applyTheme(colorTheme, mode) {
        const root = document.documentElement;
        if (!root) return;
        
        const theme = colorThemes[colorTheme];
        if (!theme) return;

        // Apply CSS custom properties
        root.style.setProperty('--theme-primary', theme.primary);
        root.style.setProperty('--theme-secondary', theme.secondary);
        root.style.setProperty('--theme-tertiary', theme.tertiary);
        root.style.setProperty('--theme-forth', theme.forth);
        root.style.setProperty('--theme-muted', theme.muted);
        root.style.setProperty('--theme-accent', theme.accent);
        
        // Apply RGB values
        const primaryRgb = hexToRgb(theme.primary);
        const secondaryRgb = hexToRgb(theme.secondary);
        const tertiaryRgb = hexToRgb(theme.tertiary);
        const forthRgb = hexToRgb(theme.forth);
        const mutedRgb = hexToRgb(theme.muted);
        const accentRgb = hexToRgb(theme.accent);
        
        if (primaryRgb) {
          root.style.setProperty('--theme-primary-rgb', primaryRgb.r + ', ' + primaryRgb.g + ', ' + primaryRgb.b);
        }
        if (secondaryRgb) {
          root.style.setProperty('--theme-secondary-rgb', secondaryRgb.r + ', ' + secondaryRgb.g + ', ' + secondaryRgb.b);
        }
        if (tertiaryRgb) {
          root.style.setProperty('--theme-tertiary-rgb', tertiaryRgb.r + ', ' + tertiaryRgb.g + ', ' + tertiaryRgb.b);
        }
        if (forthRgb) {
          root.style.setProperty('--theme-forth-rgb', forthRgb.r + ', ' + forthRgb.g + ', ' + forthRgb.b);
        }
        if (mutedRgb) {
          root.style.setProperty('--theme-muted-rgb', mutedRgb.r + ', ' + mutedRgb.g + ', ' + mutedRgb.b);
        }
        if (accentRgb) {
          root.style.setProperty('--theme-accent-rgb', accentRgb.r + ', ' + accentRgb.g + ', ' + accentRgb.b);
        }
        
        // Apply mode class
        root.classList.remove('light', 'dark');
        root.classList.add(mode);
        
        // Mark theme as loaded
        root.setAttribute('data-theme-loaded', 'true');
        
        // Show body immediately after theme is applied
        document.body.style.visibility = 'visible';
      }

      // Get saved theme or use random
      let savedColorTheme;
      let savedMode;
      
      try {
        savedColorTheme = localStorage.getItem('color-theme');
        savedMode = localStorage.getItem('mode');
      } catch (e) {
        // localStorage might not be available
      }
      
      const colorTheme = (savedColorTheme && colorThemes[savedColorTheme]) ? savedColorTheme : 'blue';
      const mode = savedMode || 'dark';
      
      // Apply theme when DOM is ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
          applyTheme(colorTheme, mode);
        });
      } else {
        applyTheme(colorTheme, mode);
      }
    })();
  `;

  return (
    <script
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: themeScript,
      }}
    />
  );
}
