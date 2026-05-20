import { ChevronDown } from 'lucide-react'

/* ───────────────────────────────────────────────────────────
   Horizontal projection strip — 9 mini-cards in a row
   Each card has label, value, and a horizontal fill bar
   Designed for the sticky top region.
   ─────────────────────────────────────────────────────────── */
export function HorizontalProjectionStrip({ profile, dominant, categories, compact = false }) {
  return (
    <div className={`grid grid-cols-9 gap-${compact ? '1.5' : '2'}`}>
      {categories.map(c => {
        const v = profile?.[c.cat] ?? 0
        const isDom = c.cat === dominant && v > 0
        const heightCls = compact ? 'py-1.5 px-2' : 'py-2 px-2.5'
        return (
          <div key={c.cat}
               className={`${heightCls} rounded-md border transition-all
                           ${isDom
                             ? 'border-ink/70 bg-ink/[0.04] shadow-[0_0_0_3px_rgba(0,0,0,0.05)]'
                             : 'border-line bg-white'}`}>
            <div className="flex items-baseline justify-between gap-1.5 mb-1.5">
              <span className={`font-mono uppercase tracking-macro leading-none truncate font-medium
                                ${compact ? 'text-[8.5px]' : 'text-[9.5px]'}
                                ${isDom ? 'text-amber' : 'text-ink3'}`}>
                {c.en.split(' ')[0]}
              </span>
              <span className={`font-mono fig-tab font-semibold leading-none whitespace-nowrap
                                ${compact ? 'text-[11px]' : 'text-[13px]'}
                                ${v ? 'text-ink' : 'text-ink4'}`}>
                {v ? v.toFixed(1) : '—'}
              </span>
            </div>
            <div className="h-1 w-full bg-elev2 rounded-full overflow-hidden relative">
              <div className="absolute inset-y-0 left-0 rounded-full"
                   style={{
                     width: `${(v / 5) * 100}%`,
                     background: c.color,
                     boxShadow: v > 3 ? `0 0 6px ${c.color}` : 'none',
                     transition: 'width 0.7s cubic-bezier(0.2, 0.7, 0.2, 1), box-shadow 0.4s',
                   }} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* Tall vertical bars — live profile visualization (9-dim) */
export function VerticalProfile({ profile, dominant, height = 260, categories }) {
  return (
    <div className="relative" style={{ height }}>
      {/* gridlines */}
      <div className="absolute inset-x-1 pointer-events-none"
           style={{ top: 18, bottom: 28 }}>
        {[0.2, 0.4, 0.6, 0.8, 1].map((g, i) => (
          <div key={g}
               className="absolute left-0 right-0"
               style={{
                 bottom: `${g * 100}%`,
                 borderTop: i === 4 ? '1px solid rgba(26,20,16,0.10)' : '1px dashed rgba(26,20,16,0.06)',
               }}>
            <span className="absolute -left-0.5 -top-2 font-mono text-[7px] tracking-macro text-ink4 fig-tab leading-none">
              {i === 4 ? '5' : ''}
            </span>
          </div>
        ))}
        <span className="absolute -left-0.5 -bottom-2 font-mono text-[7px] tracking-macro text-ink4 fig-tab leading-none">
          0
        </span>
      </div>

      <div className="absolute inset-0 flex items-end gap-[3px] pt-[18px] pb-[28px] px-1">
        {categories.map(c => {
          const v = profile?.[c.cat] ?? 0
          const isDom = c.cat === dominant && v > 0
          const heightPct = (v / 5) * 100
          return (
            <div key={c.cat} className="flex-1 flex flex-col items-stretch h-full">
              {/* bar */}
              <div className="flex-1 w-full bg-elev2 rounded-sm relative overflow-hidden
                              border border-line">
                <div className="absolute bottom-0 left-0 right-0"
                     style={{
                       height: `${heightPct}%`,
                       background: `linear-gradient(180deg, ${c.color}E6, ${c.color})`,
                       boxShadow: v > 3.5 ? `0 -2px 8px ${c.color}55` : 'none',
                       transition: 'height 0.7s cubic-bezier(0.2, 0.7, 0.2, 1), box-shadow 0.4s',
                     }} />
                {/* tip highlight line */}
                {v > 0 && (
                  <div className="absolute left-0 right-0 h-px bg-white/55"
                       style={{
                         bottom: `${heightPct}%`,
                         transition: 'bottom 0.7s cubic-bezier(0.2, 0.7, 0.2, 1)',
                       }} />
                )}
                {/* value text on top of bar */}
                {v > 0 && (
                  <div className="absolute left-0 right-0 text-center font-mono fig-tab font-semibold"
                       style={{
                         bottom: `calc(${heightPct}% + 2px)`,
                         fontSize: '8.5px',
                         color: c.color,
                         transition: 'bottom 0.7s cubic-bezier(0.2, 0.7, 0.2, 1)',
                         filter: 'brightness(0.7)',
                       }}>
                    {v.toFixed(1)}
                  </div>
                )}
                {/* dominant indicator */}
                {isDom && (
                  <div className="absolute top-0 left-0 right-0 flex justify-center pt-0.5">
                    <span className="w-1 h-1 rounded-full bg-amber pulse-soft" />
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* x-axis labels — below */}
      <div className="absolute left-1 right-1 bottom-0 flex gap-[3px]">
        {categories.map(c => {
          const v = profile?.[c.cat] ?? 0
          const isDom = c.cat === dominant && v > 0
          return (
            <div key={c.cat}
                 className={`flex-1 text-center font-mono text-[7.5px] tracking-macro uppercase leading-tight
                             ${isDom ? 'text-amber font-semibold' : 'text-ink3'}`}
                 style={{ transition: 'color 0.3s' }}>
              {c.en.split(' ')[0].slice(0, 4)}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const SectionLabel = ({ index, children, accent }) => (
  <div className="flex items-baseline gap-3 text-[12px] text-ink2">
    <span className="font-sans font-medium text-ink leading-none">{children}</span>
    {accent && <span className="text-ink4 ml-auto font-mono text-[10px]">{accent}</span>}
  </div>
)

export const Meter = ({ value, max = 5, accent = '#0A0A0A', tint = 'rgba(0,0,0,0.07)', segs = 10 }) => {
  const filled = Math.round((value / max) * segs)
  return (
    <div className="flex gap-[2px] items-center">
      {Array.from({ length: segs }).map((_, i) => (
        <span key={i} className="block h-[6px] w-[5px] rounded-[1px]"
              style={{
                background: i < filled ? accent : tint,
                transition: 'background 0.4s cubic-bezier(.2,.7,.2,1)',
              }} />
      ))}
    </div>
  )
}

export const Pill = ({ children, color, className = '' }) => (
  <span className={`inline-flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-macro
                    px-1.5 py-0.5 rounded
                    border border-line bg-elev2 text-ink ${className}`}>
    {color && <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />}
    {children}
  </span>
)

export const Field = ({ icon: Icon, label, sub, value, onChange, options, placeholder, groupBy }) => {
  const grouped = groupBy ? options.reduce((acc, opt) => {
    const g = groupBy(opt)
    if (!acc[g]) acc[g] = []
    acc[g].push(opt)
    return acc
  }, {}) : null

  return (
    <label className="block group">
      <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-macro text-ink3 mb-1.5">
        {Icon && <Icon size={11} strokeWidth={1.4} />}
        <span>{label}</span>
        {sub && <span className="text-ink4 normal-case tracking-normal font-jp">/ {sub}</span>}
      </div>
      <div className="relative">
        <select value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full font-jp text-[14px] text-ink py-2.5 pl-3 pr-9
                           bg-white border border-line rounded-md
                           focus:border-amber focus:bg-elev2 hover:border-line2
                           transition-all duration-200 cursor-pointer appearance-none">
          <option value="">{placeholder}</option>
          {grouped
            ? Object.entries(grouped).map(([g, opts]) => (
                <optgroup key={g} label={g}>
                  {opts.map(o => <option key={o} value={o}>{o}</option>)}
                </optgroup>
              ))
            : options.map(o => <option key={o} value={o}>{o}</option>)
          }
        </select>
        <ChevronDown size={14} strokeWidth={1.4}
                     className="absolute right-3 top-1/2 -translate-y-1/2 text-ink3 pointer-events-none
                                group-focus-within:text-amber transition-colors" />
      </div>
    </label>
  )
}

/* Render an SVG bean shape — used by VarietyPicker */
export function BeanShape({ shape = 'oval', color = '#5A5C5E', size = 32 }) {
  const s = size
  const cx = s / 2, cy = s / 2
  // Different shapes for each variety lineage
  switch (shape) {
    case 'long': // Geisha / Maragogype — elongated
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
          <ellipse cx={cx} cy={cy} rx={s * 0.22} ry={s * 0.42} fill={color} stroke="#231410" strokeWidth={0.7} />
          <path d={`M ${cx} ${cy - s * 0.36} Q ${cx + s * 0.05} ${cy} ${cx} ${cy + s * 0.36}`}
                fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth={0.7} />
        </svg>
      )
    case 'small':
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
          <ellipse cx={cx} cy={cy} rx={s * 0.30} ry={s * 0.36} fill={color} stroke="#231410" strokeWidth={0.7} />
          <path d={`M ${cx} ${cy - s * 0.30} Q ${cx + s * 0.05} ${cy} ${cx} ${cy + s * 0.30}`}
                fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth={0.7} />
        </svg>
      )
    case 'round': // Robusta — round
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
          <ellipse cx={cx} cy={cy} rx={s * 0.36} ry={s * 0.34} fill={color} stroke="#231410" strokeWidth={0.7} />
          <path d={`M ${cx} ${cy - s * 0.28} Q ${cx + s * 0.04} ${cy} ${cx} ${cy + s * 0.28}`}
                fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth={0.7} />
        </svg>
      )
    case 'asym': // Liberica — asymmetric/teardrop
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
          <path d={`M ${cx} ${cy - s * 0.40}
                    Q ${cx + s * 0.34} ${cy - s * 0.08} ${cx + s * 0.16} ${cy + s * 0.36}
                    Q ${cx - s * 0.20} ${cy + s * 0.30} ${cx - s * 0.30} ${cy - s * 0.05}
                    Q ${cx - s * 0.18} ${cy - s * 0.32} ${cx} ${cy - s * 0.40} Z`}
                fill={color} stroke="#231410" strokeWidth={0.7} />
          <path d={`M ${cx - s * 0.04} ${cy - s * 0.35} Q ${cx + s * 0.05} ${cy} ${cx - s * 0.06} ${cy + s * 0.30}`}
                fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth={0.7} />
        </svg>
      )
    case 'oval':
    default:
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
          <ellipse cx={cx} cy={cy} rx={s * 0.26} ry={s * 0.38} fill={color} stroke="#231410" strokeWidth={0.7} />
          <path d={`M ${cx} ${cy - s * 0.32} Q ${cx + s * 0.05} ${cy} ${cx} ${cy + s * 0.32}`}
                fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth={0.7} />
        </svg>
      )
  }
}
