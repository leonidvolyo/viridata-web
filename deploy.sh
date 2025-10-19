#!/bin/bash

# Viridata GitHub Deployment Script
# This script helps you push changes to GitHub for automatic deployment

echo "🚀 Viridata Website Deployment"
echo "================================"
echo ""

# Check if we're in the right directory
if [ ! -d "/app/frontend" ]; then
    echo "❌ Error: Please run this script from /app directory"
    exit 1
fi

cd /app

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    git branch -M main
fi

# Check if remote exists
if ! git remote | grep -q "origin"; then
    echo "🔗 Adding GitHub remote..."
    git remote add origin https://github.com/leonidvolyo/viridata-web.git
fi

# Get commit message
echo "📝 Enter commit message (or press Enter for default):"
read commit_message

if [ -z "$commit_message" ]; then
    commit_message="Update Viridata website - $(date '+%Y-%m-%d %H:%M')"
fi

echo ""
echo "📋 Staging changes..."
git add .

echo "💾 Creating commit: $commit_message"
git commit -m "$commit_message"

echo "⬆️  Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "🌐 Your site will be deployed in 2-3 minutes at:"
    echo "   https://leonidvolyo.github.io/viridata-web/"
    echo ""
    echo "📊 Check deployment status:"
    echo "   https://github.com/leonidvolyo/viridata-web/actions"
else
    echo ""
    echo "❌ Failed to push to GitHub"
    echo "💡 You may need to authenticate or check your repository settings"
fi
