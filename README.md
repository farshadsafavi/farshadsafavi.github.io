# Farshad Safavi Academic Website

A responsive academic website designed for GitHub Pages.

## Publish on GitHub Pages

1. Create a repository named `farshadsafavi.github.io`.
2. Upload all files from this folder to the repository.
3. Commit and push to the `main` branch.
4. In GitHub, open **Settings → Pages**.
5. Under **Build and deployment**, select:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/(root)**
6. Your website will appear at:
   `https://farshadsafavi.github.io`

## Customize

- Replace `assets/profile-placeholder.svg` with your portrait.
- Edit `index.html` to update publications, links, news, and contact details.
- Edit `assets/style.css` to change colors and spacing.
- Update all placeholder `href="#"` links.

## Local preview

Open `index.html` directly in a browser, or run:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.
