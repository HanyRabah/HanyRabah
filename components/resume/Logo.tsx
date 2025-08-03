export function Logo({ size = 48 }: { size?: number }) {
  return (
    <div 
      className="flex items-center justify-center bg-gradient-to-br from-primary to-indigo-600 rounded-lg shadow-lg"
      style={{ width: size, height: size }}
    >
      <svg
        width={size * 0.6}
        height={size * 0.6}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* H */}
        <rect x="2" y="4" width="2" height="16" fill="white" rx="1"/>
        <rect x="6" y="4" width="2" height="16" fill="white" rx="1"/>
        <rect x="2" y="11" width="6" height="2" fill="white" rx="1"/>
        
        {/* E */}
        <rect x="12" y="4" width="8" height="2" fill="white" rx="1"/>
        <rect x="12" y="4" width="2" height="16" fill="white" rx="1"/>
        <rect x="12" y="11" width="6" height="2" fill="white" rx="1"/>
        <rect x="12" y="18" width="8" height="2" fill="white" rx="1"/>
      </svg>
    </div>
  );
}