# 🚀 GitHub Pages Deployment Guide

This guide explains how to deploy your app to GitHub Pages with environment variables.

## Understanding the Build Process

**Important Concept:**
- `.env` files are used during **BUILD TIME** only
- When you run `npm run build`, Vite embeds the environment variable values into the JavaScript bundle
- GitHub Pages only hosts the **built files** (the `dist/` folder)
- The `.env` file itself is never uploaded to GitHub Pages

## Deployment Options

---

## ✅ Option 1: Manual Deployment (Current Method)

This is what you're likely doing now with `npm run deploy`.

### Steps:

**1. Create `.env` file locally** (if you haven't already):

```bash
# Create the file in your project root
VITE_GEMINI_API_KEY=your_actual_gemini_key_here
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**2. Deploy as usual:**

```bash
npm run deploy
```

**What happens behind the scenes:**
1. `predeploy` script runs → executes `npm run build`
2. Vite reads your local `.env` file
3. Vite replaces `import.meta.env.VITE_GEMINI_API_KEY` with the actual value in the code
4. Creates optimized bundle in `dist/` folder **with keys embedded**
5. `gh-pages -d dist` pushes the `dist/` folder to the `gh-pages` branch
6. GitHub Pages serves the files from `gh-pages` branch

**Pros:**
- ✅ Simple - no configuration needed
- ✅ Works immediately
- ✅ You control when deployments happen

**Cons:**
- ⚠️ Must build locally each time
- ⚠️ Can't deploy from other machines without `.env` file

---

## ✅ Option 2: GitHub Actions (Automated)

Use GitHub Actions to automatically build and deploy when you push code.

### Setup Steps:

**1. Add secrets to GitHub repository:**

Go to your GitHub repository:
- Click **Settings** → **Secrets and variables** → **Actions**
- Click **New repository secret**
- Add two secrets:
  - Name: `VITE_GEMINI_API_KEY`, Value: `your_actual_key`
  - Name: `VITE_GA_MEASUREMENT_ID`, Value: `G-XXXXXXXXXX`

**2. The workflow file is already created:**

I've created `.github/workflows/deploy.yml` for you. It will:
- Run automatically when you push to `main` branch
- Install dependencies
- Build with environment variables from GitHub Secrets
- Deploy to GitHub Pages

**3. Enable GitHub Pages:**

- Go to **Settings** → **Pages**
- Under **Source**, select: **GitHub Actions**

**4. Push your code:**

```bash
git add .
git commit -m "Add GitHub Actions deployment"
git push origin main
```

**What happens:**
1. Push triggers the GitHub Action
2. Action reads secrets from GitHub Secrets (not from .env)
3. Builds the app with those secrets
4. Deploys to GitHub Pages automatically

**Pros:**
- ✅ Fully automated deployment
- ✅ Secrets stored securely in GitHub
- ✅ Can deploy from any machine
- ✅ Build happens in the cloud

**Cons:**
- ⚠️ Requires initial GitHub setup
- ⚠️ Uses GitHub Actions minutes (free for public repos)

---

## 🔐 Security Considerations

### Is it safe to have API keys in the JavaScript bundle?

**For Google Gemini API - YES, with proper restrictions:**

1. **Set API Key Restrictions in Google Cloud Console:**
   - Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Click on your API key → Application restrictions
   - **Set HTTP referrers**: Add `ashfaque-rifaye.github.io/*`
   - This ensures the key ONLY works from your domain

2. **Set Usage Quotas:**
   - Set daily/monthly quotas
   - Prevents abuse even if someone extracts the key

3. **Client-side API keys are normal for:**
   - Google Maps API
   - Google Gemini/AI
   - Firebase
   - Many other Google services

### ⚠️ Don't Use This Approach For:
- Payment processor keys (Stripe secret keys)
- Database credentials
- Admin tokens
- Any backend secrets

For those, you'd need a backend API/serverless function.

---

## Troubleshooting

### Issue: "API key is undefined on GitHub Pages"

**Cause:** The environment variable wasn't available during build.

**Solution:**
- **Option 1 users:** Make sure `.env` exists locally when you run `npm run deploy`
- **Option 2 users:** Verify secrets are set in GitHub Settings → Secrets

### Issue: "App works locally but not on GitHub Pages"

**Check:**

1. **Built files are up to date:**
   ```bash
   npm run build
   npm run deploy
   ```

2. **Environment variables in `.env`:**
   ```env
   VITE_GEMINI_API_KEY=actual_key_here  # No quotes needed
   ```

3. **Console errors:**
   - Open your deployed site
   - Press F12 → Console tab
   - Look for API errors

### How to verify keys are embedded:

**Option A - Check the built files:**
```bash
# After building locally
npm run build

# Search for your key in the built files (PowerShell)
Select-String -Path "dist/assets/*.js" -Pattern "generativelanguage"
```

**Option B - Check network tab:**
- Open deployed site → F12 → Network tab
- Try using the AI assistant
- Check the request to `generativelanguage.googleapis.com`
- If the request has `?key=AIza...` then it's working

---

## Recommended Workflow

### For Solo Development (Option 1):
```bash
# 1. Make changes to your code
# 2. Test locally
npm run dev

# 3. Deploy when ready
npm run deploy
```

### For Team/Production (Option 2):
```bash
# 1. Make changes to your code
# 2. Test locally
npm run dev

# 3. Commit and push
git add .
git commit -m "Your changes"
git push origin main

# 4. GitHub Actions automatically builds and deploys
```

---

## Which Option Should You Use?

**Use Option 1 (Manual) if:**
- ✅ You're the only developer
- ✅ You want simple, no-config deployment
- ✅ You're okay building locally

**Use Option 2 (GitHub Actions) if:**
- ✅ You want automated deployments
- ✅ Multiple people work on the project
- ✅ You want proper CI/CD pipeline
- ✅ You don't want to install dependencies locally every time

---

## Current Status

Based on your `package.json`, you're using **Option 1** with `gh-pages`. 

**To continue with Option 1:**
1. Create `.env` file locally with your keys
2. Run `npm run deploy` as usual
3. ✅ Done!

**To switch to Option 2:**
1. Follow the GitHub Actions setup above
2. Remove `gh-pages` dependency (optional)
3. Push code and let GitHub Actions handle deployment

---

Need help? Let me know which option you prefer and I can guide you through it!
