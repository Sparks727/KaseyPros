import { useState, useRef, useEffect } from 'react'
import type { Player, Position } from '../types'
import { searchPlayers } from '../data/players'
import './PlayerSelector.css'

interface Props {
  label: string
  selected: Player | null
  onSelect: (player: Player | null) => void
  excludeId?: string
}

const POSITIONS: (Position | 'ALL')[] = ['ALL', 'QB', 'RB', 'WR', 'TE']

export function PlayerSelector({ label, selected, onSelect, excludeId }: Props) {
  const [query, setQuery] = useState('')
  const [position, setPosition] = useState<Position | 'ALL'>('ALL')
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const results = searchPlayers(query, position).filter((p) => p.id !== excludeId)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="player-selector" ref={ref}>
      <span className="selector-label">{label}</span>
      <div className="selector-card">
        {selected ? (
          <div className="selected-player">
            <div className="player-info">
              <span className={`pos-badge pos-${selected.position.toLowerCase()}`}>
                {selected.position}
              </span>
              <div>
                <div className="player-name">{selected.name}</div>
                <div className="player-meta">{selected.team} · ADP {selected.adp}</div>
              </div>
            </div>
            <button className="clear-btn" onClick={() => onSelect(null)} aria-label="Clear">
              ×
            </button>
          </div>
        ) : (
          <>
            <div className="search-row">
              <input
                type="text"
                placeholder="Search players..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setOpen(true)
                }}
                onFocus={() => setOpen(true)}
              />
            </div>
            <div className="position-tabs">
              {POSITIONS.map((pos) => (
                <button
                  key={pos}
                  className={`pos-tab ${position === pos ? 'active' : ''}`}
                  onClick={() => setPosition(pos)}
                >
                  {pos}
                </button>
              ))}
            </div>
            {open && (
              <ul className="results-list">
                {results.length === 0 ? (
                  <li className="no-results">No players found</li>
                ) : (
                  results.slice(0, 12).map((player) => (
                    <li key={player.id}>
                      <button
                        className="result-item"
                        onClick={() => {
                          onSelect(player)
                          setOpen(false)
                          setQuery('')
                        }}
                      >
                        <span className={`pos-badge pos-${player.position.toLowerCase()}`}>
                          {player.position}
                        </span>
                        <span className="result-name">{player.name}</span>
                        <span className="result-meta">{player.team} · {player.adp}</span>
                      </button>
                    </li>
                  ))
                )}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  )
}
