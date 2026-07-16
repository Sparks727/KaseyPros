import type { KaseyVerdict, Player } from '../types'
import { KaseyAvatar } from './KaseyAvatar'
import './KaseyVerdictCard.css'

interface Props {
  verdict: KaseyVerdict
  playerA: Player
  playerB: Player
  onReshuffle: () => void
}

export function KaseyVerdictCard({ verdict, playerA, playerB, onReshuffle }: Props) {
  const loser = verdict.pick.id === playerA.id ? playerB : playerA

  return (
    <article className="verdict-card">
      <div className="verdict-header">
        <KaseyAvatar size="lg" />
        <div>
          <span className="catch-phrase-badge">{verdict.catchPhrase}</span>
          <h3 className="verdict-headline">{verdict.headline}</h3>
        </div>
      </div>

      <div className="confidence-bar">
        <div className="confidence-label">
          Kasey Confidence™
          <span>{verdict.confidence}%</span>
        </div>
        <div className="confidence-track">
          <div
            className="confidence-fill"
            style={{ width: `${verdict.confidence}%` }}
          />
        </div>
      </div>

      <div className="pick-reveal">
        <div className="pick-winner">
          <span className="pick-label">Draft This One</span>
          <span className={`pos-badge pos-${verdict.pick.position.toLowerCase()}`}>
            {verdict.pick.position}
          </span>
          <span className="pick-name">{verdict.pick.name}</span>
          <span className="pick-team">{verdict.pick.team}</span>
        </div>
        <div className="pick-loser">
          <span className="pick-label-muted">Leave on the board</span>
          <span className="loser-name">{loser.name}</span>
        </div>
      </div>

      <p className="verdict-reasoning">{verdict.reasoning}</p>

      <blockquote className="kasey-quote">{verdict.kaseyQuote}</blockquote>

      <button className="btn-reshuffle" onClick={onReshuffle}>
        Get Another Kasey Take (same players, new vibes)
      </button>
    </article>
  )
}
