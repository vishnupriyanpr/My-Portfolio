/**
 * Parallax Effects Module
 * Handles all parallax scrolling and mouse movement effects
 */

class ParallaxEngine {
    constructor() {
        this.scrollY = 0;
        this. mouseX = 0;
        this.mouseY = 0;
        this.windowHeight = window.innerHeight;
        this.windowWidth = window. innerWidth;
        this.ticking = false;
        this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (! this.reducedMotion) {
            this.init();
        }
    }
    
    init() {
        this.bindEvents();
        this.createScrollProgress();
        this.update();
    }
    
    bindEvents() {
        // Scroll event with RAF
        window.addEventListener('scroll', () => this.onScroll(), { passive: true });
        
        // Mouse move event with RAF
        window.addEventListener('mousemove', (e) => this.onMouseMove(e), { passive: true });
        
        // Resize event
        window.addEventListener('resize', () => this.onResize());
    }
    
    onScroll() {
        this.scrollY = window.pageYOffset;
        this.requestTick();
    }
    
    onMouseMove(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        this.requestTick();
    }
    
    onResize() {
        this.windowHeight = window.innerHeight;
        this.windowWidth = window.innerWidth;
    }
    
    requestTick() {
        if (!this. ticking) {
            requestAnimationFrame(() => this.update());
            this.ticking = true;
        }
    }
    
    update() {
        this.updateParallaxLayers();
        this.updateFloatingShapes();
        this.updateMouseParallax();
        this.updateScrollProgress();
        this.ticking = false;
    }
    
    updateParallaxLayers() {
        const parallaxLayers = document.querySelectorAll('.parallax-layer[data-speed]');
        
        parallaxLayers.forEach(layer => {
            const speed = parseFloat(layer.dataset.speed) || 0.5;
            const section = layer.parentElement;
            const rect = section.getBoundingClientRect();
            
            if (rect.bottom > 0 && rect.top < this.windowHeight) {
                const yPos = (rect.top * speed);
                layer.style.transform = `translate3d(0, ${yPos}px, 0)`;
            }
        });
    }
    
    updateFloatingShapes() {
        const shapes = document.querySelectorAll('. floating-shapes .shape');
        const heroSection = document.querySelector('.hero');
        
        if (!heroSection) return;
        
        const rect = heroSection.getBoundingClientRect();
        
        if (rect.bottom > 0 && rect.top < this.windowHeight) {
            shapes.forEach((shape, index) => {
                const speed = 0.02 + (index * 0.01);
                const xOffset = (this.mouseX - this.windowWidth / 2) * speed;
                const yOffset = (this.mouseY - this. windowHeight / 2) * speed;
                const scrollOffset = this.scrollY * (0.1 + index * 0.05);
                
                shape.style.transform = `translate3d(${xOffset}px, ${yOffset - scrollOffset}px, 0)`;
            });
        }
    }
    
    updateMouseParallax() {
        const elements = document.querySelectorAll('. mouse-parallax-element');
        
        elements.forEach(element => {
            const speed = parseFloat(element.dataset.mouseSpeed) || 0.05;
            const xPos = (this.mouseX - this.windowWidth / 2) * speed;
            const yPos = (this.mouseY - this. windowHeight / 2) * speed;
            
            element.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
        });
    }
    
    createScrollProgress() {
        const progress = document.createElement('div');
        progress.className = 'scroll-progress';
        document.body.appendChild(progress);
        this.scrollProgress = progress;
    }
    
    updateScrollProgress() {
        if (! this.scrollProgress) return;
        
        const docHeight = document.documentElement.scrollHeight - this.windowHeight;
        const scrollPercent = this.scrollY / docHeight;
        
        this.scrollProgress. style.transform = `scaleX(${scrollPercent})`;
    }
}

/**
 * Tilt Effect for Cards
 */
class TiltEffect {
    constructor(element) {
        this.element = element;
        this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (!this.reducedMotion) {
            this. init();
        }
    }
    
    init() {
        this.element.addEventListener('mousemove', (e) => this.onMouseMove(e));
        this.element.addEventListener('mouseleave', () => this.onMouseLeave());
    }
    
    onMouseMove(e) {
        const rect = this.element.getBoundingClientRect();
        const x = e.clientX - rect. left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.element. style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    }
    
    onMouseLeave() {
        this.element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    }
}

/**
 * Reveal on Scroll
 */
class ScrollReveal {
    constructor() {
        this.elements = document. querySelectorAll('[data-aos]');
        this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (!this.reducedMotion && this.elements.length > 0) {
            this.init();
        } else {
            // Show all elements if reduced motion is preferred
            this.elements.forEach(el => el.classList.add('aos-animate'));
        }
    }
    
    init() {
        this.observer = new IntersectionObserver((entries) => {
            entries. forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.aosDelay || 0;
                    setTimeout(() => {
                        entry.target.classList.add('aos-animate');
                    }, delay);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        this.elements.forEach(el => this.observer.observe(el));
    }
}

/**
 * Image Parallax Effect
 */
class ImageParallax {
    constructor() {
        this.images = document.querySelectorAll('. project-image');
        this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (!this.reducedMotion && this.images.length > 0) {
            this.init();
        }
    }
    
    init() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry. isIntersecting) {
                    this.animateImage(entry.target);
                }
            });
        }, {
            threshold: 0,
            rootMargin: '-20% 0px -20% 0px'
        });
        
        this.images.forEach(img => {
            this.observer.observe(img);
            img.addEventListener('mousemove', (e) => this.onMouseMove(e, img));
            img.addEventListener('mouseleave', (e) => this.onMouseLeave(img));
        });
    }
    
    animateImage(container) {
        const img = container.querySelector('. project-placeholder, img');
        if (img) {
            img.style.transform = 'scale(1)';
        }
    }
    
    onMouseMove(e, container) {
        const img = container.querySelector('.project-placeholder, img');
        if (!img) return;
        
        const rect = container.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        const moveX = (x - 0.5) * 20;
        const moveY = (y - 0.5) * 20;
        
        img.style.transform = `scale(1. 1) translate(${moveX}px, ${moveY}px)`;
    }
    
    onMouseLeave(container) {
        const img = container.querySelector('.project-placeholder, img');
        if (img) {
            img.style.transform = 'scale(1)';
        }
    }
}

// Initialize Parallax Effects
document.addEventListener('DOMContentLoaded', () => {
    // Main parallax engine
    window.parallaxEngine = new ParallaxEngine();
    
    // Scroll reveal animations
    window.scrollReveal = new ScrollReveal();
    
    // Image parallax
    window.imageParallax = new ImageParallax();
    
    // Tilt effect on project cards
    document.querySelectorAll('.project-card').forEach(card => {
        new TiltEffect(card);
    });
});