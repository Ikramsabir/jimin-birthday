import { useState, useEffect } from 'react'
import Portrait from './components/Portrait.jsx'
import Sparkles from './components/Sparkles.jsx'
import Deco from './components/Deco.jsx'
import Title from './components/Title.jsx'

export default function App() {
  const [done, setDone] = useState(false)

  // fail-safe: show the title even if the animation is interrupted
  useEffect(() => {
    const f = setTimeout(() => setDone(true), 26500)
    return () => clearTimeout(f)
  }, [])

  return (
    <div className="stage">
      <Sparkles />
      <Deco side="l" />
      <Deco side="r" />
      <Portrait onDone={() => setDone(true)} />
      {done && <Title />}
    </div>
  )
}
