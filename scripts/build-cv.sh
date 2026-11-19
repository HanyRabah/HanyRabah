#!/usr/bin/env bash
# Build Hany_ElSaydawy_CV.pdf from CV.md using pandoc + weasyprint.
# Run from repo root:  bash scripts/build-cv.sh
set -euo pipefail

cd "$(dirname "$0")/.."
ROOT="$(pwd)"

TMP_HTML=$(mktemp -t cv-XXXX).html
trap 'rm -f "$TMP_HTML"' EXIT

pandoc CV.md \
  --standalone \
  --from gfm \
  --to html5 \
  --metadata title="Hany El Saydawy — CV" \
  -o "$TMP_HTML"

weasyprint \
  --stylesheet "$ROOT/scripts/cv-style.css" \
  "$TMP_HTML" \
  "$ROOT/public/Hany_ElSaydawy_CV.pdf"

echo "Built: public/Hany_ElSaydawy_CV.pdf"
