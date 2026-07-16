import type { Player, KaseyVerdict } from '../types'

const CATCH_PHRASES = [
  'Told you so',
  'Just trust me',
  'I knew that',
  'Mumbled words',
  'See? I literally called this',
  'Don\'t overthink it',
  'I had a feeling about this one',
  'My gut has never been wrong (it has)',
  'The vibes don\'t lie',
  'I\'m not saying I\'m a genius, but...',
  'This is obvious if you\'ve been paying attention',
  'I whispered this pick to myself last Tuesday',
  'Trust the process (my process)',
  'I\'ve been saying this since the combine',
  'Look, I don\'t make the rules, I just predict them',
] as const

const HEADLINES = [
  (winner: string) => `Draft ${winner}. Not even close.`,
  (winner: string) => `${winner} is the move. I knew that.`,
  (winner: string) => `It's ${winner}. Just trust me.`,
  (winner: string) => `${winner}. Told you so (in advance).`,
  (winner: string) => `Easy call: ${winner}.`,
  (winner: string) => `${winner} — the vibes are immaculate.`,
  (winner: string) => `Lock in ${winner} and thank me later.`,
]

const REASONING_TEMPLATES = [
  (winner: Player, loser: Player) =>
    `Look, ${loser.name} is fine. I guess. But ${winner.name} is on another level and if you pass on them you're gonna hear "told you so" from me all season. ADP ${winner.adp} vs ${loser.adp}? The numbers don't lie, and neither do I (they sometimes do).`,
  (winner: Player, loser: Player) =>
    `${winner.name} (${winner.team}) has the edge here. ${loser.name}? *mumbled words* ... anyway, ${winner.name} is the pick. Tier ${winner.tier} beats tier ${loser.tier}. I knew that before you even opened this app.`,
  (winner: Player, loser: Player) =>
    `I'm not gonna sit here and explain fantasy football to you, but ${winner.name} is clearly the better draft pick. ${loser.notes} — sure. But ${winner.notes}. Just trust me on this one.`,
  (winner: Player, loser: Player) =>
    `Everyone in your league is gonna debate this for 45 minutes. I'll save you the time: take ${winner.name}. ${loser.name} will have a week where they go off and you'll feel smart, then ${winner.name} will outscore them by 80 points over the season. Told you so.`,
  (winner: Player, loser: Player) =>
    `The ${winner.position} position is thin enough without overthinking it. ${winner.name} at ADP ${winner.adp} is a gift. ${loser.name} at ${loser.adp}? That's how you end up emailing me in week 8 asking for waiver wire help.`,
  (winner: Player, loser: Player) =>
    `My sources (me, talking to myself) say ${winner.name} is the play. ${loser.name} has "boom or bust" energy and I don't need that stress in my life or yours. Draft ${winner.name} and let's move on.`,
]

const KASEY_QUOTES = [
  (winner: string) => `"${winner}... yeah. That's the one. *nods confidently while knowing nothing about their bye week*"`,
  (winner: string) => `"I had ${winner} on my board before it was cool. Actually I had everyone on my board. But especially ${winner}."`,
  (winner: string) => `"Take ${winner}. If it doesn't work out, I never said that. If it does work out, I TOLD YOU SO."`,
  (winner: string) => `"*mumbled words* ... anyway yeah go ${winner}, I feel it in my bones. Or maybe that was lunch."`,
  (winner: string) => `"Just trust me on ${winner}. I've been playing fantasy for... a while. The exact number is classified."`,
  (winner: string) => `"${winner}. I knew that. I've known it. I'll know it again next year when we do this same comparison."`,
]

function pickRandom<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function scorePlayer(player: Player): number {
  // Lower ADP = better. Tier matters. Add tiny randomness for "Kasey intuition"
  const adpScore = 200 - player.adp
  const tierBonus = (4 - player.tier) * 15
  const gutFeeling = Math.random() * 20
  return adpScore + tierBonus + gutFeeling
}

export function getKaseyAdvice(playerA: Player, playerB: Player): KaseyVerdict {
  const scoreA = scorePlayer(playerA)
  const scoreB = scorePlayer(playerB)
  const pick = scoreA >= scoreB ? playerA : playerB
  const other = pick.id === playerA.id ? playerB : playerA
  const margin = Math.abs(scoreA - scoreB)
  const confidence = Math.min(98, Math.max(62, Math.round(65 + margin * 1.5)))

  return {
    pick,
    confidence,
    headline: pickRandom(HEADLINES)(pick.name),
    reasoning: pickRandom(REASONING_TEMPLATES)(pick, other),
    catchPhrase: pickRandom(CATCH_PHRASES),
    kaseyQuote: pickRandom(KASEY_QUOTES)(pick.name),
  }
}

export { CATCH_PHRASES }
