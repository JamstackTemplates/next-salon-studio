/** Dashed editorial "cut line" divider with open salon shears partway along it. */
export function CutLineDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`my-6 flex items-center gap-3 text-ink ${className}`} aria-hidden="true">
      <div className="h-px flex-1 border-b border-dashed border-rule" />
      <svg
        viewBox="0 0 64 24"
        className="h-5 w-14 shrink-0 text-ink"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Subtle blush offset under scissor rings */}
        <circle cx="15" cy="8.5" r="4.2" fill="var(--blush)" stroke="none" />
        <circle cx="15" cy="17.5" r="4.2" fill="var(--blush)" stroke="none" />
        {/* Blades */}
        <path d="M18 9.2 54 17.5" />
        <path d="M18 14.8 54 6.5" />
        {/* Handles */}
        <circle cx="13.5" cy="7.5" r="4" />
        <circle cx="13.5" cy="16.5" r="4" />
        {/* Pivot screw in gold foil */}
        <circle cx="29.5" cy="12" r="1.4" fill="var(--gold-foil)" stroke="none" />
      </svg>
      <div className="h-px flex-[3] border-b border-dashed border-rule" />
    </div>
  );
}

/** Double-hairline editorial rule with a centred gold-foil diamond dot. */
export function ColumnRuleDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`my-8 flex items-center gap-4 ${className}`} aria-hidden="true">
      <div className="flex-1 space-y-1">
        <div className="border-t border-rule" />
        <div className="border-t border-rule/70" />
      </div>
      <svg viewBox="0 0 18 18" className="h-3.5 w-3.5 shrink-0" aria-hidden="true">
        <path d="M9 1.5 16.5 9 9 16.5 1.5 9Z" fill="var(--gold-foil)" />
        <path d="M9 4.5 13.5 9 9 13.5 4.5 9Z" fill="var(--paper)" />
      </svg>
      <div className="flex-1 space-y-1">
        <div className="border-t border-rule" />
        <div className="border-t border-rule/70" />
      </div>
    </div>
  );
}
