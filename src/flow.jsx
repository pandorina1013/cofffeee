import { useMemo } from 'react'
import {
  WHEEL, ORIGINS, VARIETIES, VARIETIES_BY_ORIGIN, PROCESSES, ROASTS,
  computeTasteRanges, estimatePartialFlavor, TOTAL_COMBINATIONS,
} from './data.js'

/* ═══════════════════════════════════════════════════════════════════════════
   TasteConvergence — shows how the *taste* narrows down with each selection.
   Each of the 9 SCA dimensions is rendered as a horizontal range bar.
   As the user picks parameters, the range bands shrink until they collapse
   onto single points at the final profile.
   ═══════════════════════════════════════════════════════════════════════════ */

export function TasteConvergence({ form, onStepClick }) {
  const { ranges, count } = useMemo(() => computeTasteRanges(form), [form])
  const partial = useMemo(() => estimatePartialFlavor(form), [form])
  const filledCount =
    (form.origin ? 1 : 0) +
    (form.variety ? 1 : 0) +
    (form.process ? 1 : 0) +
    (form.roast ? 1 : 0)
  const isComplete = filledCount === 4

  const steps = [
    { key: 'origin',  en: 'ORIGIN',  jp: '産地', value: form.origin,  stepN: 1 },
    { key: 'variety', en: 'VARIETY', jp: '品種', value: form.variety, stepN: 2 },
    { key: 'process', en: 'PROCESS', jp: '精製', value: form.process, stepN: 3 },
    { key: 'roast',   en: 'ROAST',   jp: '焙煎', value: form.roast,   stepN: 4 },
  ]

  return (
    <div>
      {/* Step indicator — 4 chips showing which params are locked */}
      <div className="flex items-stretch gap-1 mb-4">
        {steps.map((s, i) => (
          <button key={s.key}
                  onClick={() => onStepClick?.(s.stepN)}
                  className={`flex-1 text-left px-2 py-1.5 rounded border transition-all
                              ${s.value
                                ? 'border-amber bg-amber/8 hover:bg-amber/12'
                                : 'border-dashed border-line bg-white hover:border-line2'}`}>
            <div className="font-mono text-[8.5px] tracking-macro uppercase leading-none
                            text-ink3"
                 style={{ color: s.value ? '#0A0A0A' : undefined }}>
              {s.value ? '●' : '○'} {s.en}
            </div>
            <div className="font-jp text-[10px] text-ink truncate leading-tight mt-0.5">
              {s.value || '—'}
            </div>
          </button>
        ))}
      </div>

      {/* Range bars — 9 SCA dimensions */}
      <div className="space-y-[7px]">
        {/* scale legend */}
        <div className="flex items-center gap-2 pb-1">
          <span className="w-14 font-mono text-[8px] tracking-macro uppercase text-ink4 text-right">SCALE</span>
          <div className="flex-1 relative">
            <div className="flex justify-between font-mono text-[8px] tracking-macro text-ink4">
              <span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
            </div>
            <div className="absolute left-0 right-0 top-3 h-px border-t border-dashed border-line" />
          </div>
          <span className="w-16 font-mono text-[8px] tracking-macro uppercase text-ink4 text-right">RANGE</span>
        </div>

        {WHEEL.map(c => {
          const r = ranges[c.cat]
          const minPct = (r.min / 5) * 100
          const maxPct = (r.max / 5) * 100
          const width = Math.max(maxPct - minPct, 0.4)
          const collapsed = (maxPct - minPct) < 0.1
          const center = partial?.[c.cat]
          const showSingle = collapsed || isComplete
          const isDom = isComplete && c.cat === partial?.dominant

          return (
            <div key={c.cat} className="flex items-center gap-2">
              <span className={`w-14 font-mono text-[9.5px] uppercase tracking-micro text-right truncate
                                ${isDom ? 'text-amber font-semibold' : 'text-ink3'}`}>
                {c.en.split(' ')[0]}
              </span>
              <div className="flex-1 h-3 bg-elev2 rounded-full relative overflow-hidden">
                {/* full track gridlines */}
                {[20, 40, 60, 80].map(p => (
                  <div key={p}
                       className="absolute top-0 bottom-0 w-px bg-line"
                       style={{ left: `${p}%` }} />
                ))}
                {/* range band */}
                {!showSingle && (
                  <div className="absolute inset-y-0 rounded-full"
                       style={{
                         left: `${minPct}%`,
                         width: `${width}%`,
                         background: `linear-gradient(90deg, ${c.color}33, ${c.color}99, ${c.color}33)`,
                         border: `1px solid ${c.color}66`,
                         transition: 'left 0.7s cubic-bezier(0.2, 0.7, 0.2, 1), width 0.7s cubic-bezier(0.2, 0.7, 0.2, 1)',
                       }} />
                )}
                {/* center estimate (when partially constrained) */}
                {!showSingle && center != null && (
                  <div className="absolute top-0 bottom-0 w-0.5"
                       style={{
                         left: `${(center / 5) * 100}%`,
                         background: c.color,
                         transform: 'translateX(-50%)',
                         transition: 'left 0.7s cubic-bezier(0.2, 0.7, 0.2, 1)',
                       }} />
                )}
                {/* single point (collapsed) */}
                {showSingle && (
                  <div className="absolute top-1/2 rounded-full"
                       style={{
                         left: `${minPct}%`,
                         width: '8px',
                         height: '8px',
                         transform: 'translate(-50%, -50%)',
                         background: c.color,
                         boxShadow: `0 0 4px ${c.color}, 0 0 0 1.5px #FFFFFF`,
                         transition: 'left 0.7s cubic-bezier(0.2, 0.7, 0.2, 1)',
                       }} />
                )}
              </div>
              <span className={`w-16 font-mono fig-tab text-[10px] text-right whitespace-nowrap
                                ${isDom ? 'text-amber font-semibold' : 'text-ink2'}`}>
                {showSingle
                  ? r.min.toFixed(1)
                  : `${r.min.toFixed(1)}–${r.max.toFixed(1)}`}
              </span>
            </div>
          )
        })}
      </div>

      {/* Summary footer */}
      <div className="mt-4 pt-3 border-t border-dashed border-line">
        <div className="flex items-center justify-between gap-2 font-mono text-[10px] tracking-macro uppercase">
          <span className="text-ink3">
            {isComplete
              ? <span className="text-amber font-semibold inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber pulse-soft" />
                  TASTE LOCKED
                </span>
              : <>NARROWING <span className="text-ink"> {filledCount}/4 </span></>}
          </span>
          <span className={isComplete ? 'text-amber font-semibold' : 'text-ink4'}>
            <span className="fig-tab text-[11px]">{count.toLocaleString()}</span>
            <span className="text-ink4"> / {TOTAL_COMBINATIONS.toLocaleString()} taste profiles</span>
          </span>
        </div>
        {/* width-narrowing visual */}
        <div className="mt-2 h-1 bg-elev2 rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-700"
               style={{
                 width: `${Math.max(0.5, (count / TOTAL_COMBINATIONS) * 100)}%`,
                 background: isComplete
                   ? '#0A0A0A'
                   : 'linear-gradient(90deg, #0A0A0A, #888888)',
                 transition: 'width 0.7s cubic-bezier(0.2, 0.7, 0.2, 1)',
               }} />
        </div>
      </div>
    </div>
  )
}

/* Legacy export name kept for App.jsx import compatibility */
export const ConvergenceFlow = TasteConvergence
