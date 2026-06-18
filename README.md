# Jaskaran Singh — Portfolio

A single-page static portfolio website built with HTML, CSS, and vanilla JavaScript.

---

## 📁 Folder Structure

```
portfolio/
├── index.html              ← Main page (all sections)
├── css/
│   └── style.css           ← All styles
├── js/
│   └── main.js             ← Animations, typing effect, scroll logic
├── images/
│   ├── placeholder/        ← Dummy SVGs (replace these!)
│   │   ├── profile.svg
│   │   ├── about.svg
│   │   ├── project1.svg
│   │   ├── project2.svg
│   │   └── project3.svg
│   ├── profile.jpg         ← ★ ADD YOUR PHOTO HERE
│   ├── about.jpg           ← ★ ADD YOUR WORKING/CASUAL PHOTO
│   ├── project1.jpg        ← ★ NeuroRevive 360 screenshot
│   ├── project2.jpg        ← ★ Secure Messaging screenshot
│   └── project3.jpg        ← ★ Road Damage Detection screenshot
├── Jaskaran_CV.pdf         ← ★ ADD YOUR CV HERE (for download button)
└── README.md
```

---

## 🖼️ How to Replace Photos

1. Add your photos to the `images/` folder (not the `placeholder/` subfolder)
2. Open `index.html` and find the `<img>` tags
3. Change `src="images/placeholder/profile.svg"` → `src="images/profile.jpg"`
4. Repeat for about, project1, project2, project3

**Recommended sizes:**
- `profile.jpg` — 500×600px (portrait, face centered)
- `about.jpg` — 600×700px (casual/working shot)
- `project1.jpg` – `project3.jpg` — 800×450px (16:9 screenshots)

---

## 🔗 How to Update Contact Links

Open `index.html` and search for `★ EDIT` — there are clear comments above each contact card:

| Card       | What to change                          |
|------------|-----------------------------------------|
| GitHub     | `href="https://github.com/jaskaranarora1"` |
| LinkedIn   | `href="https://linkedin.com/in/jassk"` |
| WhatsApp   | `href="https://wa.me/4915212379037"` — update number |
| Instagram  | `href="https://instagram.com/YOUR_INSTAGRAM_HANDLE"` — update handle + display text |
| Email      | `href="mailto:jass.arora2001@gmail.com"` |
| CV         | Place `Jaskaran_CV.pdf` in root folder  |

---

## 🚀 Running Locally

Just open `index.html` in any browser — no build step, no server needed.

For best results with fonts (Google Fonts), you need an internet connection.

---

## 🌐 Deploying

Works perfectly on:
- **GitHub Pages** — push to repo, enable Pages from Settings
- **Netlify** — drag and drop the folder
- **Vercel** — import from GitHub

---

## ✏️ Customisation Tips

- **Colors** — edit CSS variables at the top of `css/style.css` (`:root { ... }`)
- **Typing phrases** — edit the `phrases` array in `js/main.js`
- **New project card** — copy an existing `.project-card` block in `index.html`
- **New contact card** — copy an existing `.contact-card` block in `index.html`
