#!/usr/bin/env python3
"""Regenerate src/data/players.ts from FantasyPros ADP CSV."""

from __future__ import annotations

import csv
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_CSV = ROOT / 'src/data/adp-rankings.csv'
OUT_TS = ROOT / 'src/data/players.ts'


def slugify(name: str) -> str:
    s = name.lower()
    s = re.sub(r'[^a-z0-9]+', '-', s)
    return s.strip('-')[:48]


def parse_pos(pos_field: str) -> str | None:
    m = re.match(r'(QB|RB|WR|TE)', pos_field.strip())
    return m.group(1) if m else None


def parse_player_field(field: str) -> tuple[str, str]:
    field = field.strip()
    m = re.match(r'^(.+?)\s{2,}([A-Z]{2,3})\s*\(\d+\)$', field)
    if m:
        return m.group(1).strip(), m.group(2)
    return field, 'FA'


def tier_from_adp(adp: float) -> int:
    if adp <= 12:
        return 1
    if adp <= 36:
        return 2
    if adp <= 72:
        return 3
    return 4


def esc(s: str) -> str:
    return s.replace('\\', '\\\\').replace("'", "\\'")


def generate(csv_path: Path) -> int:
    players: list[tuple[str, str, str, str, float, int]] = []
    seen_ids: set[str] = set()

    with csv_path.open(newline='', encoding='utf-8') as f:
        for row in csv.DictReader(f):
            pos = parse_pos(row['POS'])
            if not pos:
                continue
            adp = float(row['AVG'])
            name, team = parse_player_field(row['Player (Bye)'])
            base_id = slugify(name)
            pid = base_id
            n = 2
            while pid in seen_ids:
                pid = f'{base_id}-{n}'
                n += 1
            seen_ids.add(pid)
            players.append((pid, name, team, pos, adp, tier_from_adp(adp)))

    lines = [
        "import type { Player, Position } from '../types'",
        '',
        'export const PLAYERS: Player[] = [',
    ]
    for pid, name, team, pos, adp, tier in players:
        note = f'ADP {adp:.0f} — FantasyPros 2026'
        lines.append(
            f"  {{ id: '{esc(pid)}', name: '{esc(name)}', team: '{team}', "
            f"position: '{pos}', adp: {adp}, tier: {tier}, notes: '{esc(note)}' }},"
        )
    lines.extend([
        ']',
        '',
        "export function getPlayersByPosition(position: Position | 'ALL'): Player[] {",
        "  if (position === 'ALL') return [...PLAYERS].sort((a, b) => a.adp - b.adp)",
        '  return PLAYERS.filter((p) => p.position === position).sort((a, b) => a.adp - b.adp)',
        '}',
        '',
        "export function searchPlayers(query: string, position?: Position | 'ALL'): Player[] {",
        "  const pool = position ? getPlayersByPosition(position) : getPlayersByPosition('ALL')",
        '  const q = query.toLowerCase().trim()',
        '  if (!q) return pool',
        '  return pool.filter(',
        '    (p) =>',
        '      p.name.toLowerCase().includes(q) ||',
        '      p.team.toLowerCase().includes(q) ||',
        "      p.position.toLowerCase().includes(q)",
        '  )',
        '}',
        '',
    ])
    OUT_TS.write_text('\n'.join(lines))
    return len(players)


def main() -> None:
    csv_path = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_CSV
    if not csv_path.exists():
        print(f'CSV not found: {csv_path}', file=sys.stderr)
        sys.exit(1)
    count = generate(csv_path)
    print(f'Generated {count} players → {OUT_TS}')


if __name__ == '__main__':
    main()
