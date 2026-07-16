# KaseyPros

**Who Should I Draft?** — but the advice comes from your friend Kasey.

A parody of FantasyPros' player comparison tool, powered by gut feelings, iconic catch phrases, and zero accountability.

## Catch Phrases

- Told you so
- Just trust me
- I knew that
- *Mumbled words*
- And more...

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and compare two players. Hit **Ask Kasey** for the verdict.

## Adding Kasey Photos

### GitHub web upload failing?

If you see *"Something went really wrong, and we can't process that file"*, it's usually one of these:

1. **iPhone HEIC format** — GitHub doesn't accept `.heic`. Convert to JPG first.
2. **File too large** — Keep images under **500 KB** for web uploads (under 1 MB is safest).
3. **Huge PNG** — PNGs from screenshots or AI images can be several MB. Use JPG instead.

### Recommended workflow

**Option A — Prepare locally, then commit via git (best):**

```bash
pip install Pillow
python3 scripts/prepare-image.py ~/Downloads/your-kasey-photo.heic
git add public/images/kasey/kasey.jpg
git commit -m "Update Kasey photo"
git push
```

**Option B — Quick convert on Mac:**

Open the photo in Preview → File → Export → Format: JPEG → Quality ~80% → save as `kasey.jpg`

**Option C — Online converter:**

Upload your HEIC/large file to a converter (e.g. cloudconvert.com), export as JPEG, then add via git.

> Avoid dragging large files into the GitHub website UI — use `git add` + `git push` instead. Git handles binary files fine; the web uploader is picky.

The app loads `public/images/kasey/kasey.jpg` by default.

## Stack

- React 19 + TypeScript
- Vite 6

## Disclaimer

Not affiliated with FantasyPros. Or accuracy. Or Kasey's actual opinions.
