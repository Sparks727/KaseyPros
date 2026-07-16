export type Position = 'QB' | 'RB' | 'WR' | 'TE'

export interface Player {
  id: string
  name: string
  team: string
  position: Position
  adp: number
  tier: number
  notes: string
}

export interface KaseyVerdict {
  pick: Player
  confidence: number
  headline: string
  reasoning: string
  catchPhrase: string
  kaseyQuote: string
}
