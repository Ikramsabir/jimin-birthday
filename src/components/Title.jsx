const TEXT = 'Happy Birthday Jimin'

export default function Title() {
  return (
    <div className="title">
      <h1>
        {TEXT.split('').map((ch, i) => (
          <span key={i} style={{ animationDelay: `${i * 0.07}s` }}>
            {ch === ' ' ? '\u00a0' : ch}
          </span>
        ))}
      </h1>
      <p>OCTOBER 13</p>
    </div>
  )
}
