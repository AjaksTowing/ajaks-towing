#!/bin/bash
set -e

echo "Deployment started..."

# Pull the latest version of the app
git pull origin master
echo "New changes copied to the server!"

echo "Installing dependencies..."
bun install

echo "Creating a Production Build..."
bun run build

echo "PM2 Reload"
pm2 reload 0

echo "Deployment finished!"