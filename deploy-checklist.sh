#!/bin/bash

# Pre-deployment Checklist & Deploy Script for Viridata

echo "🔍 Pre-Deployment Checklist"
echo "============================"
echo ""

# Check if we're in the right directory
if [ ! -d "/app/frontend" ]; then
    echo "❌ Error: Please run from /app directory"
    exit 1
fi

cd /app

echo "✅ Checking required files..."

# Check workflow
if [ -f ".github/workflows/deploy.yml" ]; then
    if grep -q "node-version: \"20\"" .github/workflows/deploy.yml; then
        echo "  ✓ Workflow configured with Node 20"
    else
        echo "  ⚠ Warning: Workflow not using Node 20"
    fi
else
    echo "  ✗ Workflow file missing"
fi

# Check .env.production
if [ -f "frontend/.env.production" ]; then
    if grep -q "PUBLIC_URL=/viridata-web" frontend/.env.production; then
        echo "  ✓ .env.production configured correctly"
    else
        echo "  ⚠ Warning: PUBLIC_URL not set correctly"
    fi
else
    echo "  ✗ .env.production missing"
fi

# Check App.js
if grep -q 'basename="/viridata-web"' frontend/src/App.js; then
    echo "  ✓ App.js has correct basename"
else
    echo "  ⚠ Warning: basename not set in App.js"
fi

# Check 404.html
if [ -f "frontend/public/404.html" ]; then
    echo "  ✓ 404.html exists for SPA routing"
else
    echo "  ⚠ Warning: 404.html missing"
fi

# Check yarn.lock
if [ -f "frontend/yarn.lock" ]; then
    echo "  ✓ yarn.lock exists"
else
    echo "  ⚠ Warning: yarn.lock missing"
fi

echo ""
echo "📦 Running local build test..."
cd frontend
if PUBLIC_URL=/viridata-web yarn build > /tmp/build.log 2>&1; then
    echo "  ✓ Local build successful!"
    
    # Check build output
    if [ -f "build/index.html" ] && [ -d "build/static" ]; then
        echo "  ✓ Build output verified"
        
        # Check if paths are correct
        if grep -q '"/viridata-web/static' build/index.html; then
            echo "  ✓ Asset paths correct in build"
        else
            echo "  ⚠ Warning: Asset paths may be incorrect"
        fi
    else
        echo "  ✗ Build output incomplete"
    fi
else
    echo "  ✗ Build failed - check /tmp/build.log"
    exit 1
fi

cd /app

echo ""
echo "🚀 Ready to Deploy!"
echo "===================="
echo ""
echo "Deployment URL: https://leonidvolyo.github.io/viridata-web/"
echo ""
echo "Do you want to deploy now? (y/n)"
read -r response

if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    echo ""
    echo "📝 Enter commit message (or press Enter for default):"
    read -r commit_message
    
    if [ -z "$commit_message" ]; then
        commit_message="Deploy Viridata website - $(date '+%Y-%m-%d %H:%M')"
    fi
    
    echo ""
    echo "🔄 Staging changes..."
    git add .
    
    echo "💾 Creating commit..."
    git commit -m "$commit_message"
    
    echo "⬆️  Pushing to GitHub..."
    if git push origin main; then
        echo ""
        echo "✅ Successfully deployed!"
        echo ""
        echo "📊 Monitor deployment:"
        echo "   https://github.com/leonidvolyo/viridata-web/actions"
        echo ""
        echo "🌐 Your site will be live in 2-3 minutes at:"
        echo "   https://leonidvolyo.github.io/viridata-web/"
        echo ""
        echo "💡 Tip: Press F12 in browser to verify no errors"
    else
        echo ""
        echo "❌ Push failed"
        echo "💡 You may need to authenticate or check repository permissions"
        exit 1
    fi
else
    echo ""
    echo "⏸️  Deployment cancelled"
    echo "💡 Run './deploy-checklist.sh' when ready"
fi
