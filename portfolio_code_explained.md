# Portfolio Website Code Explanation

## Overview
This document explains the structure and logic of your neon-themed portfolio website, including the homepage hero section, gallery, animations, and performance optimizations.

---

## 1. HTML Structure

- **Hero Section**: The homepage features a large animated GIF (`order.gif`) as a background, with a blurred overlay for readability. All main text and navigation buttons are layered on top.
- **Main Content**: Below the hero, the site displays your artwork and animation galleries, followed by an about section and footer.
- **Gallery**: Each artwork/animation is embedded as a lazy-loaded iframe, so only visible items are loaded.

**Key HTML Elements:**
```html
<section class="hero-home-bg">
  <img src="order.gif" class="hero-bg-gif" alt="Artwork background" />
  <div class="hero-bg-blur"></div>
  <div class="hero-home-content">
    <h1 class="hero-title">NKS PORTFOLIO</h1>
    <p class="hero-desc">Digital artist and video editor</p>
    <div class="hero-btns">
      <button class="neon-btn">Artwork</button>
      <button class="neon-btn">Animation</button>
      <a class="neon-btn">Instagram</a>
      <a class="neon-btn">YouTube</a>
    </div>
  </div>
</section>
```

---

## 2. CSS (Styling & Neon Theme)

- **Neon Effects**: Headings, buttons, and borders use glowing text-shadows and box-shadows for a neon look.
- **Hero Section**: Uses absolute positioning and overlays to layer the GIF, blur, and content.
- **Responsive Design**: Media queries adjust layout for mobile, stacking content vertically and resizing the GIF.
- **Gallery**: Each iframe is large, centered, and spaced far apart for a dramatic, immersive effect.

**Example Neon Button CSS:**
```css
.neon-btn {
  width: 90vw;
  max-width: 340px;
  font-size: 1.3rem;
  color: #00ffd5;
  border: 2px solid #00ffd5;
  box-shadow: 0 0 8px #00ffd5, 0 0 24px #00ffd5 inset;
  background: #111;
  border-radius: 16px;
  transition: box-shadow 0.3s, background 0.3s;
}
.neon-btn:hover {
  background: #00ffd5;
  color: #000;
  box-shadow: 0 0 32px #00ffd5;
}
```

---

## 3. JavaScript (Functionality)

- **Smooth Scrolling**: Buttons scroll to the artwork or animation sections.
- **Progressive Lazy Loading**: Only the first gallery iframe loads initially. As the user scrolls and views each image, the next one loads automatically, reducing unnecessary bandwidth usage.

**Progressive Lazy Loading Example:**
```js
function progressiveLazyLoadIframes() {
  const iframes = Array.from(document.querySelectorAll('iframe[data-src]'));
  if (iframes.length === 0) return;
  iframes[0].src = iframes[0].dataset.src;
  for (let i = 0; i < iframes.length - 1; i++) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          iframes[i + 1].src = iframes[i + 1].dataset.src;
          observer.disconnect();
        }
      });
    }, { rootMargin: '0px 0px 200px 0px', threshold: 0.1 });
    observer.observe(iframes[i]);
  }
}
window.addEventListener('DOMContentLoaded', progressiveLazyLoadIframes);
```

---

## 4. Special Effects & Performance

- **Blurred Overlay**: The left/top half of the hero GIF is blurred for text readability using `backdrop-filter: blur(...)`.
- **No Loading Screen**: The site loads instantly, with only visible content loaded at first.
- **Mobile Friendly**: Layout adapts for all screen sizes, with buttons and text stacking vertically on small screens.

---

## 5. Customization Tips

- **Change the hero GIF**: Replace `order.gif` with your own artwork for a new look.
- **Add more sections**: Duplicate the gallery or about section as needed.
- **Tweak neon colors**: Adjust `#00ffd5` and `#ff00e0` in the CSS for different neon effects.

---

## 6. File Structure

- `index.html` — Main HTML file
- `style.css` — All styles and responsive design
- `script.js` — All interactive and lazy loading logic
- `order.gif` — Main hero background artwork

---

For any further questions or customizations, just ask! 