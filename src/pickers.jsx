import { useState, useMemo, useRef, useEffect } from 'react'
import { Search, Globe } from 'lucide-react'
import { geoNaturalEarth1, geoMercator, geoPath } from 'd3-geo'
import * as topojson from 'topojson-client'
import worldAtlas from 'world-atlas/countries-110m.json'
import {
  ORIGINS, ORIGIN_ISO, ISO_TO_ORIGIN, VARIETIES, VARIETIES_BY_ORIGIN,
  PROCESSES, ROASTS, ROAST_KEYS, GRINDS, GRIND_KEYS,
} from './data.js'
import { BeanShape } from './ui.jsx'

/* ═══════════════════════════════════════════════════════════════════════════
   1. ORIGIN — Real-world map using TopoJSON, with region zoom presets
   ═══════════════════════════════════════════════════════════════════════════ */

const MAP_W = 720
const MAP_H = 340

const COUNTRIES_FC = topojson.feature(worldAtlas, worldAtlas.objects.countries)

/* Region presets — clicking a tab focuses the map on a dense cluster. */
const REGIONS = [
  { key: 'world',       en: 'WORLD',            jp: '全世界',         proj: 'natural',  scale: 140,  center: [10, 5],   ty: 20 },
  { key: 'central-am',  en: 'C. AM · CARIB',    jp: '中米・カリブ',   proj: 'mercator', scale: 1100, center: [-85, 16], ty: 0  },
  { key: 'east-africa', en: 'EAST AFRICA',      jp: '東アフリカ',     proj: 'mercator', scale: 1300, center: [37, 0],   ty: 0  },
  { key: 'south-am',    en: 'SOUTH AMERICA',    jp: '南米',           proj: 'mercator', scale: 600,  center: [-65, -10], ty: 0 },
  { key: 'asia-pac',    en: 'ASIA · PACIFIC',   jp: 'アジア・太平洋', proj: 'mercator', scale: 480,  center: [115, 5],  ty: 0  },
]

function buildProjection(cfg) {
  const p = cfg.proj === 'mercator' ? geoMercator() : geoNaturalEarth1()
  return p.scale(cfg.scale).center(cfg.center).translate([MAP_W / 2, MAP_H / 2 + (cfg.ty || 0)])
}

// Producer-country IDs (numeric, sometimes leading-zero stripped)
const PRODUCER_IDS = new Set(
  Object.values(ORIGIN_ISO).flatMap(iso => [iso, String(parseInt(iso, 10))])
)
function originForFeature(feat) {
  return ISO_TO_ORIGIN[String(feat.id)] || ISO_TO_ORIGIN[String(parseInt(feat.id, 10))] || null
}

export function OriginMap({ value, onChange }) {
  const [hover, setHover] = useState(null)
  const [query, setQuery] = useState('')
  const [regionKey, setRegionKey] = useState('world')

  const region = REGIONS.find(r => r.key === regionKey) || REGIONS[0]
  const { PROJECTION, PATH_GEN } = useMemo(() => {
    const p = buildProjection(region)
    return { PROJECTION: p, PATH_GEN: geoPath(p) }
  }, [regionKey])

  const focused = hover || value
  const focusedData = focused ? ORIGINS[focused] : null

  // Auto-switch region when a producer in another zone is selected from outside
  useEffect(() => {
    if (!value || !ORIGINS[value]) return
    const r = ORIGINS[value].region
    const map = {
      'East Africa': 'east-africa', 'Arabian': 'east-africa',
      'Central Am.': 'central-am',  'Caribbean': 'central-am',
      'South Am.':   'south-am',
      'Asia · Pac.': 'asia-pac',
    }
    const desired = map[r]
    if (desired && regionKey === 'world') {
      // don't force away from world if user is already there;
      // only auto-switch if value comes from elsewhere — leave behaviour gentle
    }
  }, [value])

  // Sort features so producers paint last
  const features = useMemo(() => {
    const all = COUNTRIES_FC.features.slice()
    return all.sort((a, b) => {
      const ap = originForFeature(a) ? 1 : 0
      const bp = originForFeature(b) ? 1 : 0
      return ap - bp
    })
  }, [])

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[10px] tracking-macro uppercase text-ink3">
          MAP · click a producing country
        </span>
        <span className="font-mono text-[10px] tracking-macro uppercase"
              style={{ color: value ? '#0A0A0A' : '#BFBFBF' }}>
          {value || '— none selected'}
        </span>
      </div>

      {/* Region zoom tabs */}
      <div className="flex gap-1 mb-2 flex-wrap">
        {REGIONS.map(r => {
          const isActive = regionKey === r.key
          const Icon = r.key === 'world' ? Globe : null
          return (
            <button key={r.key} onClick={() => setRegionKey(r.key)}
                    className={`inline-flex items-center gap-1.5 px-2 py-1 rounded border
                                text-[9px] font-mono uppercase tracking-macro transition-colors
                                ${isActive
                                  ? 'bg-amber/12 border-amber text-amber'
                                  : 'bg-white border-line text-ink3 hover:border-line2'}`}>
              {Icon && <Icon size={10} strokeWidth={1.6} />}
              <span>{r.en}</span>
            </button>
          )
        })}
      </div>

      <div className="relative bg-elev2 border border-line rounded-lg overflow-hidden">
        <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="block w-full h-auto">
          <defs>
            <linearGradient id="beltGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"  stopColor="rgba(0,0,0,0)" />
              <stop offset="50%" stopColor="rgba(0,0,0,0.06)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </linearGradient>
            <pattern id="mapDot" width="6" height="6" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.5" fill="rgba(26,20,16,0.10)" />
            </pattern>
          </defs>

          {/* base ocean tone — dotted */}
          <rect width={MAP_W} height={MAP_H} fill="url(#mapDot)" />

          {/* graticule — latitude / longitude lines */}
          {[-60, -30, 0, 30, 60].map(lat => {
            const [, y] = PROJECTION([0, lat])
            return <line key={`lat-${lat}`}
                          x1={0} x2={MAP_W} y1={y} y2={y}
                          stroke="rgba(26,20,16,0.07)" strokeWidth={lat === 0 ? 0.6 : 0.4}
                          strokeDasharray={lat === 0 ? '0' : '2 4'} />
          })}
          {/* Tropic of Cancer / Capricorn */}
          {[23.5, -23.5].map(lat => {
            const [, y] = PROJECTION([0, lat])
            return <line key={`trop-${lat}`}
                          x1={0} x2={MAP_W} y1={y} y2={y}
                          stroke="rgba(0,0,0,0.32)" strokeWidth={0.6}
                          strokeDasharray="3 3" />
          })}
          {/* coffee belt highlight band */}
          {(() => {
            const [, y1] = PROJECTION([0,  23.5])
            const [, y2] = PROJECTION([0, -23.5])
            return <rect x={0} y={y1} width={MAP_W} height={y2 - y1}
                          fill="url(#beltGrad)" pointerEvents="none" />
          })()}

          {/* countries */}
          {features.map(feat => {
            const country = originForFeature(feat)
            const isProducer = !!country
            const isSelected = country === value
            const isHover = country === hover
            const matchesQuery = !query || (
              country && (
                country.toLowerCase().includes(query.toLowerCase()) ||
                (ORIGINS[country]?.region || '').toLowerCase().includes(query.toLowerCase())
              )
            )
            const d = PATH_GEN(feat)
            if (!d) return null
            let fill, stroke, sw
            if (isSelected) {
              fill = '#0A0A0A'; stroke = '#000000'; sw = 0.6
            } else if (isProducer) {
              fill = matchesQuery ? '#9C9C9C' : '#D8D8D8'
              stroke = '#525252'; sw = 0.4
            } else {
              fill = '#F0F0F0'; stroke = '#DADADA'; sw = 0.3
            }
            return (
              <path key={`c-${feat.id}-${feat.properties?.name || ''}`}
                    d={d}
                    fill={fill} stroke={stroke} strokeWidth={sw}
                    style={{
                      cursor: isProducer ? 'pointer' : 'default',
                      transition: 'fill 0.2s',
                    }}
                    onMouseEnter={() => isProducer && setHover(country)}
                    onMouseLeave={() => setHover(null)}
                    onClick={() => isProducer && onChange(country)} />
            )
          })}

          {/* PRODUCER PIN DOTS — visible on every coffee-producing country */}
          {Object.entries(ORIGINS).map(([name, data]) => {
            const [px, py] = PROJECTION([data.lng, data.lat])
            if (!Number.isFinite(px) || !Number.isFinite(py)) return null
            const isSel = name === value
            const isHov = name === hover
            const dim = query && !(
              name.toLowerCase().includes(query.toLowerCase()) ||
              (data.region || '').toLowerCase().includes(query.toLowerCase())
            )
            if (isSel) return null  // selected one is drawn larger below
            return (
              <g key={`pin-${name}`} style={{ pointerEvents: 'none' }}
                 opacity={dim ? 0.25 : 1}>
                {isHov && (
                  <circle cx={px} cy={py} r={6} fill="#FFFFFF" opacity={0.7} />
                )}
                <circle cx={px} cy={py}
                        r={isHov ? 3.6 : 2.8}
                        fill="#FFFFFF"
                        stroke="#000000"
                        strokeWidth={isHov ? 1.4 : 1} />
                <circle cx={px} cy={py}
                        r={isHov ? 1.8 : 1.4}
                        fill="#0A0A0A" />
              </g>
            )
          })}

          {/* selected/hover pin marker */}
          {focused && focusedData && (() => {
            const [px, py] = PROJECTION([focusedData.lng, focusedData.lat])
            if (!Number.isFinite(px) || !Number.isFinite(py)) return null
            return (
              <g style={{ pointerEvents: 'none' }} className="ink-bloom">
                <circle cx={px} cy={py} r={10} fill="none" stroke="#0A0A0A" strokeWidth={1} strokeDasharray="2 2" />
                <circle cx={px} cy={py} r={4}  fill="#0A0A0A" stroke="#FFFFFF" strokeWidth={1.2} />
                <rect x={px + 8} y={py - 18} width={Math.max(70, focused.length * 9 + 18)} height={20}
                      fill="#FFFFFF" stroke="#0A0A0A" rx={3} strokeWidth={0.8} />
                <text x={px + 16} y={py - 4}
                      style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: 11, fill: '#0A0A0A', fontWeight: 500 }}>
                  {focused}
                </text>
              </g>
            )
          })()}

          {/* belt label */}
          <text x={MAP_W - 10} y={(PROJECTION([0, 0])[1]) - 5}
                textAnchor="end"
                style={{ fontFamily: '"Geist Mono", monospace', fontSize: 8.5,
                         fill: 'rgba(0,0,0,0.55)', letterSpacing: '0.32em' }}>
            COFFEE BELT ±23.5°
          </text>
        </svg>

        {/* Search overlay */}
        <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1.5
                        bg-white/90 backdrop-blur border border-line rounded
                        focus-within:border-amber transition-colors">
          <Search size={11} strokeWidth={1.4} className="text-ink3" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="国名 / 地域"
            className="bg-transparent text-[11px] font-mono text-ink placeholder:text-ink4 w-24 focus:w-36 transition-all"
          />
        </div>
      </div>

      {focusedData && (
        <div className="mt-2 px-3 py-2 bg-elev2 border border-line rounded
                        font-mono text-[10px] tracking-macro uppercase text-ink2 flex items-center justify-between gap-3">
          <span><span className="text-ink3">{focusedData.region}</span> · LAT {focusedData.lat.toFixed(1)}° · LNG {focusedData.lng.toFixed(1)}°</span>
          <span className="font-jp normal-case tracking-normal text-[11px] text-ink3 italic">
            {focusedData.notes?.slice(0, 3).join(' · ')}
          </span>
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   2. VARIETY — visual card grid, filtered by origin
   ═══════════════════════════════════════════════════════════════════════════ */

const LINEAGE_COLORS = {
  Arabica:  '#3F3F3F',
  Hybrid:   '#5C5C5C',
  Robusta:  '#0F0F0F',
  Liberica: '#7A7A7A',
}

export function VarietyPicker({ value, onChange, origin }) {
  const [showAll, setShowAll] = useState(false)
  const allEntries = Object.entries(VARIETIES)

  const allowed = origin ? new Set(VARIETIES_BY_ORIGIN[origin] || []) : null
  const filtered = useMemo(() => {
    if (!allowed || showAll) return allEntries
    return allEntries.filter(([k]) => allowed.has(k))
  }, [origin, showAll])

  const isFiltered = allowed && !showAll
  const hiddenCount = allowed ? allEntries.length - filtered.length : 0

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[10px] tracking-macro uppercase text-ink3">
          {origin
            ? <>VARIETIES · <span className="text-amber">{origin}</span></>
            : 'pick origin first ▸ then varieties'}
        </span>
        <span className="font-mono text-[10px] tracking-macro uppercase"
              style={{ color: value ? '#0A0A0A' : '#BFBFBF' }}>
          {value || '—'}
        </span>
      </div>

      {origin && (
        <div className="mb-2.5 flex items-center justify-between gap-2 text-[10px] font-mono tracking-macro uppercase">
          <span className="text-ink3">{filtered.length} cultivar{filtered.length !== 1 && 's'} known here</span>
          <button onClick={() => setShowAll(!showAll)}
                  className={`px-2 py-0.5 rounded border transition-colors
                              ${showAll
                                ? 'bg-amber/12 border-amber text-amber'
                                : 'bg-elev2 border-line text-ink3 hover:border-line2'}`}>
            {showAll ? `Show only ${allowed?.size ?? 0}` : `Show all ${allEntries.length}`}
          </button>
        </div>
      )}

      <div className="grid grid-cols-3 md:grid-cols-4 gap-2 max-h-[320px] overflow-y-auto pr-1">
        {filtered.map(([name, v]) => {
          const isSel = value === name
          const color = LINEAGE_COLORS[v.lineage] || '#8E6A40'
          return (
            <button key={name}
                    onClick={() => onChange(name)}
                    title={v.desc}
                    className={`relative flex flex-col items-center justify-start gap-1
                                px-2 py-2.5 rounded-md border text-left
                                transition-all
                                ${isSel
                                  ? 'bg-amber/10 border-amber'
                                  : 'bg-white border-line hover:border-line2 hover:bg-elev2'}`}>
              <div className="flex items-center justify-center w-9 h-9">
                <BeanShape shape={v.shape} color={color} size={36} />
              </div>
              <div className="font-jp text-[11px] text-ink leading-tight text-center w-full truncate">
                {name}
              </div>
              <div className="font-mono text-[8px] tracking-macro uppercase text-ink3 leading-none">
                {v.lineage}
              </div>
              {isSel && (
                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber" />
              )}
            </button>
          )
        })}
      </div>

      {value && (
        <div className="mt-2 px-3 py-2 bg-elev2 border border-line rounded font-jp text-[11px] text-ink2">
          <span className="text-ink3">↳</span> {VARIETIES[value].desc}
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   3. PROCESS — animated icons (continuously narrating the method)
   ═══════════════════════════════════════════════════════════════════════════ */

function ProcessIcon({ kind, size = 48, active }) {
  const s = size
  // Each glyph: a bean illustration + animated narration overlay
  const beanColor = active ? '#0A0A0A' : '#5A5C5E'

  const Bean = ({ x = 24, y = 30 }) => (
    <g transform={`translate(${x}, ${y})`}>
      <ellipse cx="0" cy="0" rx="6" ry="9" fill={beanColor} stroke="#0A0A0A" strokeWidth="0.5" />
      <path d="M0 -8 Q 1.5 0 0 8" fill="none" stroke="#E6E9EC" strokeWidth="0.5" />
    </g>
  )

  switch (kind) {
    case 'washed': // water flows over bean
      return (
        <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
          {/* shower above */}
          <rect x="14" y="6" width="20" height="2" rx="1" fill="#0A0A0A" opacity={0.18} />
          <line x1="16" y1="8" x2="16" y2="10" stroke="#0A0A0A" strokeWidth="0.5" opacity={0.3} />
          {/* water drops falling */}
          {[18, 22, 26, 30].map((x, i) => (
            <circle key={i} cx={x} cy={12} r={1.3}
                    fill="#5C7A92" opacity={0.85}
                    className="anim-drip"
                    style={{ animationDelay: `${i * 0.22}s` }} />
          ))}
          {/* puddle */}
          <ellipse cx="24" cy="42" rx="11" ry="2" fill="#5C7A92" opacity={0.32} />
          <Bean x={24} y={32} />
        </svg>
      )
    case 'natural': // sun + drying cherry
      return (
        <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
          <g className="anim-spin" style={{ transformOrigin: '14px 14px' }}>
            <circle cx="14" cy="14" r="4.5" fill="#9AA0A8" />
            {[0,45,90,135,180,225,270,315].map(a => {
              const r = (a * Math.PI) / 180
              const x1 = 14 + Math.cos(r) * 6, y1 = 14 + Math.sin(r) * 6
              const x2 = 14 + Math.cos(r) * 8.5, y2 = 14 + Math.sin(r) * 8.5
              return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2}
                            stroke="#9AA0A8" strokeWidth="1.2" strokeLinecap="round" />
            })}
          </g>
          {/* drying cherries */}
          <circle cx="30" cy="36" r="4" fill="#5C3D44" opacity={0.85} />
          <circle cx="36" cy="34" r="3.5" fill="#4A323A" opacity={0.85} />
          <circle cx="38" cy="40" r="3" fill="#2E1F26" opacity={0.85} />
          <path d="M 8 44 Q 24 42 40 44" stroke="#5A5C5E" strokeWidth="0.6" fill="none" opacity={0.5} />
        </svg>
      )
    case 'honey-white':
    case 'honey-yellow':
    case 'honey-red':
    case 'honey-black': {
      const honeyShade = {
        'honey-white':  '#E2E5E8',
        'honey-yellow': '#A8AAA0',
        'honey-red':    '#6E6863',
        'honey-black':  '#2C2E32',
      }[kind]
      return (
        <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
          {/* pot / jar */}
          <path d="M16 12 L32 12 L30 32 Q 24 35 18 32 Z"
                fill={honeyShade} stroke="#0A0A0A" strokeWidth="0.6" />
          <line x1="14" y1="12" x2="34" y2="12" stroke="#0A0A0A" strokeWidth="1" />
          {/* honey drip — animated stretch */}
          <path className="anim-ooze"
                d="M24 32 L 23 38 Q 24 41 25 38 L 24 32 Z"
                fill={honeyShade} />
          <Bean x={24} y={43} />
        </svg>
      )
    }
    case 'pulped': // pulper machine — squeeze animation
      return (
        <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
          <rect x="10" y="14" width="28" height="20" rx="3" stroke="#0A0A0A" strokeWidth="0.8" fill="#FFFFFF" />
          <circle cx="16" cy="24" r="3" stroke="#0A0A0A" strokeWidth="0.6" className="anim-spin" style={{ transformOrigin: '16px 24px' }}/>
          <circle cx="24" cy="24" r="3" stroke="#0A0A0A" strokeWidth="0.6" className="anim-spin" style={{ transformOrigin: '24px 24px', animationDirection: 'reverse' }}/>
          <circle cx="32" cy="24" r="3" stroke="#0A0A0A" strokeWidth="0.6" className="anim-spin" style={{ transformOrigin: '32px 24px' }}/>
          {/* cherry in */}
          <circle cx="24" cy="9" r="3" fill="#5C3D44" className="anim-squeeze" />
          {/* bean out */}
          <Bean x={24} y={40} />
        </svg>
      )
    case 'semi-washed':
      return (
        <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
          {/* half-water half-sun motif */}
          <circle cx="14" cy="14" r="4" fill="#5C7A92" opacity={0.7} />
          <circle cx="34" cy="14" r="4" fill="#9AA0A8" opacity={0.85} />
          <line x1="14" y1="22" x2="14" y2="32" stroke="#5C7A92" strokeWidth="1.2" className="anim-drip" />
          {[34, 38, 30].map((x, i) => (
            <line key={i} x1={x} y1={20} x2={x} y2={24} stroke="#9AA0A8" strokeWidth="0.8"
                  className="pulse-soft" style={{ animationDelay: `${i*0.2}s` }} />
          ))}
          <Bean x={24} y={38} />
        </svg>
      )
    case 'wet-hulled': // rain falling on grain pile
      return (
        <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
          {/* rain */}
          {[12, 20, 28, 36].map((x, i) => (
            <line key={i} x1={x} y1={8} x2={x+1} y2={14}
                  stroke="#5C7A92" strokeWidth="1.4" strokeLinecap="round"
                  className="anim-rain" style={{ animationDelay: `${i*0.18}s` }} />
          ))}
          {/* cloud */}
          <path d="M10 22 Q 8 14 16 13 Q 19 7 26 10 Q 34 9 34 18 Q 38 22 32 25 L 12 25 Q 6 25 10 22 Z"
                fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="0.6" opacity={0.85} />
          {/* pile of beans */}
          <ellipse cx="24" cy="40" rx="14" ry="3" fill="#5A5C5E" />
          <Bean x={20} y={36} />
          <Bean x={28} y={37} />
        </svg>
      )
    case 'anaerobic': // sealed tank with rising bubbles
      return (
        <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
          {/* tank */}
          <rect x="14" y="14" width="20" height="26" rx="2" stroke="#0A0A0A" strokeWidth="0.8" fill="#FFFFFF" />
          <line x1="14" y1="20" x2="34" y2="20" stroke="#0A0A0A" strokeWidth="0.8" />
          <circle cx="24" cy="10" r="2" stroke="#0A0A0A" strokeWidth="0.7" fill="#FFFFFF" />
          <line x1="24" y1="12" x2="24" y2="14" stroke="#0A0A0A" strokeWidth="0.7" />
          {/* fermentation liquid */}
          <rect x="15" y="24" width="18" height="15" fill="#6E6863" opacity={0.6} />
          {/* bubbles rising */}
          {[18, 24, 30].map((x, i) => (
            <circle key={i} cx={x} cy={36} r={1.4} fill="#FFFFFF"
                    className="anim-bubble" style={{ animationDelay: `${i*0.4}s` }} />
          ))}
        </svg>
      )
    case 'anaerobic-natural': // tank + sun
      return (
        <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
          <g className="anim-spin" style={{ transformOrigin: '11px 11px' }}>
            <circle cx="11" cy="11" r="3" fill="#9AA0A8" />
            {[0,90,180,270].map(a => {
              const r = (a * Math.PI) / 180
              const x1 = 11 + Math.cos(r) * 4.5, y1 = 11 + Math.sin(r) * 4.5
              const x2 = 11 + Math.cos(r) * 6.5, y2 = 11 + Math.sin(r) * 6.5
              return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2}
                            stroke="#9AA0A8" strokeWidth="1.2" strokeLinecap="round" />
            })}
          </g>
          <rect x="20" y="18" width="20" height="24" rx="2" stroke="#0A0A0A" strokeWidth="0.7" fill="#FFFFFF" />
          <rect x="21" y="26" width="18" height="15" fill="#6E6863" opacity={0.55} />
          {[24, 30, 36].map((x, i) => (
            <circle key={i} cx={x} cy={38} r={1.2} fill="#FFFFFF"
                    className="anim-bubble" style={{ animationDelay: `${i*0.35}s` }} />
          ))}
        </svg>
      )
    case 'carbonic': // grape cluster + CO2 bubbles
      return (
        <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
          {/* cluster */}
          {[[24,12],[19,17],[29,17],[15,22],[24,22],[33,22],[19,27],[29,27],[24,32]].map(([x,y], i) => (
            <circle key={i} cx={x} cy={y} r={3.2} fill="#52323F" stroke="#0A0A0A" strokeWidth="0.4"
                    className={i % 3 === 0 ? 'anim-squeeze' : ''}
                    style={{ animationDelay: `${i*0.18}s` }} />
          ))}
          <path d="M24 12 L 22 6 L 27 5" stroke="#0A0A0A" strokeWidth="0.8" fill="none" />
          {/* CO2 bubbles */}
          {[18, 30].map((x, i) => (
            <text key={i} x={x} y={40}
                  style={{ fontFamily: '"Geist Mono", monospace', fontSize: 6, fill: '#0A0A0A' }}
                  className="anim-bubble" opacity={0.6}>
              CO₂
            </text>
          ))}
        </svg>
      )
    case 'lactic': // yogurt swirl
      return (
        <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
          <path d="M12 14 L 36 14 L 33 38 Q 24 42 15 38 Z"
                fill="#ECEEEF" stroke="#0A0A0A" strokeWidth="0.7" />
          <line x1="11" y1="14" x2="37" y2="14" stroke="#0A0A0A" strokeWidth="1" />
          {/* swirl */}
          <path d="M16 22 Q 24 18 32 22 Q 24 26 16 22 Z"
                fill="#E2E5E8" opacity={0.85}
                className="anim-swirl" />
          <path d="M18 30 Q 24 26 30 30"
                fill="none" stroke="#9AA0A8" strokeWidth="0.8" opacity={0.65}
                className="anim-swirl" style={{ animationDelay: '0.4s' }} />
        </svg>
      )
    case 'yeast': // floating bubbles
      return (
        <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
          <ellipse cx="24" cy="38" rx="14" ry="3" fill="#6E6863" opacity={0.4} />
          <circle cx="24" cy="24" r="11" stroke="#0A0A0A" strokeWidth="0.7" fill="#E6E9EC" opacity={0.85} />
          {/* yeast bubbles */}
          <circle cx="20" cy="20" r="2.4" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="0.5"
                  className="anim-bubble" />
          <circle cx="27" cy="25" r="1.8" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="0.5"
                  className="anim-bubble" style={{ animationDelay: '0.6s' }} />
          <circle cx="22" cy="28" r="1.4" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="0.5"
                  className="anim-bubble" style={{ animationDelay: '1.1s' }} />
        </svg>
      )
    case 'monsoon': // wind/rain drift
      return (
        <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
          {/* wind lines */}
          {[12, 18, 24].map((y, i) => (
            <path key={i}
                  d={`M 6 ${y} Q 18 ${y - 2} 30 ${y} Q 38 ${y + 2} 42 ${y}`}
                  fill="none" stroke="#0A0A0A" strokeWidth="0.7" opacity={0.6}
                  className="anim-wind" style={{ animationDelay: `${i*0.25}s` }} />
          ))}
          {/* beans being moved */}
          <Bean x={18} y={36} />
          <Bean x={30} y={36} />
        </svg>
      )
    default:
      return <svg width={s} height={s} viewBox="0 0 48 48" />
  }
}

export function ProcessPicker({ value, onChange }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[10px] tracking-macro uppercase text-ink3">
          PROCESS · pick a method
        </span>
        <span className="font-mono text-[10px] tracking-macro uppercase"
              style={{ color: value ? '#0A0A0A' : '#BFBFBF' }}>
          {value || '—'}
        </span>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
        {Object.entries(PROCESSES).map(([name, p]) => {
          const isSel = value === name
          return (
            <button key={name}
                    onClick={() => onChange(name)}
                    title={p.desc}
                    className={`relative flex flex-col items-center justify-start gap-1.5
                                px-2 py-3 rounded-md border
                                transition-all
                                ${isSel
                                  ? 'bg-amber/10 border-amber text-amber'
                                  : 'bg-white border-line text-ink2 hover:border-line2 hover:bg-elev2 hover:text-ink'}`}>
              <ProcessIcon kind={p.icon} size={40} active={isSel} />
              <div className="font-jp text-[10.5px] leading-tight text-center w-full px-0.5">
                {name}
              </div>
              {isSel && (
                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber" />
              )}
            </button>
          )
        })}
      </div>

      {value && (
        <div className="mt-2 px-3 py-2 bg-elev2 border border-line rounded font-jp text-[11px] text-ink2">
          <span className="text-ink3">↳</span> {PROCESSES[value].desc}
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   4. ROAST — animated dial
   ═══════════════════════════════════════════════════════════════════════════ */

export function RoastDial({ value, onChange }) {
  const idx = value ? ROASTS[value].idx : 0
  const [hoverIdx, setHoverIdx] = useState(null)
  const displayIdx = hoverIdx ?? idx
  const displayKey = displayIdx ? ROAST_KEYS[displayIdx - 1] : null
  const displayRoast = displayKey ? ROASTS[displayKey] : null
  const flameIntensity = displayIdx / 8

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[10px] tracking-macro uppercase text-ink3">
          ROAST · choose stage
        </span>
        <span className="font-mono text-[10px] tracking-macro uppercase"
              style={{ color: value ? '#0A0A0A' : '#BFBFBF' }}>
          {value ? ROASTS[value].label : '—'}
        </span>
      </div>

      <div className="relative bg-elev2 border border-line rounded-lg overflow-hidden">
        <svg viewBox="0 0 400 130" className="block w-full h-auto">
          <defs>
            <radialGradient id="flameGrad">
              <stop offset="0%"  stopColor="#C8CCD2" stopOpacity={flameIntensity} />
              <stop offset="40%" stopColor="#7A8FA8" stopOpacity={flameIntensity * 0.7} />
              <stop offset="100%" stopColor="#0A0A0A" stopOpacity={0} />
            </radialGradient>
            <radialGradient id="emberGrad">
              <stop offset="0%"  stopColor="#3A4554" stopOpacity={0.6 * flameIntensity} />
              <stop offset="100%" stopColor="#3A4554" stopOpacity={0} />
            </radialGradient>
          </defs>

          {/* hearth glow */}
          <ellipse cx="200" cy="100" rx="120" ry={20 + flameIntensity * 12} fill="url(#emberGrad)" />

          {/* heat lines */}
          {[150, 180, 210, 240, 270].map((x, i) => (
            <path key={i}
                  d={`M ${x} 110 Q ${x + 2} 100 ${x - 2} 92 Q ${x + 1} 84 ${x} 76`}
                  fill="none"
                  stroke={`rgba(0,0,0,${0.15 + flameIntensity * 0.45})`}
                  strokeWidth={0.8}
                  strokeLinecap="round"
                  style={{
                    animation: displayIdx > 0 ? `pulse-soft ${1.4 + (i % 3) * 0.3}s ease-in-out infinite` : 'none',
                    animationDelay: `${i * 0.1}s`,
                    opacity: displayIdx > 0 ? 1 : 0.2,
                    transition: 'opacity 0.4s',
                  }} />
          ))}

          {/* flames */}
          {displayIdx > 0 && (
            <g>
              {[185, 200, 215].map((cx, i) => {
                const h = 16 + flameIntensity * 22 + (i === 1 ? 6 : 0)
                return (
                  <path key={i}
                        d={`M ${cx - 5} 110
                            Q ${cx - 7} ${110 - h/2} ${cx} ${110 - h}
                            Q ${cx + 7} ${110 - h/2} ${cx + 5} 110 Z`}
                        fill="url(#flameGrad)"
                        className="anim-flame"
                        style={{ animationDelay: `${i * 0.08}s`, transformOrigin: `${cx}px 110px` }} />
                )
              })}
            </g>
          )}

          {/* bean */}
          <g transform="translate(200, 60)">
            <ellipse cx="0" cy="0" rx="22" ry="32"
                     fill={displayRoast?.beanColor || '#A8B0B4'}
                     stroke="#0A0A0A" strokeWidth={0.8}
                     style={{ transition: 'fill 0.6s cubic-bezier(.2,.7,.2,1)' }} />
            <path d="M 0 -30 Q 4 0 0 30"
                  stroke="rgba(255,255,255,0.45)" strokeWidth={0.7} fill="none" />
            {displayIdx >= 7 && (
              <ellipse cx="-6" cy="-12" rx="6" ry="3"
                       fill="rgba(255,255,255,0.4)"
                       transform="rotate(-25)"
                       style={{ animation: 'pulse-soft 2s ease-in-out infinite' }} />
            )}
          </g>

          {/* stat strip */}
          <text x="20" y="20"
                style={{ fontFamily: '"Geist Mono", monospace', fontSize: 9,
                         fill: '#8A857B', letterSpacing: '0.24em' }}>
            T° {displayRoast ? `${displayRoast.tempC}` : '—'}°C
          </text>
          <text x="380" y="20" textAnchor="end"
                style={{ fontFamily: '"Geist Mono", monospace', fontSize: 9,
                         fill: '#8A857B', letterSpacing: '0.24em' }}>
            {displayRoast ? `${displayRoast.mins} MIN` : '— MIN'}
          </text>
          <text x="200" y="118" textAnchor="middle"
                style={{ fontFamily: 'Geist, sans-serif', fontSize: 11, fontWeight: 600,
                         fill: '#0A0A0A', letterSpacing: '0.16em' }}>
            {displayRoast?.label || 'GREEN'}
          </text>
        </svg>
      </div>

      {/* Stage selector */}
      <div className="mt-3 flex items-stretch gap-0">
        {ROAST_KEYS.map((k) => {
          const r = ROASTS[k]
          const isSel = value === k
          const isHover = hoverIdx === r.idx
          return (
            <button key={k}
                    onClick={() => onChange(k)}
                    onMouseEnter={() => setHoverIdx(r.idx)}
                    onMouseLeave={() => setHoverIdx(null)}
                    title={r.desc}
                    className={`relative flex-1 flex flex-col items-center justify-center
                                py-2.5 px-1 border-y border-l last:border-r
                                first:rounded-l-md last:rounded-r-md
                                transition-all
                                ${isSel ? 'bg-amber/12 border-amber z-10' :
                                  isHover ? 'bg-elev2 border-line2 z-10' :
                                  'bg-white border-line hover:bg-elev2'}`}>
              <span className="block w-3 h-3 rounded-full mb-1.5"
                    style={{ background: r.beanColor,
                             boxShadow: isSel ? '0 0 0 2px rgba(0,0,0,0.3)' : 'none' }} />
              <span className={`font-mono text-[8.5px] tracking-macro uppercase
                                ${isSel ? 'text-amber' : 'text-ink3'}`}>
                {r.label}
              </span>
              <span className="font-mono fig-tab text-[8px] text-ink4 mt-0.5">
                {r.mins}m
              </span>
            </button>
          )
        })}
      </div>

      {displayRoast && (
        <div className="mt-2 px-3 py-2 bg-elev2 border border-line rounded
                        font-jp text-[11px] text-ink2 flex items-center justify-between gap-3">
          <span><span className="text-ink3">↳</span> {displayRoast.desc}</span>
          <span className="font-mono text-[9px] tracking-macro uppercase text-ink4 whitespace-nowrap">
            STAGE {displayRoast.idx}/8
          </span>
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   5. GRIND — particle picker (extra fine → extra coarse)
   ═══════════════════════════════════════════════════════════════════════════ */

function GrindParticles({ cells = 4, size = 40, active = false }) {
  const W = size
  const cellW = W / cells
  const baseR = cellW * 0.26
  const dots = []
  for (let row = 0; row < cells; row++) {
    for (let col = 0; col < cells; col++) {
      const cx = cellW * (col + 0.5)
      const cy = cellW * (row + 0.5)
      const i = row * cells + col
      const seed = i * 9301 + 49297
      const jx = (((seed) % 1000) / 1000 - 0.5) * cellW * 0.35
      const jy = (((seed * 13) % 1000) / 1000 - 0.5) * cellW * 0.35
      const rJitter = 1 + (((seed * 7) % 1000) / 1000 - 0.5) * 0.3
      dots.push({ cx: cx + jx, cy: cy + jy, r: baseR * rJitter, i })
    }
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${W} ${W}`}>
      {dots.map(d => (
        <circle key={d.i} cx={d.cx} cy={d.cy} r={d.r}
                fill={active ? '#0A0A0A' : '#5A5C5E'}
                opacity={0.55 + ((d.i * 31) % 40) / 100} />
      ))}
    </svg>
  )
}

export function GrindPicker({ value, onChange }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[10px] tracking-macro uppercase text-ink3">
          GRIND · 挽き目 → 抽出方法
        </span>
        <span className="font-mono text-[10px] tracking-macro uppercase"
              style={{ color: value ? '#0A0A0A' : '#BFBFBF' }}>
          {value || '—'}
        </span>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {Object.entries(GRINDS).map(([name, g]) => {
          const isSel = value === name
          return (
            <button key={name}
                    onClick={() => onChange(name)}
                    title={g.desc}
                    className={`relative flex flex-col items-center gap-1.5 px-2 py-3 rounded-md border
                                transition-all
                                ${isSel
                                  ? 'bg-ink/[0.04] border-ink text-ink'
                                  : 'bg-white border-line text-ink2 hover:border-line2 hover:bg-elev2 hover:text-ink'}`}>
              <GrindParticles cells={g.cells} size={40} active={isSel} />
              <div className="font-jp text-[10.5px] leading-tight text-center w-full px-0.5">
                {name}
              </div>
              <div className="font-mono text-[8px] tracking-macro uppercase text-ink3 leading-none">
                {g.method}
              </div>
              {isSel && (
                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-ink" />
              )}
            </button>
          )
        })}
      </div>

      {value && (
        <div className="mt-2 px-3 py-2 bg-elev2 border border-line rounded font-jp text-[11px] text-ink2 flex items-center justify-between gap-3">
          <span><span className="text-ink3">↳</span> {GRINDS[value].desc}</span>
          <span className="font-mono text-[9px] tracking-macro uppercase text-ink4 whitespace-nowrap">
            STAGE {GRINDS[value].idx}/6
          </span>
        </div>
      )}
    </div>
  )
}
