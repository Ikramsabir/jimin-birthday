import { useId } from 'react'

function Balloon({ style, c1, c2, size }) {
  const id = useId()
  return (
    <svg className="balloon" style={style} width={size} height={size * 1.9} viewBox="0 0 60 114">
      <defs>
        <radialGradient id={id} cx="35%" cy="30%">
          <stop offset="0" stopColor="#fff6cf" />
          <stop offset=".4" stopColor={c1} />
          <stop offset="1" stopColor={c2} />
        </radialGradient>
      </defs>
      <ellipse cx="30" cy="36" rx="26" ry="33" fill={`url(#${id})`} />
      <path d="M30 69 l-4 7 h8z" fill={c2} />
      <path d="M30 76 q-8 12 0 22 t0 16" stroke="#c9a24a" strokeWidth="1.2" fill="none" />
    </svg>
  )
}

function Star({ style, size }) {
  return (
    <svg className="star" style={style} width={size} height={size} viewBox="0 0 24 24">
      <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10Z" fill="#ffd966" />
    </svg>
  )
}

const STARS = [[4, 60, 16], [24, 8, 12], [46, 70, 18], [70, 30, 14], [82, 66, 12], [18, 45, 10]]

export default function Deco({ side }) {
  const left = side === 'l'
  const pos = (top, off) => ({ top: top + '%', [left ? 'left' : 'right']: off + '%' })

  return (
    <div className={`deco ${side}`}>
      <Balloon style={{ ...pos(8, 10), animationDelay: '0s' }} c1="#ffe27a" c2="#b8860b" size={56} />
      <Balloon style={{ ...pos(34, 40), animationDelay: '-2s' }} c1="#f5c542" c2="#8a5a00" size={44} />
      <Balloon style={{ ...pos(56, 6), animationDelay: '-4s' }} c1="#fff0a8" c2="#c9922a" size={50} />
      {STARS.map(([t, o, s], i) => (
        <Star key={i} size={s} style={{ ...pos(t, o), animationDelay: `${-i * 0.6}s` }} />
      ))}
    </div>
  )
}
