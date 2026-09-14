export function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 14" className={className} fill="none" aria-hidden="true">
      <path
        d="M2 9c18-9 36 6 54-1s36-9 54 1 36 6 54-1 36-9 54 1"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CurlyArrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 90 70" className={className} fill="none" aria-hidden="true">
      <path
        d="M6 6c26 4 44 18 50 42"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="1 8"
      />
      <path
        d="M44 40l13 11 4-17"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
      <path
        d="M16 2c1 9 5 13 14 14-9 1-13 5-14 14-1-9-5-13-14-14 9-1 13-5 14-14z"
        fill="currentColor"
      />
    </svg>
  );
}

export function MapPin({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 30" className={className} fill="none" aria-hidden="true">
      <path
        d="M12 28s9-10.5 9-17A9 9 0 1 0 3 11c0 6.5 9 17 9 17z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="11" r="3.2" stroke="currentColor" strokeWidth="2.4" />
    </svg>
  );
}
