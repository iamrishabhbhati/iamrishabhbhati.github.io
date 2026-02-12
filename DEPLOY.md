# How to Put This Website on GitHub Pages

A simple step-by-step guide to get your portfolio live on the internet.

---

## What You Need

- A GitHub account (you already have one: **iamrishabhbhati**)
- Git installed on your computer ([download here](https://git-scm.com/downloads) if you don't have it)

---

## Step 1 — Create a Repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: **`iamrishabhbhati.github.io`**
   - This special name makes it your main personal site
   - Your site will be at `https://iamrishabhbhati.github.io`
3. Set it to **Public**
4. Do **NOT** check "Add a README" or anything else — leave it empty
5. Click **Create repository**

> **Alternative:** If you want a different URL like `iamrishabhbhati.github.io/portfolio`, name the repo `portfolio` instead. The steps below are the same.

---

## Step 2 — Push Your Code

Open a terminal (Command Prompt, PowerShell, or Git Bash) in your `Personal_Website` folder and run these commands one by one:

```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/iamrishabhbhati/iamrishabhbhati.github.io.git
git push -u origin main
```

> If you chose a different repo name like `portfolio`, replace `iamrishabhbhati.github.io.git` with `portfolio.git` in the remote URL.

---

## Step 3 — Enable GitHub Pages

1. Go to your repo on GitHub
2. Click **Settings** (the gear icon tab)
3. In the left sidebar, click **Pages**
4. Under "Build and deployment":
   - **Source:** Deploy from a branch
   - **Branch:** `main`
   - **Folder:** `/ (root)`
5. Click **Save**

---

## Step 4 — Wait and Visit

- GitHub takes **1-2 minutes** to build your site
- Visit your site at: **https://iamrishabhbhati.github.io**
- If it shows a 404, wait a minute and refresh

---

## How to Update Your Site Later

Every time you make changes, run these commands to push the update:

```bash
git add .
git commit -m "describe what you changed"
git push
```

GitHub Pages will automatically rebuild your site within a minute.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| 404 error | Wait 2-3 minutes after enabling Pages, then refresh |
| Changes not showing | Clear browser cache (Ctrl + Shift + R) or wait a minute |
| Images not loading | Make sure file names match exactly (case sensitive on GitHub) |
| CSS not loading | Check that `css/style.css` path is correct in your HTML files |

---

## Optional — Custom Domain

If you ever buy a domain (like `rishabhbhati.com`):

1. Go to repo **Settings → Pages → Custom domain**
2. Type your domain and click **Save**
3. In your domain registrar, add these DNS records:
   - **A records** pointing to:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - **CNAME record:** `www` → `iamrishabhbhati.github.io`
4. Check "Enforce HTTPS"
5. Wait up to 24 hours for DNS to propagate

---

That's it. Your portfolio will be live. 🎉
