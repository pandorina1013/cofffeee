import { useEffect, useState } from 'react'
import { LAYOUT, computeBeanPlot, ROASTS } from './data.js'

/* polar with 0° at top, going clockwise */
const polar = (cx, cy, r, deg) => {
  const rad = ((deg - 90) * Math.PI) / 180
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)]
}

function donutArc(cx, cy, rIn, rOut, a1, a2) {
  const large = Math.abs(a2 - a1) > 180 ? 1 : 0
  const [x1, y1] = polar(cx, cy, rOut, a1)
  const [x2, y2] = polar(cx, cy, rOut, a2)
  const [x3, y3] = polar(cx, cy, rIn,  a2)
  const [x4, y4] = polar(cx, cy, rIn,  a1)
  return `M ${x1} ${y1} A ${rOut} ${rOut} 0 ${large} 1 ${x2} ${y2} L ${x3} ${y3} A ${rIn} ${rIn} 0 ${large} 0 ${x4} ${y4} Z`
}

function textArc(cx, cy, r, a1, a2) {
  const center = (a1 + a2) / 2
  const c = ((center % 360) + 360) % 360
  const onBottom = c > 90 && c < 270
  let aa = a1, bb = a2
  if (onBottom) { aa = a2; bb = a1 }
  const [x1, y1] = polar(cx, cy, r, aa)
  const [x2, y2] = polar(cx, cy, r, bb)
  const sweep = onBottom ? 0 : 1
  return `M ${x1} ${y1} A ${r} ${r} 0 0 ${sweep} ${x2} ${y2}`
}

const SIZE = 680
const CX = SIZE / 2
const CY = SIZE / 2
const R_HUB     = 60
const R_T1_OUT  = 130
const R_T2_OUT  = 196
const R_T3_OUT  = 256
const R_OUTER_LABEL  = 296

export function FlavorWheel({ beans, projection, projectionRoast, activeId, onHoverBean, onSelectBean, scale = 1 }) {

  // smooth animation for projection dot — store last position, interpolate on change
  const [projXY, setProjXY] = useState(null)
  useEffect(() => {
    if (!projection || !projection.dominant) { setProjXY(null); return }
    const plot = computeBeanPlot({ ...projection, id: '__proj', notes: projection.notes })
    const [px, py] = polar(CX, CY, plot.radius, plot.angle)
    setProjXY({ x: px, y: py, leaf: plot.primaryLeaf })
  }, [projection?.dominant, projection?.notes?.join(','),
      projection?.floral, projection?.fruity, projection?.sour, projection?.green,
      projection?.other, projection?.roasted, projection?.spices, projection?.nutty, projection?.sweet])

  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="block w-full h-auto select-none">
      <defs>
        <radialGradient id="bgWashLight" cx="50%" cy="50%" r="55%">
          <stop offset="0%"  stopColor="#FFFFFF" />
          <stop offset="85%" stopColor="#FAF8F2" />
          <stop offset="100%" stopColor="#F3EFE5" />
        </radialGradient>
        <filter id="dotGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      {/* light paper plate */}
      <circle cx={CX} cy={CY} r={R_OUTER_LABEL + 10} fill="url(#bgWashLight)" stroke="rgba(26,20,16,0.08)" />
      <circle cx={CX} cy={CY} r={R_T3_OUT + 6} fill="none" stroke="rgba(26,20,16,0.05)" />
      <circle cx={CX} cy={CY} r={R_T1_OUT}     fill="none" stroke="rgba(26,20,16,0.07)" />
      <circle cx={CX} cy={CY} r={R_T2_OUT}     fill="none" stroke="rgba(26,20,16,0.07)" />

      {/* TIER 3 — leaves */}
      {LAYOUT.flatMap(cat => cat.subs.flatMap(sub => sub.leaves.map(lf => (
        <path key={`leaf-${cat.cat}-${lf.en}-${lf.center}`}
              d={donutArc(CX, CY, R_T2_OUT, R_T3_OUT, lf.start, lf.end)}
              fill={lf.catColor} fillOpacity={0.28}
              stroke="rgba(255,255,255,0.6)" strokeWidth={0.4} />
      ))))}

      {/* TIER 2 — subs */}
      {LAYOUT.flatMap(cat => cat.subs.map(sub => (
        <path key={`sub-${cat.cat}-${sub.en}`}
              d={donutArc(CX, CY, R_T1_OUT, R_T2_OUT, sub.start, sub.end)}
              fill={cat.color} fillOpacity={0.55}
              stroke="rgba(255,255,255,0.65)" strokeWidth={0.5} />
      )))}

      {/* TIER 1 — top categories */}
      {LAYOUT.map(cat => (
        <path key={`cat-${cat.cat}`}
              d={donutArc(CX, CY, R_HUB, R_T1_OUT, cat.start, cat.end)}
              fill={cat.color} fillOpacity={0.92}
              stroke="rgba(255,255,255,0.75)" strokeWidth={0.7} />
      ))}

      {/* TIER 1 labels */}
      <defs>
        {LAYOUT.map(cat => (
          <path key={`tp1-${cat.cat}`} id={`tp1-${cat.cat}`}
                d={textArc(CX, CY, (R_HUB + R_T1_OUT) / 2, cat.start + 1, cat.end - 1)} />
        ))}
      </defs>
      {LAYOUT.map(cat => (
        <text key={`lbl1-${cat.cat}`}
              style={{ fontFamily: 'Geist, sans-serif', fontSize: 11, fontWeight: 600,
                       letterSpacing: '0.18em', fill: '#FFFFFF', textShadow: '0 0 4px rgba(0,0,0,0.25)' }}>
          <textPath href={`#tp1-${cat.cat}`} startOffset="50%" textAnchor="middle">
            {cat.en}
          </textPath>
        </text>
      ))}

      {/* TIER 2 labels */}
      <defs>
        {LAYOUT.flatMap(cat => cat.subs.map(sub => (
          <path key={`tp2-${cat.cat}-${sub.en}`} id={`tp2-${cat.cat}-${sub.en}`}
                d={textArc(CX, CY, (R_T1_OUT + R_T2_OUT) / 2, sub.start + 0.5, sub.end - 0.5)} />
        )))}
      </defs>
      {LAYOUT.flatMap(cat => cat.subs.map(sub => {
        const arcLen = ((sub.end - sub.start) * Math.PI / 180) * ((R_T1_OUT + R_T2_OUT) / 2)
        if (arcLen < 38) return null
        const label = sub.en.length * 4.8 > arcLen ? sub.en.slice(0, Math.max(3, Math.floor(arcLen/5))) : sub.en
        return (
          <text key={`lbl2-${cat.cat}-${sub.en}`}
                style={{ fontFamily: 'Geist, sans-serif', fontSize: 9, fontWeight: 500,
                         letterSpacing: '0.10em', fill: '#0A0A0A', opacity: 0.78 }}>
            <textPath href={`#tp2-${cat.cat}-${sub.en}`} startOffset="50%" textAnchor="middle">
              {label}
            </textPath>
          </text>
        )
      }))}

      {/* TIER 3 labels */}
      <defs>
        {LAYOUT.flatMap(cat => cat.subs.flatMap(sub => sub.leaves.map(lf => (
          <path key={`tp3-${cat.cat}-${lf.en}-${lf.start.toFixed(2)}`}
                id={`tp3-${cat.cat}-${lf.en}-${lf.start.toFixed(2)}`}
                d={textArc(CX, CY, (R_T2_OUT + R_T3_OUT) / 2, lf.start + 0.15, lf.end - 0.15)} />
        ))))}
      </defs>
      {LAYOUT.flatMap(cat => cat.subs.flatMap(sub => sub.leaves.map(lf => {
        const arcLen = ((lf.end - lf.start) * Math.PI / 180) * ((R_T2_OUT + R_T3_OUT) / 2)
        if (arcLen < 22) return null
        const text = lf.en.length * 4 > arcLen ? lf.en.slice(0, Math.max(2, Math.floor(arcLen/4))) : lf.en
        return (
          <text key={`lbl3-${cat.cat}-${lf.en}-${lf.start.toFixed(2)}`}
                style={{ fontFamily: '"Geist Mono", monospace', fontSize: 7.5, fontWeight: 500,
                         letterSpacing: '0.06em', fill: '#0A0A0A', opacity: 0.62 }}>
            <textPath href={`#tp3-${cat.cat}-${lf.en}-${lf.start.toFixed(2)}`} startOffset="50%" textAnchor="middle">
              {text}
            </textPath>
          </text>
        )
      })))}

      {/* PROJECTION (in-progress form) — animates to new position */}
      {projXY && (
        <g style={{ pointerEvents: 'none' }}>
          <g style={{ transform: `translate(${projXY.x}px, ${projXY.y}px)`,
                      transition: 'transform 0.7s cubic-bezier(0.2, 0.7, 0.2, 1)' }}>
            <circle r={20} fill="none" stroke="#0A0A0A" strokeWidth={1} strokeDasharray="2 3" opacity={0.7}
                    className="pulse-soft" />
            <circle r={12} fill="none" stroke="#0A0A0A" strokeWidth={1.6} />
            <circle r={6}  fill="#0A0A0A" stroke="#FFFFFF" strokeWidth={1.4} />
            <text y={-26} textAnchor="middle"
                  style={{ fontFamily: '"Geist Mono", monospace', fontSize: 8.5,
                           fill: '#0A0A0A', letterSpacing: '0.2em', fontWeight: 600 }}>
              PROJECTION
            </text>
          </g>
        </g>
      )}

      {/* BEAN PLOTS — single point per bean */}
      {beans.map(bean => {
        const plot = computeBeanPlot(bean)
        const [px, py] = polar(CX, CY, plot.radius, plot.angle)
        const isActive = bean.id === activeId
        const isOther  = activeId && !isActive
        const roastColor = ROASTS[bean.roast]?.color || '#5A5C5E'
        return (
          <g key={bean.id}
             onMouseEnter={() => onHoverBean?.(bean.id)}
             onMouseLeave={() => onHoverBean?.(null)}
             onClick={() => onSelectBean?.(bean.id)}
             style={{ cursor: 'pointer', transition: 'opacity 0.3s' }}
             opacity={isOther ? 0.28 : 1}>
            {isActive && (
              <>
                <circle cx={px} cy={py} r={22} fill="#0A0A0A" opacity={0.12} filter="url(#dotGlow)" />
                <circle cx={px} cy={py} r={14} fill="none" stroke="#0A0A0A" strokeWidth={1} strokeDasharray="2 3" />
              </>
            )}
            <circle cx={px} cy={py} r={isActive ? 8 : 5}
                    fill={roastColor}
                    stroke={isActive ? '#0A0A0A' : '#FFFFFF'}
                    strokeWidth={isActive ? 1.6 : 1.2}
                    style={{ transition: 'r 0.25s' }} />
            <circle cx={px - 1.5} cy={py - 1.8} r={isActive ? 2.5 : 1.5}
                    fill="rgba(255,255,255,0.6)" />
          </g>
        )
      })}

      {/* HUB */}
      <circle cx={CX} cy={CY} r={R_HUB - 3} fill="#FFFFFF" stroke="rgba(26,20,16,0.10)" />
      <circle cx={CX} cy={CY} r={R_HUB - 3} fill="none" stroke="rgba(0,0,0,0.18)" strokeDasharray="1 3" />
      <text x={CX} y={CY - 14} textAnchor="middle"
            style={{ fontFamily: '"Geist Mono", monospace', fontSize: 8.5,
                     fill: '#8A857B', letterSpacing: '0.32em' }}>SCA · 2016</text>
      <text x={CX} y={CY + 2} textAnchor="middle"
            style={{ fontFamily: 'Geist, sans-serif', fontSize: 14, fontWeight: 600,
                     fill: '#0A0A0A', letterSpacing: '0.04em' }}>FLAVOR</text>
      <text x={CX} y={CY + 18} textAnchor="middle"
            style={{ fontFamily: 'Geist, sans-serif', fontSize: 14, fontWeight: 600,
                     fill: '#0A0A0A', letterSpacing: '0.04em' }}>WHEEL</text>
      <text x={CX} y={CY + 32} textAnchor="middle"
            style={{ fontFamily: '"Geist Mono", monospace', fontSize: 8,
                     fill: '#BFBFBF', letterSpacing: '0.2em' }}>
        N°.{String(beans.length).padStart(3, '0')}
      </text>
    </svg>
  )
}
