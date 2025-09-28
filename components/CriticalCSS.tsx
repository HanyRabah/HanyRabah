export function CriticalCSS() {
  return (
    <style dangerouslySetInnerHTML={{
      __html: `
      /* Critical CSS - Above the fold styles */
      * {
        box-sizing: border-box;
      }
      
      html {
        scroll-behavior: smooth;
      }
      
      body {
        margin: 0;
        font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        line-height: 1.6;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        visibility: hidden;
      }
      
      html[data-theme-loaded] body {
        visibility: visible;
      }
      
      /* Hero section critical styles */
      .hero-section {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1.5rem;
      }
      
      /* Navigation critical styles */
      .navigation {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 50;
        backdrop-filter: blur(10px);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      /* Theme variables - will be overridden by ThemeScript */
      :root {
        --theme-primary: #14b8a6;
        --theme-secondary: #0d9488;
        --theme-tertiary: #DDFFE7;
        --theme-forth: #167D7F;
        --theme-muted: #115e59;
        --theme-accent: #10b981;
      }
      
      .dark {
        --background: 222.2 84% 4.9%;
        --foreground: 210 40% 98%;
      }
      
      .light {
        --background: 0 0% 100%;
        --foreground: 222.2 84% 4.9%;
      }
      
      /* Utility classes for immediate use */
      .min-h-screen { min-height: 100vh; }
      .flex { display: flex; }
      .items-center { align-items: center; }
      .justify-center { justify-content: center; }
      .text-center { text-align: center; }
      .hidden { display: none; }
      .block { display: block; }
      `
    }} />
  )
}
