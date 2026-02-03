#!/bin/bash

# Optimus Portfolio Analyzer - Startup Script

echo "🚀 Starting Optimus Portfolio Analyzer..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

# Start the server
echo "📡 Starting server..."
npm start