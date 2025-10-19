# 🚀 Quick Deployment Guide

## What I've Set Up For You:

✅ **GitHub Actions Workflow** (`.github/workflows/deploy.yml`)
- Automatically builds and deploys when you push to `main` branch

✅ **Updated package.json** with correct homepage URL
- `"homepage": "https://leonidvolyo.github.io/viridata-web"`

✅ **Deployment Script** (`deploy.sh`)
- Easy one-command deployment

---

## 🎯 Deploy Now (Choose One Method):

### Method 1: Using Deployment Script (Easiest)
```bash
cd /app
./deploy.sh
```

### Method 2: Manual Git Commands
```bash
cd /app
git add .
git commit -m "Deploy Viridata website"
git push origin main
```

---

## 🔧 First Time Setup:

If you haven't connected to GitHub yet:

```bash
cd /app
git init
git add .
git commit -m "Initial commit: Viridata website"
git remote add origin https://github.com/leonidvolyo/viridata-web.git
git branch -M main
git push -u origin main
```

---

## 📊 Check Deployment Status:

1. **GitHub Actions:** https://github.com/leonidvolyo/viridata-web/actions
2. **Your Live Site:** https://leonidvolyo.github.io/viridata-web/

---

## ⚡ Why Previous Deployment May Have Failed:

1. **Missing Homepage URL** - ✅ Fixed
2. **Wrong Build Path** - ✅ Fixed in workflow
3. **PUBLIC_URL not set** - ✅ Fixed in workflow

---

## 🎉 What Happens After You Push:

1. GitHub receives your code
2. GitHub Actions workflow starts automatically
3. Installs dependencies (`yarn install`)
4. Builds your React app (`yarn build`)
5. Deploys to GitHub Pages
6. **Site is live in 2-3 minutes!**

---

## 💡 Pro Tips:

- **Always check Actions tab** for deployment status
- **Green checkmark** = Successful deployment
- **Red X** = Check logs for errors
- Every push to `main` triggers automatic deployment

---

**Repository:** https://github.com/leonidvolyo/viridata-web
**Live Site:** https://leonidvolyo.github.io/viridata-web/
