#!/bin/bash

# Octavia Travel - Launch Script
echo "🚢 Launching Octavia Travel - Luxury Mobile Web Application..."
echo "✨ Crafting Exclusive Experiences"
echo ""

# Check if Python is available
if command -v python3 &> /dev/null; then
    echo "🐍 Starting server with Python 3..."
    echo "📱 Open http://localhost:8000 in your mobile browser"
    echo "🔒 For PWA features, use HTTPS in production"
    echo ""
    echo "Press Ctrl+C to stop the server"
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "🐍 Starting server with Python..."
    echo "📱 Open http://localhost:8000 in your mobile browser"
    echo "🔒 For PWA features, use HTTPS in production"
    echo ""
    echo "Press Ctrl+C to stop the server"
    python -m http.server 8000
elif command -v php &> /dev/null; then
    echo "🐘 Starting server with PHP..."
    echo "📱 Open http://localhost:8000 in your mobile browser"
    echo "🔒 For PWA features, use HTTPS in production"
    echo ""
    echo "Press Ctrl+C to stop the server"
    php -S localhost:8000
else
    echo "❌ No suitable web server found."
    echo "Please install Python or PHP, or use:"
    echo "   npx http-server"
    echo "   or any other web server"
fi