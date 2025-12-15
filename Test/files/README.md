# ✨ Stunning Parallax Portfolio

A modern, responsive portfolio website with beautiful parallax scrolling effects, smooth animations, and a clean design. 

![Portfolio Preview](https://via.placeholder.com/1200x630/6366f1/ffffff?text=Your+Portfolio)

## 🚀 Features

- **Stunning Parallax Effects** - Multi-layer parallax scrolling throughout the site
- **Smooth Animations** - CSS keyframes and scroll-triggered animations
- **Responsive Design** - Works perfectly on all devices
- **Custom Cursor** - Elegant cursor follower effect
- **Form Validation** - Client-side form validation with notifications
- **Accessibility** - Respects `prefers-reduced-motion` preferences
- **Performance Optimized** - 60fps animations with RequestAnimationFrame

## 📁 Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── css/
│   ├── style.css       # Main styles
│   └── parallax.css    # Parallax-specific styles
├── js/
│   ├── main.js         # Core functionality
│   └── parallax.js     # Parallax engine
└── README.md           # This file
```

## 🎨 Customization Guide

### Colors

Edit the CSS variables in `css/style.css`:

```css
:root {
    --primary-color: #000000;      /* Main dark color */
    --secondary-color: #ffffff;    /* Main light color */
    --accent-color: #6366f1;       /* Accent/highlight color */
    --accent-hover: #4f46e5;       /* Accent hover state */
    --text-color: #333333;         /* Body text */
    --text-light: #666666;         /* Lighter text */
}
```

### Content

1. **Hero Section**:  Update your name and title in `index.html`
2. **About Section**: Add your bio and skills
3. **Projects Section**: Replace placeholder projects with your work
4. **Contact Section**: Update email and social links

### Images

Replace the placeholder elements with your actual images:

```html
<!-- Replace this -->
<div class="image-placeholder">
    <span>Your Photo</span>
</div>

<!-- With this -->
<img src="your-image. jpg" alt="Description">
```

### Fonts

The site uses Inter font.  To change it:

1. Update the Google Fonts link in `index.html`
2. Update `--font-family` in CSS variables

## 🛠️ Installation

1. Clone or download this repository
2. Open `index.html` in your browser
3. That's it! No build tools required. 

### Deployment Options

- **GitHub Pages**: Push to a GitHub repo and enable Pages
- **Netlify**:  Drag and drop the folder
- **Vercel**: Connect your repository

## ⚡ Performance Tips

1. Optimize images before adding them
2. Use WebP format for better compression
3. Add `loading="lazy"` to images below the fold
4. Minify CSS and JS for production

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This template is free to use for personal and commercial projects. 

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

Made with ❤️ by [Your Name]