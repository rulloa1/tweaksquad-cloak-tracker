#!/bin/bash

# TweakSquad Cloak Tracker Deployment Script
echo "🚀 TweakSquad Cloak Tracker Deployment"
echo "=====================================?"

# Check if public directory exists
if [ ! -d "public" ]; then
    echo "❌ Error: public directory not found"
    exit 1
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Validate PHP files
echo "🔍 Validating PHP files..."
php -l public/admin.php
php -l public/logger.php

if [ $? -ne 0 ]; then
    echo "❌ PHP validation failed"
    exit 1
fi

# Check file permissions
echo "🔐 Setting file permissions..."
chmod 644 public/*.php
chmod 644 public/*.html
chmod 644 public/.htaccess
chmod 755 public/

# Create log files if they don't exist
if [ ! -f "public/log.csv" ]; then
    echo "📝 Creating log.csv from template..."
    if [ -f "public/log.csv.template" ]; then
        cp public/log.csv.template public/log.csv
    else
        touch public/log.csv
    fi
    chmod 666 public/log.csv
fi

if [ ! -f "public/redirect_log.csv" ]; then
    echo "📝 Creating redirect_log.csv from template..."
    if [ -f "public/redirect_log.csv.template" ]; then
        cp public/redirect_log.csv.template public/redirect_log.csv
    else
        touch public/redirect_log.csv
    fi
    chmod 666 public/redirect_log.csv
fi

echo "✅ Deployment preparation complete!"
echo ""
echo "📋 Next steps:"
echo "1. Set ACCESS_KEY environment variable"
echo "2. Upload public/ directory to your web server"
echo "3. Ensure Apache mod_headers and mod_deflate are enabled"
echo "4. Test admin panel access"
echo ""
echo "🔗 Admin Panel: /admin.php?key=YOUR_ACCESS_KEY"
echo "🔗 Tracker Page: /tracker.html"