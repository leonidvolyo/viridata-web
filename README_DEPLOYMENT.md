# Viridata Website - GitHub Pages Deployment

## 🚀 Automatic Deployment Setup

Your website will automatically deploy to GitHub Pages when you push to the `main` branch!

**Live URL:** https://leonidvolyo.github.io/viridata-web/

---

## 📋 How to Deploy

### Automatic Deployment (Recommended)
Simply push your changes to GitHub:

```bash
git add .
git commit -m "Update website"
git push origin main
```

The GitHub Actions workflow will automatically:
1. Build your React app
2. Deploy to GitHub Pages
3. Your site will be live in ~2-3 minutes

---

## 🔧 Setup Instructions (One-Time)

If you haven't already, follow these steps:

### 1. Initialize Git Repository (if not done)
```bash
cd /app
git init
git add .
git commit -m "Initial commit: Viridata website"
```

### 2. Connect to GitHub Repository
```bash
git remote add origin https://github.com/leonidvolyo/viridata-web.git
git branch -M main
git push -u origin main
```

### 3. Enable GitHub Pages
1. Go to: https://github.com/leonidvolyo/viridata-web/settings/pages
2. Under "Source", select: **GitHub Actions**
3. Save

---

## 📁 Files to Push

Make sure to push these files from `/app`:

```
/app/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json           # Updated with homepage URL
│   └── ...
└── README_DEPLOYMENT.md       # This file
```

---

## ✅ Verification Checklist

After pushing, verify:

1. **GitHub Actions Running**
   - Go to: https://github.com/leonidvolyo/viridata-web/actions
   - You should see a workflow running
   - Wait for green checkmark (✓)

2. **Site is Live**
   - Visit: https://leonidvolyo.github.io/viridata-web/
   - Site should load with all images and styling

3. **Future Deployments**
   - Any push to `main` branch triggers automatic deployment
   - Check Actions tab for deployment status

---

## 🐛 Troubleshooting

### Issue: Workflow fails during build
**Solution:** Check the Actions tab for error logs. Common fixes:
```bash
cd frontend
yarn install
yarn build
```

### Issue: Site shows 404 or blank page
**Solution:** Verify `homepage` in `package.json`:
```json
"homepage": "https://leonidvolyo.github.io/viridata-web"
```

### Issue: Images or CSS not loading
**Solution:** GitHub Pages is configured with correct PUBLIC_URL in workflow

---

## 📝 Making Updates

To update your website:

1. **Edit files locally** in `/app/frontend/src/`
2. **Test locally:** `cd frontend && yarn start`
3. **Commit changes:**
   ```bash
   git add .
   git commit -m "Description of changes"
   ```
4. **Push to GitHub:**
   ```bash
   git push origin main
   ```
5. **Wait 2-3 minutes** for automatic deployment

---

## 🔐 Repository Settings

Your repository is currently: **Public**

To make it private:
1. Go to: https://github.com/leonidvolyo/viridata-web/settings
2. Scroll to "Danger Zone"
3. Click "Change visibility" → "Make private"
4. GitHub Pages will still work!

---

## 📞 Support

If you encounter issues:
1. Check GitHub Actions logs
2. Verify all files are pushed
3. Ensure GitHub Pages is set to "GitHub Actions" source

---

**Last Updated:** January 2025
**Repository:** https://github.com/leonidvolyo/viridata-web
**Live Site:** https://leonidvolyo.github.io/viridata-web/
