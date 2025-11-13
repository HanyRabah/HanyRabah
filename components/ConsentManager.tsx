"use client";

import { useEffect } from "react";

export function ConsentManager() {
  useEffect(() => {
    // Load Consent Manager script after hydration
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.setAttribute("data-cmp-ab", "1");
    script.src = "https://cdn.consentmanager.net/delivery/autoblocking/8d4eaf9812ce5.js";
    script.setAttribute("data-cmp-host", "a.delivery.consentmanager.net");
    script.setAttribute("data-cmp-cdn", "cdn.consentmanager.net");
    script.setAttribute("data-cmp-codesrc", "16");
    
    document.head.appendChild(script);
    
    return () => {
      // Cleanup if needed
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return null;
}
