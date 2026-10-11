import { useRef, useEffect } from 'react'

export default function Sparkles({ count = 110 }) {
  const ref = useRef(null)

  useEffect(() => {
    const c = ref.current
    const x = c.getContext('2d')
    let raf
    const fit = () => { c.width = innerWidth; c.height = innerHeight }
    fit()
    addEventListener('resize', fit)

    const mk = (y) => ({
      x: Math.random() * c.width,
      y: y ?? c.height + 10,
      r: Math.random() * 2.4 + 0.4,
      v: Math.random() * 0.8 + 0.25,
      s: Math.random() * Math.PI * 2,
      k: Math.random() < 0.25,
      a: Math.random() * 6,
    })
    const ps = Array.from({ length: count }, () => mk(Math.random() * c.height))

    const loop = () => {
      x.clearRect(0, 0, c.width, c.height)
      for (const p of ps) {
        p.y -= p.v
        p.s += 0.03
        p.x += Math.sin(p.s) * 0.4
        p.a += 0.05
        if (p.y < -10) Object.assign(p, mk())
        const al = 0.4 + 0.5 * Math.sin(p.a) ** 2
        x.fillStyle = `rgba(255,${(200 + Math.sin(p.a) * 30) | 0},90,${al})`
        x.shadowColor = '#f5c542'
        x.shadowBlur = 10
        if (p.k) {
          x.save()
          x.translate(p.x, p.y)
          x.rotate(p.a)
          x.fillRect(-p.r * 1.5, -p.r * 0.8, p.r * 3, p.r * 1.6)
          x.restore()
        } else {
          x.beginPath()
          x.arc(p.x, p.y, p.r, 0, 7)
          x.fill()
        }
      }
      raf = requestAnimationFrame(loop)
    }
    loop()
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', fit) }
  }, [count])

  return <canvas ref={ref} className="fx" />
}
