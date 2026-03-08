# Daily Theme Shuffle - Visual Editor 🎨

A visual theme editor for creating and customizing VS Code color themes. Built with React + Vite, hosted free on GitHub Pages.

## Live Site

`https://YOUR_USERNAME.github.io/theme-editor/`

## Features

- 🎨 12 pre-built anime/game/cartoon themes (Demon Slayer, JJK, Mario, SpongeBob, Resident Evil)
- 🖥️ Live VS Code preview with real syntax highlighting
- 🎛️ Color pickers for every UI element and syntax token
- ➕ Create new themes or duplicate existing ones
- 📦 Export individual themes or all at once as VS Code-ready JSON
- 🚀 Auto-deploys on push to `main`

## Setup

### 1. Create a GitHub repo

Go to github.com → New Repository → name it `theme-editor`

### 2. Push this code

```bash
cd theme-editor-app
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/theme-editor.git
git push -u origin main
```

### 3. Enable GitHub Pages

- Go to your repo → Settings → Pages
- Under "Build and deployment", set Source to **GitHub Actions**
- That's it! The workflow will auto-run on push

### 4. Visit your site

After the action completes (~1-2 min), your editor will be live at:
`https://YOUR_USERNAME.github.io/theme-editor/`

## Local Development

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`

## Using Exported Themes

Drop exported `.json` files into the `themes/` folder of the Daily Theme Shuffle VS Code extension.
