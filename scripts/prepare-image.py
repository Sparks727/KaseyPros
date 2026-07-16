#!/usr/bin/env python3
"""Prepare a photo for GitHub and the KaseyPros site.

GitHub's web uploader often rejects:
  - iPhone HEIC photos
  - Files over ~1-2 MB
  - Certain PNG/WebP variants

Usage:
  python3 scripts/prepare-image.py path/to/your-photo.heic
  python3 scripts/prepare-image.py path/to/kasey.jpg --output public/images/kasey/kasey.jpg
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Install Pillow first: pip install Pillow", file=sys.stderr)
    sys.exit(1)

MAX_WIDTH = 1200
JPEG_QUALITY = 85
MAX_RECOMMENDED_KB = 500


def prepare_image(source: Path, output: Path) -> None:
    img = Image.open(source)
    if img.mode not in ("RGB", "L"):
        img = img.convert("RGB")

    if img.width > MAX_WIDTH:
        ratio = MAX_WIDTH / img.width
        img = img.resize((MAX_WIDTH, int(img.height * ratio)), Image.Resampling.LANCZOS)

    output.parent.mkdir(parents=True, exist_ok=True)
    img.save(output, "JPEG", quality=JPEG_QUALITY, optimize=True)

    size_kb = output.stat().st_size / 1024
    print(f"Saved {output} ({img.width}x{img.height}, {size_kb:.0f} KB)")
    if size_kb > MAX_RECOMMENDED_KB:
        print(f"Warning: still over {MAX_RECOMMENDED_KB} KB — try a smaller source or lower quality.")


def main() -> None:
    parser = argparse.ArgumentParser(description="Convert and resize an image for GitHub.")
    parser.add_argument("source", type=Path, help="Input image (JPG, PNG, HEIC, WebP, etc.)")
    parser.add_argument(
        "--output",
        type=Path,
        default=Path("public/images/kasey/kasey.jpg"),
        help="Output JPEG path (default: public/images/kasey/kasey.jpg)",
    )
    args = parser.parse_args()

    if not args.source.exists():
        print(f"File not found: {args.source}", file=sys.stderr)
        sys.exit(1)

    prepare_image(args.source, args.output)


if __name__ == "__main__":
    main()
