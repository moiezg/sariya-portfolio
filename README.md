# Sariya Seraj | B.Arch Portfolio

A sleek, minimalist, and highly interactive architectural portfolio website for **Sariya Seraj**, a 3rd-year Bachelor of Architecture (B.Arch) student at the **School of Planning and Architecture (SPA), Delhi**. 

The website showcases her design journey, technical drawings, and environmental research with a focus on sustainable passive design strategies.

---

## 🏛️ Featured Projects

### 1. Jayanta Secondary School (Jaipur)
* **Academic Level:** 3rd Year, 5th Semester
* **Core Philosophy:** *Ripples of Water* — the geometry of expanding concentric blocks representing the spread of knowledge.
* **Passive Control Features:**
  - **Courtyard Stack Effect:** Central courtyard acts as a natural cooling chimney, drawing in air cooled by the adjacent water pool.
  - **Cavity Walls:** XPS insulated brick layers blocking solar heat gain and acoustic noise.
  - **Light Shelves:** Reflects uniform, glare-free daylight deep into classrooms.
  - **Brick Jali & Clerestories:** Porous brick screens and high-level vents enabling continuous natural ventilation.
  - **Simulations:** Detailed sun path and incident solar radiation mapping dictating shading strategies.

### 2. Creative Art Centre (Machkund, Dholpur)
* **Academic Level:** 2nd Year, 3rd Semester
* **Core Philosophy:** Topographical integration with regional stepwells, using local stone masonry and sub-ground courtyards to moderate local microclimates.

---

## 💻 Tech & Design Stack

- **Structure:** Semantic HTML5
- **Styling:** Vanilla CSS3
  - Custom dark editorial palette: Deep Charcoal background (`#0c0d0e`), Warm Ivory/Sand text (`#e6e2dd`), and Muted Bronze accents (`#b89060`).
  - Google Fonts: *Outfit* (clean interface elements) & *Playfair Display* (editorial headers).
  - Glassmorphism overlays and CSS custom scrollbars.
- **Interactivity:** Lightweight Vanilla JavaScript (no heavy frameworks or dependencies)
  - **Interactive Storytelling:** A split-screen visual scrollytelling tracker connecting the reading narrative with technical drawing sheets.
  - **CAD Lightbox Viewer:** Fullscreen modal allowing users to zoom (via mouse wheel, touches, or controls) and drag-to-pan in order to inspect high-resolution drafting details.
  - **Custom Cursor Follower:** Dual-circle cursor follower with smooth interpolation and context hover states.
  - **Scroll Reveals:** IntersectionObserver triggers for smooth entrance animations.

---

## 🛠️ Local Development & Preview

Since this website is built with pure static files, running it locally is simple:

1. **Clone the repository:**
   ```bash
   git clone git@github.com:moiezg/sariya-portfolio.git
   cd sariya-portfolio
   ```
2. **Run a local static server:**
   Using Python:
   ```bash
   python3 -m http.server 8000
   ```
   Using Node.js (`http-server`):
   ```bash
   npx http-server -p 8000
   ```
3. **Open in Browser:**
   Visit `http://localhost:8000` to preview.

---

## 📬 Contact & Credentials
* **Institute:** School of Planning and Architecture, IP Estate, New Delhi, India
* **Roll Number:** A/2890/2023
* **Academic Email:** sariya.seraj@spa.ac.in (or sariya.seraj.arch@gmail.com)
