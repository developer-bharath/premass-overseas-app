#!/bin/bash

# PREMASS Admin Dashboard - Backend Quick Start Script
# This script sets up and starts the backend server

set -e

echo "================================"
echo "PREMASS Admin Dashboard - Backend Setup"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm version: $(npm -v)"
echo ""

# Navigate to backend directory
cd "$(dirname "$0")"

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Creating from .env.example..."
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo "✅ Created .env file. Please update it with your configuration."
    else
        echo "❌ .env.example not found!"
        exit 1
    fi
fi

echo "📦 Installing dependencies..."
npm install

echo ""
echo "================================"
echo "Setup Complete!"
echo "================================"
echo ""
echo "📋 Configuration:"
echo "   - Environment file: .env"
echo "   - Port: 3001 (or update PORT in .env)"
echo ""

# Check MongoDB connection
echo "🔍 Checking MongoDB connection..."
MONGODB_URI=$(grep "MONGODB_URI" .env | cut -d'=' -f2-)

if [[ "$MONGODB_URI" == "mongodb://localhost:27017"* ]]; then
    if ! command -v mongod &> /dev/null; then
        echo ""
        echo "⚠️  MongoDB is not installed or not in PATH."
        echo "   Please start MongoDB manually:"
        echo "   brew services start mongodb-community  # macOS"
        echo "   sudo systemctl start mongodb            # Linux"
        echo "   Or use Docker: docker run -p 27017:27017 mongo"
        echo ""
    else
        echo "✅ MongoDB found in PATH"
        echo "   Make sure MongoDB service is running:"
        echo "   brew services start mongodb-community  # macOS"
    fi
elif [[ "$MONGODB_URI" == *"mongodb+srv"* ]]; then
    echo "✅ Using MongoDB Atlas (Cloud)"
else
    echo "✅ Custom MongoDB URI configured"
fi

echo ""
echo "================================"
echo "Ready to Start!"
echo "================================"
echo ""
echo "To start the server, run:"
echo "  npm run dev    (Development with auto-reload)"
echo "  npm start      (Production)"
echo ""
echo "The API will be available at:"
echo "  http://localhost:3001/api/v1"
echo ""
