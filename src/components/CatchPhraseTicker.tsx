import { CATCH_PHRASES } from '../data/kaseyAdvice'
import './CatchPhraseTicker.css'

export function CatchPhraseTicker() {
  const phrases = [...CATCH_PHRASES, ...CATCH_PHRASES]

  return (
    <div className="ticker-wrap" aria-hidden="true">
      <div className="ticker">
        {phrases.map((phrase, i) => (
          <span key={i} className="ticker-item">
            {phrase}
            <span className="ticker-dot">•</span>
          </span>
        ))}
      </div>
    </div>
  )
}
