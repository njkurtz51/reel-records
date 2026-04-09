#!/bin/bash
cd "$(dirname "$0")"
echo ""
echo "  Starting Reel Records..."
echo ""

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "  Installing dependencies (first time only)..."
  npm install
fi

# Open the browser after a short delay
(sleep 3 && open http://localhost:5173) &

# Start the dev server
npx vite
