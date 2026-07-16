import type { Player, Position } from '../types'

export const PLAYERS: Player[] = [
  { id: 'cmc', name: 'Christian McCaffrey', team: 'SF', position: 'RB', adp: 1.2, tier: 1, notes: 'Injury history but when healthy he\'s a cheat code' },
  { id: 'jj', name: 'Justin Jefferson', team: 'MIN', position: 'WR', adp: 3.1, tier: 1, notes: 'New QB who cares, he\'s still JJ' },
  { id: 'tyreek', name: 'Tyreek Hill', team: 'MIA', position: 'WR', adp: 8.4, tier: 2, notes: 'Speed kills, Tua\'s health is the real draft pick' },
  { id: 'bijan', name: 'Bijan Robinson', team: 'ATL', position: 'RB', adp: 5.6, tier: 1, notes: 'Bell cow energy, Atlanta loves running' },
  { id: 'lamar', name: 'Lamar Jackson', team: 'BAL', position: 'QB', adp: 28.3, tier: 1, notes: 'Rushing upside that makes your league mates cry' },
  { id: 'ceedee', name: 'CeeDee Lamb', team: 'DAL', position: 'WR', adp: 6.8, tier: 1, notes: 'Target hog on a team that throws' },
  { id: 'saquon', name: 'Saquon Barkley', team: 'PHI', position: 'RB', adp: 12.1, tier: 2, notes: 'Eagles offense is a RB fantasy factory' },
  { id: 'travis', name: 'Travis Kelce', team: 'KC', position: 'TE', adp: 35.2, tier: 1, notes: 'Still the TE1 until proven otherwise' },
  { id: 'amon', name: 'Amon-Ra St. Brown', team: 'DET', position: 'WR', adp: 14.5, tier: 2, notes: 'PPR machine, Jared loves him' },
  { id: 'josh', name: 'Josh Allen', team: 'BUF', position: 'QB', adp: 22.7, tier: 1, notes: 'Rushing TDs for days' },
  { id: 'nabers', name: 'Malik Nabers', team: 'NYG', position: 'WR', adp: 18.9, tier: 2, notes: 'Rookie hype is real, targets are realer' },
  { id: 'breece', name: 'Breece Hall', team: 'NYJ', position: 'RB', adp: 16.3, tier: 2, notes: 'Explosive when the Jets remember they have an offense' },
  { id: 'puka', name: 'Puka Nacua', team: 'LAR', position: 'WR', adp: 11.2, tier: 2, notes: 'McVay\'s favorite target' },
  { id: 'bowers', name: 'Brock Bowers', team: 'LV', position: 'TE', adp: 48.6, tier: 2, notes: 'Rookie TEs are risky but this kid is different' },
  { id: 'henry', name: 'Derrick Henry', team: 'BAL', position: 'RB', adp: 24.8, tier: 2, notes: 'Tractorcito in Lamar\'s offense, yes please' },
  { id: 'drake', name: 'Drake London', team: 'ATL', position: 'WR', adp: 32.4, tier: 3, notes: 'Penix might actually throw to him' },
  { id: 'kyren', name: 'Kyren Williams', team: 'LAR', position: 'RB', adp: 26.1, tier: 2, notes: 'Goal line vulture with a McVay seal of approval' },
  { id: 'chase', name: 'Ja\'Marr Chase', team: 'CIN', position: 'WR', adp: 2.4, tier: 1, notes: 'Elite WR1, Burrow\'s WR1, your WR1' },
]

export function getPlayersByPosition(position: Position | 'ALL'): Player[] {
  if (position === 'ALL') return [...PLAYERS].sort((a, b) => a.adp - b.adp)
  return PLAYERS.filter((p) => p.position === position).sort((a, b) => a.adp - b.adp)
}

export function searchPlayers(query: string, position?: Position | 'ALL'): Player[] {
  const pool = position ? getPlayersByPosition(position) : getPlayersByPosition('ALL')
  const q = query.toLowerCase().trim()
  if (!q) return pool
  return pool.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.team.toLowerCase().includes(q) ||
      p.position.toLowerCase().includes(q)
  )
}
