#!/bin/bash
set -e

echo "Deployment started..."

# Pull the latest version of the app
git pull origin main
echo "New changes copied to the server!"

echo "Installing dependencies..."
npm install

echo "Creating a Production Build..."
npm run build

echo "PM2 Reload"
pm2 reload 0

echo "Deployment finished!"