import { useRef, useEffect } from 'react'

const DURATION = 24000 // ms: change this to make the drawing faster/slower

export default function Portrait({ onDone }) {
  const ref = useRef(null)

  useEffect(() => {
    const im = new Image()
    let raf, timer, dead = false

    im.onload = () => {
      const c = ref.current
      if (!c) return
      const x = c.getContext('2d')
      const o = document.createElement('canvas')
      o.width = im.width
      o.height = im.height
      const ox = o.getContext('2d')
      ox.drawImage(im, 0, 0)
      const d = ox.getImageData(0, 0, o.width, o.height).data
      const sc = 2
      c.width = im.width * sc
      c.height = im.height * sc

      const t0 = performance.now()
      let last = t0

      const step = (now) => {
        if (dead) return
        const p = Math.min(1, (now - t0) / DURATION)
        const dt = Math.min(50, now - last)
        last = now
        const front = Math.min(1, p * 1.12 + 0.01) * o.height
        const cnt = Math.round((1500 * dt) / 16.7)

        for (let k = 0; k < cnt; k++) {
          const u = Math.random() * o.width
          const v = Math.random() * front
          let br = d[((v | 0) * o.width + (u | 0)) * 4] / 255
          br = Math.min(1, Math.max(0, (br - 0.1) * 1.45))
          if (Math.random() < Math.pow(br, 1.3) * 0.7) {
            const px = u * sc, py = v * sc
            const l = 3 + Math.random() * 9
            x.strokeStyle = `rgba(255,${(185 + br * 60) | 0},${(50 + br * 120) | 0},${0.3 + br * 0.65})`
            x.lineWidth = 0.8 + br * 0.9
            x.beginPath()
            x.moveTo(px, py)
            x.lineTo(px + l, py - l * 0.9)
            x.stroke()
          }
        }
        if (p < 1) raf = requestAnimationFrame(step)
        else timer = setTimeout(onDone, 600)
      }
      raf = requestAnimationFrame(step)
    }
    im.src = `${import.meta.env.BASE_URL}/jimin.jpg`

    return () => {
      dead = true
      cancelAnimationFrame(raf)
      clearTimeout(timer)
    }
  }, [])

  return (
    <div className="center">
      <div className="aura" />
      <div className="halo" />
      <div className="ring" />
      <canvas ref={ref} className="face" />
    </div>
  )
}
