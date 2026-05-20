import { useState, useEffect, useMemo } from 'react'
import {
  Plus, Trash2, MapPin, Leaf, Droplets, Flame, RotateCcw,
  Sparkles, X, Map, Archive, ChevronRight, ChevronLeft, Check,
  Quote, Hash,
} from 'lucide-react'
import {
  WHEEL, CAT_KEYS, ORIGINS, VARIETIES, PROCESSES, ROASTS,
  VARIETIES_BY_ORIGIN, PARAM_LABELS,
  estimateFlavor, estimatePartialFlavor, computeBeanPlot,
  buildTasteSummary, describeContribution,
  estimatePrice, computePriceRange,
  SEED_BEANS,
} from './data.js'
import { FlavorWheel } from './wheel.jsx'
import { ConvergenceFlow } from './flow.jsx'
import { OriginMap, VarietyPicker, ProcessPicker, RoastDial, GrindPicker } from './pickers.jsx'
import { SectionLabel, Meter, Pill } from './ui.jsx'

const STORAGE_KEY = 'cofffeee.beans.v6'

const STEP_DEFS = [
  { n: 1, en: 'ORIGIN',  jp: '産地',   icon: Map,      key: 'origin'  },
  { n: 2, en: 'VARIETY', jp: '品種',   icon: Leaf,     key: 'variety' },
  { n: 3, en: 'PROCESS', jp: '精製',   icon: Droplets, key: 'process' },
  { n: 4, en: 'ROAST',   jp: '焙煎',   icon: Flame,    key: 'roast'   },
  { n: 5, en: 'GRIND',   jp: '挽き目', icon: Hash,     key: 'grind'   },
  { n: 6, en: 'RESULT',  jp: '結果',   icon: Sparkles, key: 'result'  },
]

export default function App() {
  const [beans, setBeans] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) return JSON.parse(raw)
    } catch { /* ignore */ }
    return SEED_BEANS
  })
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(beans)) } catch { /* ignore */ }
  }, [beans])

  const [mode, setMode] = useState('register')
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ name: '', origin: '', variety: '', process: '', roast: '', grind: '' })
  const [lastTouched, setLastTouched] = useState(null)  // for the contribution explanation line
  const [savedJustNow, setSavedJustNow] = useState(false)

  const setField = (k) => (v) => {
    setForm(f => {
      const next = { ...f, [k]: v }
      if (k === 'origin') {
        const allowed = VARIETIES_BY_ORIGIN[v] || []
        if (next.variety && !allowed.includes(next.variety)) next.variety = ''
      }
      return next
    })
    if (v) setLastTouched(k)
  }

  const projection = useMemo(() => estimatePartialFlavor(form), [form])
  const isComplete = !!form.origin && !!form.variety && !!form.process && !!form.roast && !!form.grind
  const [hoverId, setHoverId] = useState(null)
  const [selectedId, setSelectedId] = useState(null)
  const activeId = hoverId || selectedId

  const handleSave = () => {
    if (!isComplete) return
    const id = `b${Date.now().toString(36)}`
    const name = form.name.trim() || `${form.origin} / ${form.variety} / ${ROASTS[form.roast].label.toLowerCase()}`
    const full = estimateFlavor(form)
    const price = estimatePrice(form)
    const bean = { id, name, ...form, ...full, price }
    setBeans(prev => [...prev, bean])
    setSelectedId(id)
    setSavedJustNow(true)
  }
  const handleNewSample = () => {
    setForm({ name: '', origin: '', variety: '', process: '', roast: '', grind: '' })
    setSavedJustNow(false)
    setStep(1)
  }
  const handleGoArchive = () => {
    setSavedJustNow(false)
    setMode('archive')
  }
  const handleRemove = (id) => {
    setBeans(prev => prev.filter(b => b.id !== id))
    if (selectedId === id) setSelectedId(null)
  }
  const handleReset = () => {
    if (typeof window !== 'undefined' && window.confirm('保存済みログを破棄して初期サンプルに戻しますか？')) {
      setBeans(SEED_BEANS); setSelectedId(null)
    }
  }

  const activeBean = beans.find(b => b.id === activeId) || null
  const projectionPlot = useMemo(() => {
    if (!projection?.dominant) return null
    return computeBeanPlot({ ...projection, id: '__proj', notes: projection.notes })
  }, [projection])
  const activePlot = activeBean ? computeBeanPlot(activeBean) : null

  // What the top strip + sidebar visualizes
  const liveProfile = mode === 'register'
    ? projection
    : (activeBean ? { ...activeBean } : null)
  const liveDominant = mode === 'register'
    ? projection?.dominant
    : activeBean?.dominant

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">

      {/* ───── HEADER ───── */}
      <header className="relative z-10 px-6 md:px-10 lg:px-14 pt-8 pb-5">
        <div className="flex items-center justify-between gap-4">
          <h1 className="font-sans font-medium tracking-[-0.04em] text-ink leading-none
                         text-[clamp(26px,3.2vw,38px)]">
            Cofffeee
          </h1>
          <div className="inline-flex p-0.5 bg-elev2 border border-line rounded-md text-[11px] font-mono">
            <button
              onClick={() => setMode('register')}
              className={`px-3 py-1 rounded transition-colors
                          ${mode === 'register'
                            ? 'bg-white border border-line text-ink shadow-soft'
                            : 'text-ink3 hover:text-ink'}`}>
              register
            </button>
            <button
              onClick={() => setMode('archive')}
              className={`px-3 py-1 rounded transition-colors inline-flex items-center gap-1.5
                          ${mode === 'archive'
                            ? 'bg-white border border-line text-ink shadow-soft'
                            : 'text-ink3 hover:text-ink'}`}>
              archive <span className="text-ink4 fig-tab text-[10px]">{beans.length}</span>
            </button>
          </div>
        </div>
      </header>

      {/* ───── STICKY: PROJECTION TOP STRIP ───── */}
      <div className="sticky top-0 z-30 backdrop-blur-md"
           style={{ background: 'rgba(250, 250, 250, 0.84)' }}>
        <div className="border-y border-line">
          <div className="px-6 md:px-10 lg:px-14 py-3">
            <div className="flex items-start gap-3">
              <div className="flex-1 min-w-0">
                {mode === 'register' ? (() => {
                  const segs = lastTouched ? describeContribution(lastTouched, form[lastTouched]) : null
                  if (!segs) {
                    return (
                      <div className="font-mono text-[10px] tracking-macro uppercase text-ink4 flex items-center gap-2">
                        <span className="text-ink3">↳</span>
                        <span>パラメータを選ぶと、その効果がここに表示されます</span>
                      </div>
                    )
                  }
                  const lbl = PARAM_LABELS[lastTouched]
                  return (
                    <div className="flex items-baseline gap-2.5 flex-wrap">
                      <span className="font-mono text-amber tracking-macro uppercase text-[9.5px] flex-shrink-0 mt-0.5">
                        ↳ {lbl.en}
                      </span>
                      <p className="font-jp text-[12.5px] text-ink2 leading-[1.55] flex-1">
                        {segs.map((s, i) => (
                          <span key={i}
                                style={{
                                  color: s.color || undefined,
                                  fontWeight: s.bold ? 600 : undefined,
                                  fontStyle: s.italic ? 'italic' : undefined,
                                }}>
                            {s.text}
                          </span>
                        ))}
                      </p>
                    </div>
                  )
                })() : (
                  activeBean && (
                    <div className="font-mono text-[10px] tracking-macro uppercase text-ink3 flex items-center gap-2">
                      <span>↳ {activeBean.origin} · {activeBean.variety} · {ROASTS[activeBean.roast]?.label}</span>
                    </div>
                  )
                )}
              </div>
              <div className="flex-shrink-0">
                <PriceChip mode={mode} form={form} activeBean={activeBean} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ───── BODY ───── */}
      <main className="relative z-10 px-6 md:px-10 lg:px-14 pt-6 pb-12 grid grid-cols-12 gap-6 lg:gap-8">

        {/* ═════ LEFT — main ═════ */}
        <section className="col-span-12 lg:col-span-8 flex flex-col gap-5">

          {mode === 'register' && (
            <>
              <Stepper step={step} setStep={(s) => { setStep(s); setSavedJustNow(false) }}
                       form={form} disabled={savedJustNow} />

              <div className="min-h-[420px]">
                {step === 1 && (
                  <div className="surface p-5 fade-up" key="origin">
                    <StepHeader n="01" en="ORIGIN" jp="産地 — 地図から国を選ぶ" />
                    <div className="mt-4">
                      <OriginMap value={form.origin} onChange={setField('origin')} />
                    </div>
                  </div>
                )}
                {step === 2 && (
                  <div className="surface p-5 fade-up" key="variety">
                    <StepHeader n="02" en="VARIETY" jp="品種 — 豆の系統を選ぶ" />
                    <div className="mt-4">
                      <VarietyPicker value={form.variety} onChange={setField('variety')} origin={form.origin} />
                    </div>
                  </div>
                )}
                {step === 3 && (
                  <div className="surface p-5 fade-up" key="process">
                    <StepHeader n="03" en="PROCESS" jp="精製 — 加工方法を選ぶ" />
                    <div className="mt-4">
                      <ProcessPicker value={form.process} onChange={setField('process')} />
                    </div>
                  </div>
                )}
                {step === 4 && (
                  <div className="surface p-5 fade-up" key="roast">
                    <StepHeader n="04" en="ROAST" jp="焙煎 — 火入れの段階を選ぶ" />
                    <div className="mt-4">
                      <RoastDial value={form.roast} onChange={setField('roast')} />
                    </div>
                  </div>
                )}
                {step === 5 && (
                  <div className="surface p-5 fade-up" key="grind">
                    <StepHeader n="05" en="GRIND" jp="挽き目 — 抽出方法を選ぶ" />
                    <div className="mt-4">
                      <GrindPicker value={form.grind} onChange={setField('grind')} />
                    </div>
                  </div>
                )}
                {step === 6 && (
                  <ResultStep
                    form={form}
                    projection={projection}
                    isComplete={isComplete}
                    plot={projectionPlot}
                    savedJustNow={savedJustNow}
                    onNameChange={(v) => setForm(f => ({ ...f, name: v }))}
                    onSave={handleSave}
                    onEdit={(toStep) => setStep(toStep)}
                    onNewSample={handleNewSample}
                    onArchive={handleGoArchive}
                  />
                )}
              </div>

              {step < 6 && (
                <div className="flex items-center justify-between gap-3">
                  <button onClick={() => step > 1 && setStep(step - 1)}
                          disabled={step === 1}
                          className={`px-4 py-2 rounded-md font-sans text-[12.5px]
                                      border transition-colors inline-flex items-center gap-1.5
                                      ${step === 1
                                        ? 'border-line text-ink4 cursor-not-allowed bg-elev2'
                                        : 'border-line bg-white text-ink hover:border-line2'}`}>
                    <ChevronLeft size={13} strokeWidth={1.8} />
                    Back
                  </button>
                  <button onClick={() => setStep(step + 1)}
                          disabled={!form[STEP_DEFS[step - 1].key]}
                          className={`px-4 py-2 rounded-md font-sans text-[12.5px]
                                      border transition-colors inline-flex items-center gap-1.5
                                      ${form[STEP_DEFS[step - 1].key]
                                        ? 'bg-ink border-ink text-white hover:bg-ember hover:border-ember'
                                        : 'bg-elev2 border-line text-ink4 cursor-not-allowed'}`}>
                    {step === 5 ? 'View result' : 'Next'}
                    <ChevronRight size={13} strokeWidth={1.8} />
                  </button>
                </div>
              )}
            </>
          )}

          {mode === 'archive' && (
            <>
              <div className="surface p-5 min-h-[160px] fade-up">
                {activeBean ? (
                  <div>
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-[10px] tracking-macro uppercase text-ink4">IN FOCUS</span>
                          <span className="font-mono text-[10px] tracking-macro uppercase"
                                style={{ color: WHEEL.find(c => c.cat === activeBean.dominant)?.color }}>
                            ▸ {WHEEL.find(c => c.cat === activeBean.dominant)?.en}
                          </span>
                          {activePlot?.primaryLeaf && (
                            <span className="font-mono text-[10px] tracking-macro uppercase text-ink3">
                              / {activePlot.primaryLeaf.en}
                            </span>
                          )}
                        </div>
                        <h3 className="font-jp text-[22px] text-ink mt-1 leading-tight">{activeBean.name}</h3>
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          <Pill>{activeBean.origin}</Pill>
                          <Pill>{activeBean.variety}</Pill>
                          <Pill>{activeBean.process}</Pill>
                          <Pill color={ROASTS[activeBean.roast]?.color}>{ROASTS[activeBean.roast]?.label}</Pill>
                          {activeBean.grind && <Pill>{activeBean.grind}</Pill>}
                        </div>
                      </div>
                      {activeBean.notes?.length > 0 && (
                        <div className="font-jp text-[12px] text-ink2 max-w-[280px] leading-relaxed">
                          <span className="font-mono text-[9px] tracking-macro uppercase text-ink4 block mb-1">FLAVOR NOTES</span>
                          <span className="italic">{activeBean.notes.join(' · ')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Sparkles size={16} className="text-ink4 mx-auto mb-2" strokeWidth={1.3} />
                    <p className="font-mono text-[10px] tracking-macro uppercase text-ink3">
                      hover a bean below or in the wheel
                    </p>
                    <p className="font-jp text-[12px] text-ink4 mt-1">
                      豆にカーソルを合わせると詳細が表示されます
                    </p>
                  </div>
                )}
              </div>

              <div className="fade-up" style={{ animationDelay: '100ms' }}>
                <div className="flex items-center justify-between mb-3">
                  <SectionLabel index="—" accent={`${beans.length} sample${beans.length !== 1 ? 's' : ''}`}>
                    ARCHIVE / 履歴
                  </SectionLabel>
                  <button onClick={handleReset} title="シードに戻す"
                          className="ml-3 text-ink4 hover:text-amber transition-colors p-1">
                    <RotateCcw size={12} strokeWidth={1.4} />
                  </button>
                </div>

                <ul className="space-y-1.5">
                  {beans.length === 0 && (
                    <li className="font-jp text-[13px] text-ink3 py-8 text-center surface">
                      まだ何もマップされていません。
                    </li>
                  )}
                  {beans.map((b, i) => {
                    const isActive = b.id === activeId
                    const dom = WHEEL.find(c => c.cat === b.dominant)
                    return (
                      <li key={b.id}
                          onMouseEnter={() => setHoverId(b.id)}
                          onMouseLeave={() => setHoverId(null)}
                          onClick={() => setSelectedId(prev => prev === b.id ? null : b.id)}
                          className={`group flex items-center gap-3 px-3 py-3 rounded-md cursor-pointer
                                      bg-white border transition-all duration-200
                                      ${isActive ? 'border-amber bg-amber/5 shadow-soft' : 'border-line hover:border-line2'}`}>
                        <span className="font-mono fig-tab text-[10px] text-ink4 w-6">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="inline-block w-3 h-3 rounded-full flex-shrink-0"
                              style={{ background: ROASTS[b.roast]?.color,
                                       boxShadow: isActive ? `0 0 0 3px ${ROASTS[b.roast]?.color}28` : '' }} />
                        <div className="flex-1 min-w-0">
                          <div className="font-jp text-[14px] text-ink truncate leading-tight">{b.name}</div>
                          <div className="font-mono text-[9.5px] tracking-macro uppercase text-ink3 mt-0.5 truncate">
                            {b.origin} · {b.variety} · {ROASTS[b.roast]?.label}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-mono text-[9px] tracking-macro uppercase whitespace-nowrap"
                               style={{ color: dom?.color }}>
                            ▸ {dom?.en.split(' ')[0]}
                          </div>
                          <div className="font-mono fig-tab text-[10px] text-ink3 whitespace-nowrap mt-0.5">
                            {b[b.dominant].toFixed(1)} / 5
                          </div>
                        </div>
                        {b.price != null && (
                          <div className="font-mono fig-tab text-[10.5px] text-amber font-semibold whitespace-nowrap min-w-[58px] text-right">
                            ¥{b.price.toLocaleString()}
                          </div>
                        )}
                        <button onClick={(e) => { e.stopPropagation(); handleRemove(b.id) }}
                                title="削除"
                                className="text-ink4 opacity-0 group-hover:opacity-100 hover:text-ember transition-all p-0.5">
                          <X size={13} strokeWidth={1.6} />
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </>
          )}
        </section>

        {/* ═════ RIGHT — sticky profile (wheel + parameters) ═════ */}
        <aside className="col-span-12 lg:col-span-4 fade-up" style={{ animationDelay: '50ms' }}>
          <div className="lg:sticky lg:top-[160px] flex flex-col gap-4">
            <SectionLabel index="◉"
              accent={<span className="text-ink4">
                {mode === 'register' ? 'narrowing branches' : 'profile'}
              </span>}>
              {mode === 'register' ? 'BRANCHING' : 'FLAVOR WHEEL'}
            </SectionLabel>

            {mode === 'register' ? (
              <div className="relative surface p-4 overflow-hidden">
                <ConvergenceFlow
                  form={form}
                  projection={projection}
                  dominantCat={projection?.dominant ? WHEEL.find(c => c.cat === projection.dominant) : null}
                  onStepClick={(n) => setStep(n)}
                />
              </div>
            ) : (
              <div className="relative surface p-2 overflow-hidden">
                <FlavorWheel
                  beans={beans}
                  projection={null}
                  projectionRoast={form.roast}
                  activeId={activeId}
                  onHoverBean={setHoverId}
                  onSelectBean={(id) => setSelectedId(prev => prev === id ? null : id)}
                />
              </div>
            )}

            {/* Notes chips */}
            {liveProfile?.notes?.length > 0 && (
              <div className="surface p-4">
                <div className="text-[11px] text-ink3 mb-2">Notes</div>
                <div className="flex flex-wrap gap-1.5">
                  {liveProfile.notes.map(n => (
                    <span key={n} className="font-jp text-[11px] px-2 py-0.5 rounded
                                            border border-line bg-elev2 text-ink2">
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>
      </main>

    </div>
  )
}

/* ─── Price chip — always visible on sticky bar ─────────── */
function PriceChip({ mode, form, activeBean }) {
  let label, value
  if (mode === 'archive') {
    if (!activeBean) {
      return (
        <div className="px-2.5 py-1 rounded-md border border-line bg-white
                        font-mono text-[9px] text-ink4 tracking-macro uppercase">
          ¥ / CUP — pick a bean
        </div>
      )
    }
    label = 'PRICE'
    value = activeBean.price != null
      ? `¥${activeBean.price.toLocaleString()}`
      : '—'
  } else {
    const range = computePriceRange(form)
    const isExact = range.min === range.max && range.min > 0
    label = '¥ / CUP'
    value = isExact
      ? `¥${range.min.toLocaleString()}`
      : `¥${range.min.toLocaleString()}–${range.max.toLocaleString()}`
  }
  return (
    <div className="inline-flex items-baseline gap-1.5 px-2.5 py-1 rounded-md
                    bg-ink text-white border border-ink
                    font-mono">
      <span className="text-[8.5px] text-white/55 tracking-macro uppercase font-medium">
        {label}
      </span>
      <span className="text-[12.5px] fig-tab font-semibold whitespace-nowrap">
        {value}
      </span>
    </div>
  )
}

/* ─── Stepper ───────────────────────────────────────────── */
function Stepper({ step, setStep, form, disabled }) {
  return (
    <div className="surface overflow-hidden">
      <div className="flex divide-x divide-line">
        {STEP_DEFS.map(s => {
          const isActive = step === s.n
          const filled = s.key === 'result' ? false : !!form[s.key]
          return (
            <button key={s.n}
                    onClick={() => !disabled && setStep(s.n)}
                    disabled={disabled}
                    className={`flex-1 flex items-center gap-2.5 px-3 py-3 transition-colors min-w-0
                                ${isActive
                                  ? 'bg-ink/[0.04]'
                                  : 'hover:bg-elev2/60'}
                                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center
                                font-mono text-[10.5px] fig-tab font-semibold transition-colors
                                ${isActive ? 'bg-ink text-white' :
                                  filled ? 'bg-ink/85 text-white' :
                                  'bg-elev3 text-ink3'}`}>
                {filled && !isActive ? <Check size={11} strokeWidth={2.5} /> : s.n}
              </span>
              <div className={`font-sans text-[12.5px] leading-none truncate
                                ${isActive ? 'text-ink font-medium' : filled ? 'text-ink2' : 'text-ink3'}`}>
                {s.en.charAt(0) + s.en.slice(1).toLowerCase()}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function StepHeader({ n, en, jp }) {
  return (
    <div className="flex items-baseline gap-3 text-[13px] text-ink2">
      <span className="font-sans font-medium text-ink leading-none">
        {en.charAt(0) + en.slice(1).toLowerCase()}
      </span>
      <span className="flex-1 border-t border-line translate-y-[-3px]" />
      <span className="font-jp text-[11px] text-ink3">{jp}</span>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   RESULT STEP — taste-focused tasting card
   ═══════════════════════════════════════════════════════════════════════════ */

function ResultStep({
  form, projection, isComplete, plot,
  savedJustNow, onNameChange, onSave, onEdit, onNewSample, onArchive,
}) {
  // Saved-confirmation state
  if (savedJustNow) {
    return (
      <div className="surface p-10 text-center fade-up">
        <div className="ink-bloom inline-block">
          <Sparkles size={56} className="text-amber" strokeWidth={1.3} />
        </div>
        <h2 className="font-sans text-[28px] font-medium text-ink mt-5 leading-tight">
          ✓ <span className="font-jp">マッピング完了</span>
        </h2>
        <p className="font-jp text-ink2 mt-2">
          この豆はアーカイブに保存されました。
        </p>
        <div className="mt-7 flex gap-3 justify-center flex-wrap">
          <button onClick={onNewSample}
                  className="px-5 py-2.5 rounded-md border border-amber bg-amber text-white
                             font-mono text-[11px] uppercase tracking-macro
                             hover:bg-ember hover:border-ember transition-colors
                             flex items-center gap-1.5">
            <Plus size={13} strokeWidth={1.8} />
            map another
          </button>
          <button onClick={onArchive}
                  className="px-5 py-2.5 rounded-md border border-line bg-white text-ink
                             font-mono text-[11px] uppercase tracking-macro
                             hover:border-line2 transition-colors
                             flex items-center gap-1.5">
            <Archive size={13} strokeWidth={1.8} />
            view archive
          </button>
        </div>
      </div>
    )
  }

  // Missing-inputs state
  if (!isComplete) {
    const missing = [
      { k: 'origin',  en: 'origin',  jp: '産地',   stepN: 1 },
      { k: 'variety', en: 'variety', jp: '品種',   stepN: 2 },
      { k: 'process', en: 'process', jp: '精製',   stepN: 3 },
      { k: 'roast',   en: 'roast',   jp: '焙煎',   stepN: 4 },
      { k: 'grind',   en: 'grind',   jp: '挽き目', stepN: 5 },
    ].filter(p => !form[p.k])
    return (
      <div className="surface p-8 text-center fade-up">
        <X size={40} className="text-ink3 mx-auto" strokeWidth={1.3} />
        <h2 className="font-sans text-xl font-medium text-ink mt-4">⊗ 入力が足りません</h2>
        <p className="font-jp text-ink2 mt-2 text-[13px]">
          以下を選択するとプロファイルが完成します:
        </p>
        <div className="mt-4 flex justify-center gap-2 flex-wrap">
          {missing.map(p => (
            <button key={p.k} onClick={() => onEdit(p.stepN)}
                    className="px-3 py-1.5 rounded-md border border-amber bg-amber/10 text-amber
                               font-mono text-[10px] uppercase tracking-macro
                               hover:bg-amber hover:text-white transition-colors">
              ↵ {p.en} / {p.jp}
            </button>
          ))}
        </div>
      </div>
    )
  }

  // Full result with taste description
  const summary = buildTasteSummary(projection, plot)

  return (
    <div className="fade-up flex flex-col gap-4">

      {/* ─── HERO TASTING CARD ─── */}
      <div className="surface p-7 md:p-9 relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
             style={{ background: `radial-gradient(circle, ${summary.primary.color}1a, transparent 60%)` }} />

        <div className="flex items-baseline justify-between font-mono text-[10px] tracking-macro uppercase text-ink3 mb-4 relative">
          <span><span className="text-amber font-semibold">06</span> · RESULT</span>
          <span>どんな味？ · WHAT IT TASTES LIKE</span>
        </div>

        {/* Big editorial taste sentence */}
        <div className="relative">
          <Quote size={18} className="text-ink4 absolute -left-1 -top-1" strokeWidth={1.4} />
          <p className="font-jp leading-[1.4] text-ink pl-7"
             style={{ fontSize: 'clamp(20px, 2.6vw, 32px)', fontWeight: 400, letterSpacing: '-0.005em' }}>
            <span className="text-ink2">{summary.primary.char.adj}</span>
            <strong className="font-semibold"
                    style={{ color: summary.primary.color }}>
              {summary.primary.ja}
            </strong>
            <span className="text-ink2">を主軸とした</span>
            {summary.leafJa && (
              <>
                <span className="text-ink2">、</span>
                <strong className="font-medium text-ink">
                  {summary.leafJa}
                </strong>
                <span className="text-ink2">的なニュアンスのコーヒー。</span>
              </>
            )}
            {!summary.leafJa && <span className="text-ink2">コーヒー。</span>}
            {summary.secondary && (
              <>
                <br/>
                <span className="text-ink3 text-[0.72em]">
                  そこに
                  <strong className="font-medium" style={{ color: summary.secondary.color }}>
                    {summary.secondary.ja}
                  </strong>
                  が{summary.secondary.char.verb}
                  {summary.tertiary && (
                    <>
                      、<strong className="font-medium" style={{ color: summary.tertiary.color }}>
                        {summary.tertiary.ja}
                      </strong>
                      が下支えする
                    </>
                  )}
                  。
                </span>
              </>
            )}
          </p>
        </div>

        {/* Flavor notes — big chips */}
        {summary.notes.length > 0 && (
          <div className="mt-6 pt-5 border-t border-line">
            <div className="font-mono text-[10px] tracking-macro uppercase text-ink3 mb-2.5">
              FLAVOR NOTES · 主なフレーバー
            </div>
            <div className="flex flex-wrap gap-1.5">
              {summary.notes.map((n, i) => (
                <span key={n}
                      className="font-jp px-3 py-1.5 rounded-full
                                border bg-white text-ink leading-none
                                text-[13px]"
                      style={{
                        borderColor: i === 0 ? summary.primary.color : 'rgba(26,20,16,0.12)',
                        background: i === 0 ? `${summary.primary.color}0d` : '#FFFFFF',
                        color: i === 0 ? summary.primary.color : undefined,
                      }}>
                  {n}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Spec line + price */}
        <div className="mt-5 pt-4 border-t border-line flex items-center gap-2 flex-wrap">
          <Pill>{form.origin}</Pill>
          <span className="text-ink4 text-[10px]">/</span>
          <Pill>{form.variety}</Pill>
          <span className="text-ink4 text-[10px]">/</span>
          <Pill>{form.process}</Pill>
          <span className="text-ink4 text-[10px]">/</span>
          <Pill color={ROASTS[form.roast]?.color}>{ROASTS[form.roast]?.label}</Pill>
          <span className="text-ink4 text-[10px]">/</span>
          <Pill>{form.grind}</Pill>
          <span className="flex-1" />
          {(() => {
            const price = estimatePrice(form)
            if (price == null) return null
            return (
              <span className="inline-flex items-baseline gap-1.5 px-2.5 py-1 rounded-md
                              bg-ink text-white border border-ink font-mono">
                <span className="text-[8.5px] text-white/55 tracking-macro uppercase font-medium">
                  ¥ / CUP
                </span>
                <span className="text-[13px] fig-tab font-semibold">
                  ¥{price.toLocaleString()}
                </span>
              </span>
            )
          })()}
        </div>
      </div>

      {/* ─── BREAKDOWN ─── */}
      <div className="surface p-5">
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-[10px] tracking-macro uppercase text-ink3">
            NUMERICAL BREAKDOWN · 9次元プロファイル
          </span>
          <span className="font-mono text-[9.5px] tracking-macro uppercase text-ink4">
            0 — 5
          </span>
        </div>
        <div className="grid grid-cols-9 gap-2">
          {WHEEL.map(c => {
            const v = projection[c.cat]
            const isDom = c.cat === projection.dominant
            return (
              <div key={c.cat} className="text-center">
                <div className="font-mono text-[8.5px] tracking-macro uppercase text-ink3 leading-tight">
                  {c.en.split(' ')[0]}
                </div>
                <div className="font-mono fig-tab text-[20px] mt-1 leading-none"
                     style={{ color: isDom ? c.color : '#0A0A0A',
                              fontWeight: isDom ? 700 : 400 }}>
                  {v.toFixed(1)}
                </div>
                <div className="mt-1.5 flex justify-center">
                  <Meter value={v} accent={c.color} segs={5} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ─── NAME + SAVE ─── */}
      <div className="surface p-5">
        <div className="text-[10px] font-mono uppercase tracking-macro text-ink3 mb-2">
          BEAN NAME · 名前
          <span className="text-ink4 normal-case tracking-normal font-jp ml-2">(任意 — 空欄なら自動生成)</span>
        </div>
        <input
          type="text"
          value={form.name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder={`${form.origin} / ${form.variety} / ${ROASTS[form.roast]?.label.toLowerCase()}`}
          className="w-full font-jp text-[15px] text-ink py-2.5 px-3
                     bg-white border border-line rounded-md
                     focus:border-amber focus:bg-elev2 hover:border-line2
                     placeholder:text-ink4 transition-all" />

        <div className="mt-5 flex items-center gap-3">
          <button onClick={() => onEdit(4)}
                  className="px-4 py-2.5 rounded-md border border-line bg-white text-ink
                             font-mono text-[11px] uppercase tracking-macro
                             hover:border-line2 transition-colors
                             flex items-center gap-1.5">
            <ChevronLeft size={13} strokeWidth={1.8} />
            edit
          </button>
          <button onClick={onSave}
                  className="flex-1 px-4 py-3 rounded-md border-2 border-amber bg-amber text-white
                             font-mono text-[11px] uppercase tracking-macro
                             hover:bg-ember hover:border-ember transition-colors
                             flex items-center justify-center gap-2 shadow-ring">
            <Plus size={14} strokeWidth={1.8} />
            save to archive · アーカイブに保存
          </button>
        </div>
      </div>
    </div>
  )
}
