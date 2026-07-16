import './App.css'
import { useState, useCallback } from 'react'
import type { Player, KaseyVerdict as Verdict } from './types'
import { getKaseyAdvice } from './data/kaseyAdvice'
import { PlayerSelector } from './components/PlayerSelector'
import { KaseyVerdictCard } from './components/KaseyVerdictCard'
import { KaseyAvatar } from './components/KaseyAvatar'
export default function App() {
  const [playerA, setPlayerA] = useState<Player | null>(null)
  const [playerB, setPlayerB] = useState<Player | null>(null)
  const [verdict, setVerdict] = useState<Verdict | null>(null)
  const [isThinking, setIsThinking] = useState(false)

  const canCompare = playerA && playerB && playerA.id !== playerB.id

  const handleAskKasey = useCallback(() => {
    if (!playerA || !playerB || playerA.id === playerB.id) return
    setIsThinking(true)
    setVerdict(null)
    // Dramatic pause — Kasey is "thinking" (mumbling)
    setTimeout(() => {
      setVerdict(getKaseyAdvice(playerA, playerB))
      setIsThinking(false)
    }, 1200)
  }, [playerA, playerB])

  const handleReset = () => {
    setPlayerA(null)
    setPlayerB(null)
    setVerdict(null)
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-brand">
          <KaseyAvatar size="md" />
          <div>
            <h1 className="logo">Kasey<span className="logo-accent">Pros</span></h1>
            <p className="tagline">Who Should I Draft? — Kasey Edition</p>
          </div>
        </div>
      </header>

      <main className="main">
        <section className="hero">
          <h2>Compare Players. Get Kasey's Take.</h2>
          <p className="hero-sub">
            Fantasy advice powered by gut feelings, catch phrases, and absolutely zero accountability.
          </p>
        </section>

        <section className="comparison">
          <PlayerSelector
            label="Player 1"
            selected={playerA}
            onSelect={setPlayerA}
            excludeId={playerB?.id}
          />
          <div className="vs-badge">VS</div>
          <PlayerSelector
            label="Player 2"
            selected={playerB}
            onSelect={setPlayerB}
            excludeId={playerA?.id}
          />
        </section>

        <div className="actions">
          <button
            className="btn btn-primary"
            disabled={!canCompare || isThinking}
            onClick={handleAskKasey}
          >
            {isThinking ? 'Kasey is mumbling...' : 'Ask Kasey'}
          </button>
          {(playerA || playerB || verdict) && (
            <button className="btn btn-secondary" onClick={handleReset}>
              Start Over
            </button>
          )}
        </div>

        {isThinking && (
          <div className="thinking">
            <KaseyAvatar size="lg" animated />
            <p className="thinking-text">*mumbled words* ... analyzing ...</p>
          </div>
        )}

        {verdict && !isThinking && (
          <KaseyVerdictCard
            verdict={verdict}
            playerA={playerA!}
            playerB={playerB!}
            onReshuffle={handleAskKasey}
          />
        )}
      </main>

      <footer className="footer">
        <p>
          Not affiliated with FantasyPros. Or accuracy. Or Kasey's actual opinions.
        </p>
        <p className="footer-note">
          Drop Kasey photos in <code>public/images/kasey/</code> when ready — we'll wire them up.
        </p>
      </footer>
    </div>
  )
}
