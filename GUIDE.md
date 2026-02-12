# Rishabh Bhati — Personal Website Guide

Everything you need to know about your website: file structure, how to make changes to the code, adding skills, projects, blog posts, embedding videos, and deploying to GitHub Pages.

---

## File Structure

```
Personal_Website/
├── index.html            ← Landing page (hero, about, skills, projects preview, blog preview, contact)
├── projects.html         ← Full projects gallery with category filters
├── blog.html             ← Blog listing page with search
├── css/
│   └── style.css         ← All styles (colors, layout, animations, responsive)
├── js/
│   └── main.js           ← All JavaScript (particles, typing effect, filters, search)
├── blog/
│   └── sample-post.html  ← Sample blog post (use as template for new posts)
├── images/
│   └── profile.jpg       ← Your profile photo
└── GUIDE.md              ← This file
```

---

## How to Make Changes to the Code

All the files are plain HTML, CSS, and JavaScript. No build tools, no frameworks. You edit with any text editor (VS Code, Notepad++, even Notepad).

### What each file controls

| I want to change...               | Edit this file       | Section to find                     |
|------------------------------------|----------------------|-------------------------------------|
| My name, bio, or education         | `index.html`         | Search for `<!-- ======= About` |
| Skills                             | `index.html`         | Search for `<!-- ======= Skills` |
| Featured projects on homepage      | `index.html`         | Search for `<!-- ======= Featured Projects` |
| Blog preview on homepage           | `index.html`         | Search for `<!-- ======= Blog Preview` |
| Contact links (email/social)       | `index.html`         | Search for `<!-- ======= Contact` |
| Full project list                  | `projects.html`      | Inside the `projects-grid` div |
| Full blog post list                | `blog.html`          | Inside the `blog-grid` div |
| Colors, fonts, spacing             | `css/style.css`      | The `:root` block at the top |
| Typing effect words                | `js/main.js`         | Search for `var roles =` |
| Navigation links                   | All HTML files       | Inside `nav-links` div |

### How to find things quickly

In VS Code, use `Ctrl + F` (Cmd + F on Mac) to search within a file. I left HTML comments like `<!-- ======= About ======= -->` before every section so you can jump to them fast.

---

## How to Add / Remove Skills

Open `index.html` and find the skills section (search for `skills-grid`). The grid is currently empty. Add skills like this:

### Add a skill

Paste this line inside the `<div class="skills-grid fade-up">` block:

```html
<div class="skill-tag"><span class="skill-icon">🐍</span> Python</div>
```

Change the emoji and the name to whatever you want. Some examples:

```html
<div class="skill-tag"><span class="skill-icon">🐍</span> Python</div>
<div class="skill-tag"><span class="skill-icon">🗄️</span> SQL</div>
<div class="skill-tag"><span class="skill-icon">📊</span> Excel</div>
<div class="skill-tag"><span class="skill-icon">📈</span> Power BI</div>
<div class="skill-tag"><span class="skill-icon">📉</span> Tableau</div>
<div class="skill-tag"><span class="skill-icon">🐼</span> Pandas</div>
<div class="skill-tag"><span class="skill-icon">🔢</span> NumPy</div>
<div class="skill-tag"><span class="skill-icon">📐</span> Statistics</div>
<div class="skill-tag"><span class="skill-icon">🧹</span> Data Cleaning</div>
<div class="skill-tag"><span class="skill-icon">📊</span> Data Visualization</div>
```

### Remove a skill

Just delete the entire `<div class="skill-tag">...</div>` line for that skill.

### Where to find emojis

- Windows: Press `Win + .` (period key) to open the emoji picker
- Or search on [emojipedia.org](https://emojipedia.org)

---

## How to Add a New Project

### Step 1: Add the card

Open `projects.html` and find the `projects-grid` div. Copy-paste this block:

```html
<div class="project-card" data-category="analysis python" style="transition: opacity 0.3s, transform 0.3s;">
  <div class="project-thumb">
    <!-- USE ONE OF THESE OPTIONS: -->

    <!-- Option A: Screenshot image -->
    <img src="images/my-project.jpg" alt="Project name">

    <!-- Option B: Emoji placeholder (if no image yet) -->
    <div class="project-thumb-placeholder">📊</div>

    <!-- Option C: YouTube embed (see YouTube section below) -->
  </div>
  <div class="project-body">
    <div class="project-tags">
      <span class="project-tag">Python</span>
      <span class="project-tag">Pandas</span>
    </div>
    <h3><a href="https://github.com/iamrishabhbhati/repo-name">Project Title</a></h3>
    <p>A short description of what the project does and what you learned.</p>
    <div class="project-links">
      <a href="https://github.com/iamrishabhbhati/repo-name" target="_blank" rel="noopener">
        GitHub
      </a>
      <a href="https://drive.google.com/..." class="drive-badge" target="_blank" rel="noopener">
        📁 Dataset
      </a>
    </div>
  </div>
</div>
```

### Step 2: Set the categories

The `data-category` attribute controls filtering. Use space-separated values:

| Value           | Shows under button |
|-----------------|-------------------|
| `analysis`      | Data Analysis      |
| `visualization` | Visualization      |
| `sql`           | SQL                |
| `python`        | Python             |
| `dashboard`     | Dashboards         |

Example: `data-category="analysis python visualization"`

### Step 3: Delete the dummy projects

Delete the existing project-card blocks that have placeholder content (like "Sales Performance Dashboard", "EDA on Netflix Content", etc.) and replace with your real projects.

### Showing projects on the homepage too

If you want a project to show on the homepage, add a similar card to the `projects-grid` in `index.html` too.

---

## How to Embed YouTube Videos

Get the **Video ID** from your YouTube URL:
- URL: `https://www.youtube.com/watch?v=abc123`
- Video ID: `abc123`

### In a project card thumbnail:

Replace the `project-thumb` contents:

```html
<div class="project-thumb">
  <div class="video-wrapper" style="padding-bottom:56.25%;position:relative;">
    <iframe
      src="https://www.youtube.com/embed/abc123"
      title="Project walkthrough"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      loading="lazy"
      style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;">
    </iframe>
  </div>
</div>
```

### In a blog post:

```html
<div class="video-wrapper">
  <iframe
    src="https://www.youtube.com/embed/abc123"
    title="Video title"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
    loading="lazy">
  </iframe>
</div>
```

---

## How to Add Google Drive Links

Use the styled badge link:

```html
<a href="https://drive.google.com/file/d/YOUR_FILE_ID/view" class="drive-badge" target="_blank" rel="noopener">
  📁 View Dataset
</a>
```

Or a plain link:

```html
<a href="https://drive.google.com/file/d/YOUR_FILE_ID/view" target="_blank" rel="noopener">
  Dataset on Google Drive
</a>
```

---

## How to Write a New Blog Post

### Step 1: Copy the template

Copy `blog/sample-post.html` → `blog/your-new-post.html`

### Step 2: Edit the new file

Change these things inside the file:

1. **`<title>` tag** — your post title
2. **`<meta name="description">`** — one-line summary
3. **`<h1>`** inside article-header — post title
4. **article-meta `<span>` tags** — date, read time, tags
5. **article-body** — your actual content

### Writing content inside a blog post

| What you want         | HTML to use                                    |
|----------------------|------------------------------------------------|
| Regular paragraph    | `<p>Your text here.</p>`                        |
| Bold text            | `<strong>bold</strong>`                         |
| Italic text          | `<em>italic</em>`                              |
| Heading              | `<h2>Heading</h2>` or `<h3>Subheading</h3>`   |
| Code inline          | `<code>some_function()</code>`                  |
| Code block           | `<pre><code>multi-line code here</code></pre>`  |
| Image                | `<img src="../images/pic.jpg" alt="desc">`     |
| Link                 | `<a href="url" target="_blank">text</a>`       |
| Bullet list          | `<ul><li>Item 1</li><li>Item 2</li></ul>`      |
| Numbered list        | `<ol><li>Step 1</li><li>Step 2</li></ol>`      |
| Quote                | `<blockquote>Quote text</blockquote>`          |
| YouTube video        | Use the `video-wrapper` iframe pattern above   |
| Drive link           | Use the `drive-badge` pattern above            |

### Step 3: Add the post to the blog listing

Open `blog.html` and add a card inside `blog-grid`:

```html
<div class="blog-card" data-title="Your Post Title Here">
  <span class="blog-date">Feb 12, 2026</span>
  <h3><a href="blog/your-new-post.html">Your Post Title Here</a></h3>
  <p>A short excerpt or summary of the post.</p>
  <a href="blog/your-new-post.html" class="read-more">Read article →</a>
</div>
```

**Important:** The `data-title` attribute is what the search bar searches through.

### Step 4: Update homepage blog preview (optional)

Add a similar card to the blog section in `index.html` if it's a recent post.

---

## How to Add Images

1. Save images to the `images/` folder
2. Reference them:

```html
<!-- From index.html, projects.html, blog.html -->
<img src="images/filename.jpg" alt="description">

<!-- From blog posts inside blog/ folder -->
<img src="../images/filename.jpg" alt="description">
```

Recommended sizes:
- **Profile photo:** 560×640px (portrait)
- **Project thumbnails:** 800×450px (16:9)
- **Blog covers:** 1200×630px

---

## How to Change Colors

Open `css/style.css` and find the `:root` block at the very top. These control all the colors:

```css
:root {
  --bg-deep: #060611;        /* Deepest background */
  --bg-primary: #0b0b1a;     /* Main background */
  --bg-secondary: #111128;   /* Card/section background */
  --text-primary: #e2e2f0;   /* Main text color */
  --text-secondary: #8888aa; /* Muted text */
  --accent: #00e5ff;         /* Primary accent (cyan) */
  --accent-violet: #7c3aed;  /* Secondary accent (violet) */
  --accent-rose: #f43f5e;    /* Tertiary accent (pink) */
}
```

To change the accent color, replace `#00e5ff` with whatever color you want. Use [coolors.co](https://coolors.co) to find nice color palettes.

---

## How to Change the Typing Effect Words

Open `js/main.js` and find this array:

```javascript
var roles = [
  'Data Analyst',
  'Data Storyteller',
  'Dashboard Builder',
  'MSc Data Science Student',
  'Problem Solver'
];
```

Add, remove, or change these strings. They cycle on the homepage hero.

---

## How to Modify the Navigation

The navigation links are inside the `nav-links` div in every HTML file. To add a new page link:

```html
<a href="new-page.html">New Page</a>
```

You need to update the nav in **all 4 files** if you add a new link:
- `index.html`
- `projects.html`
- `blog.html`
- `blog/sample-post.html` (and any other blog posts — use `../new-page.html`)

---

## How to Deploy to GitHub Pages

### Step 1: Create a GitHub repo

1. Go to [github.com/new](https://github.com/new)
2. Name it `iamrishabhbhati.github.io` (for user site) or any name like `portfolio` (for project site)
3. Set to **Public**
4. Don't initialize with README

### Step 2: Push your code

Open terminal in your `Personal_Website` folder:

```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/iamrishabhbhati/YOUR-REPO-NAME.git
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to repo → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** / Folder: **/ (root)**
4. Click **Save**

### Step 4: Visit your site

Wait 1-2 minutes. Your site will be at:
- User site: `https://iamrishabhbhati.github.io`
- Project site: `https://iamrishabhbhati.github.io/repo-name`

### Updating the site

Every push to `main` auto-deploys:

```bash
git add .
git commit -m "added new project"
git push
```

---

## Quick Reference

| Task | File | What to search for |
|------|------|--------------------|
| Change bio | `index.html` | `about-bio` |
| Add/remove skill | `index.html` | `skills-grid` |
| Add project | `projects.html` | `projects-grid` |
| Add blog post | Copy `blog/sample-post.html`, add card to `blog.html` | `blog-grid` |
| Embed YouTube | Any HTML | Use `video-wrapper` iframe |
| Add Drive link | Any HTML | Use `drive-badge` class |
| Change colors | `css/style.css` | `:root` |
| Change typing words | `js/main.js` | `var roles` |
| Change profile photo | Replace `images/profile.jpg` | — |
| Deploy | Push to GitHub | See GitHub Pages section |
