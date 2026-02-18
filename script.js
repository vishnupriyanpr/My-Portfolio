document.addEventListener('DOMContentLoaded', function () {
    // Initialize Skills Network
    // Skills Network initialization moved to window.load to ensure correct sizing

    // Create dynamic particles
    createParticles();
    createShootingStars();

    // Particle creation function
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;

        const isSmall = window.innerWidth <= 600;
        const particleCount = isSmall ? 80 : 220; // reduced density on small screens for performance

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            const duration = (Math.random() * (isSmall ? 6 : 8) + (isSmall ? 8 : 10));
            particle.style.animationDuration = duration + 's';
            // Start some particles mid-cycle so stars are visible immediately
            particle.style.animationDelay = (-Math.random() * duration).toFixed(2) + 's';
            particle.style.opacity = Math.random() * 0.5 + 0.3;

            particlesContainer.appendChild(particle);
        }
    }

    function createShootingStars() {
        const container = document.body;

        setInterval(() => {
            if (document.hidden) return; // Don't animate if tab is hidden

            const star = document.createElement('div');
            star.className = 'shooting-star';

            // Random position
            star.style.top = (Math.random() * 50) + '%'; // Top half of screen
            star.style.left = (Math.random() * 100) + '%';

            // Random delay and duration
            star.style.animationDuration = (Math.random() * 1 + 1) + 's';
            star.style.animationDelay = Math.random() * 2 + 's';

            container.appendChild(star);

            // Cleanup
            setTimeout(() => {
                star.remove();
            }, 4000);
        }, 3000 + Math.random() * 5000); // Random interval between 3-8 seconds
    }

    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
    });

    function raf(time) {
        // Skip Lenis update when tab is hidden for performance
        if (!document.hidden) {
            lenis.raf(time);
        }
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Smooth scrolling for navigation (using Lenis)
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"], .footer-links a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                lenis.scrollTo(targetSection, {
                    offset: -80
                });
            }
        });
    });

    // Add active class to navigation based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-menu a');

    // Throttled scroll handler for nav highlighting
    let navScrollTicking = false;
    window.addEventListener('scroll', () => {
        if (navScrollTicking) return;
        navScrollTicking = true;
        requestAnimationFrame(() => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${current}`) {
                    item.classList.add('active');
                }
            });
            navScrollTicking = false;
        });
    }, { passive: true });

    // Wire certification credential URLs
    const certificationUrls = {
        cert1: 'https://drive.google.com/drive/folders/1ZPzoIQrLTql-kr-yDLVZsK10XZW0NkDw?usp=sharing',
        cert2: 'https://drive.google.com/drive/folders/1ZPzoIQrLTql-kr-yDLVZsK10XZW0NkDw?usp=sharing',
        cert3: 'https://drive.google.com/drive/folders/1ZPzoIQrLTql-kr-yDLVZsK10XZW0NkDw?usp=sharing',
        cert4: 'https://drive.google.com/drive/folders/1ZPzoIQrLTql-kr-yDLVZsK10XZW0NkDw?usp=sharing'
    };
    Object.entries(certificationUrls).forEach(([id, url]) => {
        const el = document.getElementById(id);
        if (el && url && url !== '#') {
            el.setAttribute('href', url);
            el.setAttribute('target', '_blank');
            el.setAttribute('rel', 'noopener noreferrer');
            // Remove any previously bound listeners (e.g., smooth-scroll) by cloning
            const clone = el.cloneNode(true);
            el.parentNode.replaceChild(clone, el);
        }
    });

    // Floating rocket click functionality
    const floatingHeart = document.getElementById('floatingHeart');
    const heartTooltip = document.getElementById('heartTooltip');
    let rocketHover = false;

    floatingHeart.addEventListener('click', function () {
        // Create a temporary input to copy the command
        const tempInput = document.createElement('input');
        tempInput.value = 'npx vishnupriyan';
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);

        // Show success message
        showNotification('Command copied to clipboard!', 'success');

        // Add click animation
        this.style.transform = 'scale(1.3) rotate(25deg)';
        setTimeout(() => {
            this.style.transform = 'scale(1) rotate(0deg)';
        }, 200);
    });

    // Copy to clipboard functionality for the contact section
    const copyBtn = document.querySelector('.copy-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', function () {
            const command = this.parentElement.querySelector('code').textContent;
            copyToClipboard(command);
        });
    }

    // CLI copy button in Connect section
    const cliCopy = document.querySelector('.cli-copy');
    if (cliCopy) {
        cliCopy.addEventListener('click', () => {
            const input = document.querySelector('.cli-input');
            if (input) {
                copyToClipboard(input.value);
                showNotification('Command copied to clipboard!', 'success');
            }
        });
    }

    // Add scroll reveal animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .stat, .about-philosophy');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Typing effect removed in favor of CSS sliding animation


    // Parallax effect for background elements
    // remove heavy parallax selector; keep simple passive scroll marker
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => { ticking = false; });
    }, { passive: true });

    // Add hover effects to project cards
    // CSS already handles hover transitions for project cards; remove JS listeners

    // Add skill item hover effects
    // CSS handles skill-item hover effects; no JS needed

    // Smooth reveal for stats
    const stats = document.querySelectorAll('.stat h3');
    const animateStats = () => {
        stats.forEach(stat => {
            const numeric = parseInt(stat.textContent);
            const hasPlus = /\+$/.test(stat.textContent);
            const target = isNaN(numeric) ? 0 : numeric;
            let current = 0;
            const increment = Math.max(1, Math.floor(target / 50));
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = `${current}${hasPlus ? '+' : ''}`;
            }, 20);
        });
    };

    // Trigger stats animation when about section is visible
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
        const aboutObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    aboutObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        aboutObserver.observe(aboutSection);
    }

    // Project cards open GitHub
    document.querySelectorAll('.project-card').forEach(card => {
        const url = card.getAttribute('data-github');
        if (url) {
            card.addEventListener('click', () => {
                window.open(url, '_blank');
            });
        }
    });

    // Tooltip hover behavior: show while hovered, periodic nudge when not hovered
    const heart = document.getElementById('floatingHeart');
    const tip = document.getElementById('heartTooltip');
    if (heart && tip) {
        heart.addEventListener('mouseenter', () => {
            rocketHover = true;
            tip.style.opacity = 1;
            tip.style.visibility = 'visible';
            tip.style.transform = 'translateY(0)';
        });
        heart.addEventListener('mouseleave', () => {
            rocketHover = false;
            tip.style.opacity = 0;
            tip.style.visibility = 'hidden';
            tip.style.transform = 'translateY(-10px)';
        });

        setInterval(() => {
            if (rocketHover) return; // keep visible state managed by hover
            tip.style.opacity = 1;
            tip.style.visibility = 'visible';
            tip.style.transform = 'translateY(0)';
            setTimeout(() => {
                if (rocketHover) return; // don't hide if hovered during nudge
                tip.style.opacity = 0;
                tip.style.visibility = 'hidden';
                tip.style.transform = 'translateY(-10px)';
            }, 2000);
        }, 10000);
    }

    // Persist mild blue tint on hover for social and skill icons
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('mouseenter', () => link.classList.add('tinted'));
        link.addEventListener('mouseleave', () => link.classList.remove('tinted'));
    });
    document.querySelectorAll('.skill-item').forEach(item => {
        item.addEventListener('mouseenter', () => item.classList.add('tinted'));
        item.addEventListener('mouseleave', () => item.classList.remove('tinted'));
    });

    // Render pinned repositories into Projects
    renderPinnedProjects();

    // Timeline Beam Animation
    const timelineWrapper = document.getElementById('timelineWrapper');
    const timelineBeam = document.getElementById('timelineBeam');

    if (timelineWrapper && timelineBeam) {
        let isTicking = false;

        // Ensure beam is hidden on mobile initially
        const checkMobile = () => {
            if (window.innerWidth < 768) {
                timelineBeam.style.display = 'none';
            } else {
                timelineBeam.style.display = 'block';
            }
        };
        window.addEventListener('resize', checkMobile);
        checkMobile();

        window.addEventListener('scroll', () => {
            if (window.innerWidth < 768) return; // distinct check for scroll listener

            if (!isTicking) {
                window.requestAnimationFrame(() => {
                    updateTimelineBeam();
                    isTicking = false;
                });
                isTicking = true;
            }
        }, { passive: true });

        function updateTimelineBeam() {
            const rect = timelineWrapper.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Only animate if in view
            if (rect.top < viewportHeight && rect.bottom > 0) {
                // Calculate position relative to viewport center
                // But clamped to the timeline height
                const relativeY = Math.min(Math.max(0, (viewportHeight / 2) - rect.top), rect.height - 100);

                // Use transform for performance (hardware acceleration)
                timelineBeam.style.transform = `translateY(${relativeY}px)`;
                timelineBeam.style.opacity = '1';
            } else {
                timelineBeam.style.opacity = '0';
            }
        }
    }
});

async function renderPinnedProjects() {
    const wheelEl = document.getElementById('galleryWheel');
    const trackEl = document.getElementById('galleryTrack');
    const stageEl = document.getElementById('galleryStage');

    if (!wheelEl || !trackEl || !stageEl) return;

    // Project data
    const projects = [
        {
            id: 1,
            title: 'Terminal-pal',
            category: 'AI/CLI',
            link: 'https://github.com/vishnupriyanpr/terminal-pal',
            img: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=400&q=80',
            tech: ['python', 'ai'],
            description: 'A powerful AI-driven CLI tool that brings terminal assistance to the next level.'
        },
        {
            id: 2,
            title: 'Oxocare',
            category: 'Android',
            link: 'https://github.com/vishnupriyanpr/oxocare',
            img: 'https://images.unsplash.com/photo-1584515933487-779824d29609?auto=format&fit=crop&w=400&q=80', // Free Alternative (Medical Checklist)
            tech: ['kotlin', 'ai'],
            description: 'Smart healthcare companion app for tracking vitals and managing medical records.'
        },
        {
            id: 3,
            title: 'Verve',
            category: 'Flutter',
            link: 'https://github.com/vishnupriyanpr/verve',
            img: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=400&q=80',
            tech: ['flutter', 'ai'],
            description: 'Modern lifestyle and fitness application built for seamless user experience.'
        },
        {
            id: 5,
            title: 'PrediChurn',
            category: 'ML',
            link: 'https://github.com/vishnupriyanpr/PrediChurn',
            img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80',
            tech: ['python', 'pytorch'],
            description: 'Machine learning model designed to predict customer churn with high accuracy.'
        },
        {
            id: 4,
            title: 'UltraCodeAI',
            category: 'Plugin',
            link: 'https://github.com/vishnupriyanpr/ultracodeai',
            img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80',
            tech: ['java', 'ai'],
            description: 'Intelligent IDE plugin that enhances coding efficiency with AI suggestions.'
        },
        {
            id: 7,
            title: 'Vishnu-cli-npx',
            category: 'CLI',
            link: 'https://github.com/vishnupriyanpr/Vishnu-cli-npx',
            img: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&w=400&q=80',
            tech: ['nodejs'],
            description: 'My personal CLI card to connect and share portfolio details instantly.'
        },
        {
            id: 8,
            title: 'Cardiac-Care',
            category: 'Healthcare',
            link: 'https://github.com/vishnupriyanpr/Cardiac-Care',
            img: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=400&q=80',
            tech: ['python', 'pytorch', 'ai'],
            description: 'AI-powered system for early detection and monitoring of cardiac health issues.'
        },
        {
            id: 6,
            title: 'PharmaScan',
            category: 'Android',
            link: 'https://github.com/vishnupriyanpr/PharmaScan',
            img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80',
            tech: ['kotlin', 'ai'],
            description: 'Android application for scanning and identifying pharmaceutical products.'
        }
    ];

    // Initialize the gallery with Sticky Proxy pattern
    window.radialGallery = new StickyProxyGallery({
        trackEl,
        stageEl,
        wheelEl,
        projects,
        baseRadius: 450,
        mobileRadius: 200,
        visiblePercentage: 50, // 50% of circle visible
        lerpFactor: 0.08 // Smooth inertia - lower = more smoothing
    });
}

// Tech icon mapping
const techIcons = {
    python: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    pytorch: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg',
    kotlin: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg',
    flutter: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
    java: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    nodejs: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    ai: null
};

/**
 * StickyProxyGallery - Pure Vanilla JS Implementation
 * 
 * Uses the "Sticky Proxy" pattern:
 * - .gallery-track: Tall container (400vh) defines scroll distance
 * - .gallery-stage: position:sticky keeps viewport locked while scrolling
 * - .gallery-wheel: Rotates based on scroll progress
 * 
 * Uses requestAnimationFrame + LERP for smooth "antigravity" inertia effect.
 * NO GSAP scrollTrigger pin needed - CSS sticky does the work!
 */
class StickyProxyGallery {
    constructor(options) {
        this.trackEl = options.trackEl;
        this.stageEl = options.stageEl;
        this.wheelEl = options.wheelEl;
        this.projects = options.projects;

        // Configuration
        this.baseRadius = options.baseRadius || 450;
        this.mobileRadius = options.mobileRadius || 200;
        this.visiblePercentage = options.visiblePercentage || 50;
        this.lerpFactor = options.lerpFactor || 0.05; // Smoothing factor (0-1)

        // State
        this.items = [];
        this.hoveredIndex = null;
        this.activeIndex = 0;
        this.currentRotation = 0;      // Current interpolated rotation
        this.targetRotation = 0;       // Target rotation from scroll
        this.isAnimating = false;

        // Calculated values
        this.currentRadius = this.getResponsiveRadius();

        this.init();
    }

    getResponsiveRadius() {
        return window.innerWidth < 768 ? this.mobileRadius : this.baseRadius;
    }

    get circleDiameter() {
        return this.currentRadius * 2;
    }

    get visibleDecimal() {
        return Math.max(10, Math.min(100, this.visiblePercentage)) / 100;
    }

    get hiddenDecimal() {
        return 1 - this.visibleDecimal;
    }

    init() {
        this.createDescriptionContainer();
        this.renderItems();
        this.positionItems();
        this.setupWheelDimensions();
        this.bindEvents();
        this.startAnimationLoop();

        // Handle resize
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.currentRadius = this.getResponsiveRadius();
                this.positionItems();
                this.setupWheelDimensions();
            }, 100);
        });

        // Entry animation (fade in items with stagger)
        this.animateEntry();
    }

    createDescriptionContainer() {
        this.descContainer = document.createElement('div');
        this.descContainer.className = 'gallery-active-description';
        this.descContainer.innerHTML = `
            <div class="active-desc-content">
                <h3 class="active-title"></h3>
                <p class="active-text"></p>
            </div>
            <div class="gallery-nav-arrows">
                <button class="gallery-nav-btn gallery-nav-prev" aria-label="Previous project">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button class="gallery-nav-btn gallery-nav-next" aria-label="Next project">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        `;
        this.stageEl.appendChild(this.descContainer);
        this.titleEl = this.descContainer.querySelector('.active-title');
        this.textEl = this.descContainer.querySelector('.active-text');

        // Bind arrow navigation
        const prevBtn = this.descContainer.querySelector('.gallery-nav-prev');
        const nextBtn = this.descContainer.querySelector('.gallery-nav-next');
        prevBtn.addEventListener('click', () => this.navigatePrev());
        nextBtn.addEventListener('click', () => this.navigateNext());
    }

    /**
     * Navigate to a specific project by index
     * Scrolls the page to show that project at the top of the wheel
     */
    navigateTo(index) {
        const count = this.projects.length;
        const anglePerItem = 360 / count;

        // Calculate what scroll progress would show this item at top (270 deg)
        // Item i is at 270 deg when: (i * anglePerItem + rotation) % 360 = 270
        // rotation = progress * 360
        // So: progress = (270 - i * anglePerItem) / 360
        let targetProgress = (270 - (index * anglePerItem)) / 360;

        // Normalize to 0-1 range
        while (targetProgress < 0) targetProgress += 1;
        while (targetProgress > 1) targetProgress -= 1;

        // Calculate scroll position from progress
        const trackHeight = this.trackEl.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollableDistance = trackHeight - windowHeight;
        const trackTop = this.trackEl.offsetTop;

        const targetScrollY = trackTop + (targetProgress * scrollableDistance);

        // Smooth scroll to target position
        window.scrollTo({
            top: targetScrollY,
            behavior: 'smooth'
        });
    }

    navigatePrev() {
        // Left arrow - scroll up to show previous project
        const count = this.projects.length;
        const trackHeight = this.trackEl.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollableDistance = trackHeight - windowHeight;
        const scrollPerProject = scrollableDistance / count;

        window.scrollBy({
            top: -scrollPerProject,
            behavior: 'smooth'
        });
    }

    navigateNext() {
        // Right arrow - scroll down to show next project
        const count = this.projects.length;
        const trackHeight = this.trackEl.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollableDistance = trackHeight - windowHeight;
        const scrollPerProject = scrollableDistance / count;

        window.scrollBy({
            top: scrollPerProject,
            behavior: 'smooth'
        });
    }

    renderItems() {
        this.wheelEl.innerHTML = this.projects.map((project, index) => `
            <li class="gallery-item" data-index="${index}">
                <div class="gallery-item-inner" 
                     role="button" 
                     tabindex="0" 
                     data-link="${project.link}"
                     data-index="${index}">
                    <div class="gallery-card">
                        <div class="gallery-card-bg">
                            <img src="${project.img}" alt="${project.title}" loading="lazy">
                        </div>
                        <div class="gallery-card-overlay"></div>
                        <div class="gallery-card-content">
                            <div>
                                <span class="gallery-card-badge">${project.category}</span>
                                <div class="gallery-card-arrow">
                                    <i class="fas fa-arrow-up-right-from-square"></i>
                                </div>
                            </div>
                            <div class="gallery-card-info">
                                <h3 class="gallery-card-title">${project.title}</h3>
                                <div class="gallery-card-accent"></div>
                            </div>
                            <div class="gallery-card-tech">
                                ${this.renderTechIcons(project.tech)}
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        `).join('');

        this.items = Array.from(this.wheelEl.querySelectorAll('.gallery-item'));
    }

    renderTechIcons(techs) {
        if (!techs || !techs.length) return '';
        return techs.slice(0, 3).map(tech => {
            if (tech === 'ai') {
                return `<div class="gallery-tech-icon"><i class="fas fa-brain"></i></div>`;
            }
            const icon = techIcons[tech];
            return icon ? `<div class="gallery-tech-icon"><img src="${icon}" alt="${tech}"></div>` : '';
        }).join('');
    }

    positionItems() {
        const count = this.items.length;
        if (!count) return;

        this.items.forEach((item, index) => {
            // Calculate angle for this item (distributed evenly around circle)
            const angle = (index / count) * 2 * Math.PI;

            // Calculate x,y position from center
            const x = this.currentRadius * Math.cos(angle);
            const y = this.currentRadius * Math.sin(angle);

            // Rotation angle to make card face outward
            const rotationAngle = (angle * 180) / Math.PI + 90;

            // Apply transform
            item.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) rotate(${rotationAngle}deg)`;
            item.style.zIndex = '10';
        });
    }

    setupWheelDimensions() {
        // Set wheel size
        this.wheelEl.style.width = `${this.circleDiameter}px`;
        this.wheelEl.style.height = `${this.circleDiameter}px`;

        // Position wheel with center below viewport
        // The wheel origin is at center, so we offset it downward
        this.wheelEl.style.transform = `translateX(-50%) translateY(${this.circleDiameter * this.hiddenDecimal}px)`;
    }

    bindEvents() {
        const inners = this.wheelEl.querySelectorAll('.gallery-item-inner');

        inners.forEach((inner, index) => {
            // Click handler
            inner.addEventListener('click', () => {
                const link = inner.dataset.link;
                if (link) window.open(link, '_blank');
            });

            // Keyboard handler
            inner.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const link = inner.dataset.link;
                    if (link) window.open(link, '_blank');
                }
            });

            // Hover events
            inner.addEventListener('mouseenter', () => this.setHovered(index));
            inner.addEventListener('mouseleave', () => this.setHovered(null));
            inner.addEventListener('focus', () => this.setHovered(index));
            inner.addEventListener('blur', () => this.setHovered(null));
        });
    }

    setHovered(index) {
        this.hoveredIndex = index;
        this.updateActiveState();
    }

    /**
     * Calculate scroll progress within the track
     * Returns 0 at start, 1 at end
     */
    getScrollProgress() {
        const trackRect = this.trackEl.getBoundingClientRect();
        const trackHeight = this.trackEl.offsetHeight;
        const windowHeight = window.innerHeight;

        // How far into the track have we scrolled?
        // When track top is at viewport top, progress = 0
        // When track bottom is at viewport bottom, progress = 1
        const scrollableDistance = trackHeight - windowHeight;
        const scrolled = -trackRect.top;

        // Clamp between 0 and 1
        return Math.max(0, Math.min(1, scrolled / scrollableDistance));
    }

    /**
     * Linear Interpolation (Lerp)
     * Smoothly moves from current to target
     */
    lerp(current, target, factor) {
        return current + (target - current) * factor;
    }

    /**
     * The Animation Loop - Heart of the smooth rotation
     * Uses requestAnimationFrame for optimal performance
     */
    startAnimationLoop() {
        const animate = () => {
            // Get target rotation from scroll progress
            const progress = this.getScrollProgress();
            this.targetRotation = progress * 360; // Full rotation

            // Smoothly interpolate current rotation towards target
            this.currentRotation = this.lerp(
                this.currentRotation,
                this.targetRotation,
                this.lerpFactor
            );

            // Apply rotation to wheel
            this.wheelEl.style.transform = `translateX(-50%) translateY(${this.circleDiameter * this.hiddenDecimal}px) rotate(${this.currentRotation}deg)`;

            // CALCULATE ACTIVE INDEX
            const count = this.items.length;
            const anglePerItem = 360 / count;

            // Robust active index finding:
            // Calculate effective angle of each item considering rotation
            // We want to find the item closest to -90deg (Top) which is 270deg in 0-360 scale
            let minDiff = Infinity;
            let activeIdx = 0;

            for (let i = 0; i < count; i++) {
                // Effective angle for this item considering rotation
                let effectiveAngle = ((i * anglePerItem + this.currentRotation) % 360 + 360) % 360;
                // Distance to 270 deg (Top)
                let diff = Math.abs(effectiveAngle - 270);
                if (diff > 180) diff = 360 - diff; // Wrap around

                if (diff < minDiff) {
                    minDiff = diff;
                    activeIdx = i;
                }
            }

            if (this.activeIndex !== activeIdx) {
                this.activeIndex = activeIdx;
                this.updateActiveState();
            }

            // Also update continuously if needed (e.g. for smooth transitions), but state-based is cleaner for text

            // Continue the loop
            requestAnimationFrame(animate);
        };

        // Start the loop
        requestAnimationFrame(animate);
    }

    updateActiveState() {
        const inners = this.wheelEl.querySelectorAll('.gallery-item-inner');
        const project = this.projects[this.activeIndex];

        // Update Description Text
        if (this.titleEl && this.textEl && project) {
            // Only update text regarding content
            if (this.titleEl.innerText !== project.title) {
                this.titleEl.innerText = project.title;
                this.textEl.innerText = project.description || '';

                // Trigger animation
                this.descContainer.classList.remove('fade-in');
                void this.descContainer.offsetWidth;
                this.descContainer.classList.add('fade-in');
            }
        }

        // Update visuals
        inners.forEach((inner, i) => {
            inner.classList.remove('is-active', 'is-blurred', 'is-hovered');
            this.items[i].style.zIndex = '10';

            if (this.hoveredIndex !== null) {
                // Hover overrides active state styling
                if (i === this.hoveredIndex) {
                    inner.classList.add('is-hovered');
                    this.items[i].style.zIndex = '100';
                } else {
                    inner.classList.add('is-blurred');
                }
            } else {
                // No hover - highlight active item
                if (i === this.activeIndex) {
                    inner.classList.add('is-active');
                    this.items[i].style.zIndex = '50';
                } else {
                    inner.classList.add('is-blurred');
                }
            }
        });
    }

    /**
     * Entry animation - cards scale in with stagger
     */
    animateEntry() {
        // Check for reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.items.forEach(item => {
                item.style.opacity = '1';
                item.style.transform = item.style.transform; // Keep positioning
            });
            return;
        }

        // Use GSAP for entry animation if available, otherwise CSS
        if (typeof gsap !== 'undefined') {
            gsap.fromTo(
                this.items,
                { scale: 0, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 1,
                    ease: 'back.out(1.2)',
                    stagger: 0.05,
                    scrollTrigger: {
                        trigger: this.trackEl,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        } else {
            // Fallback: CSS-based entry
            this.items.forEach((item, i) => {
                item.style.opacity = '0';
                item.style.transition = `opacity 0.6s ease ${i * 0.05}s, transform 0.6s ease ${i * 0.05}s`;

                setTimeout(() => {
                    item.style.opacity = '1';
                }, 100 + i * 50);
            });
        }
    }
}

// Copy to clipboard function
function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Copied to clipboard! ', 'success');
        }).catch(() => {
            fallbackCopyToClipboard(text);
        });
    } else {
        fallbackCopyToClipboard(text);
    }
}

// Fallback copy function
function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy');
        showNotification('Copied to clipboard! 📋', 'success');
    } catch (err) {
        showNotification('Failed to copy to clipboard', 'error');
    }

    document.body.removeChild(textArea);
}

// Show notification function
function showNotification(message, type = 'info') {
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    notification.style.cssText = `
        position: fixed; top: 20px; right: 20px; background: ${type === 'success' ? '#36BCF7' : '#ff6b6b'}; color: ${type === 'success' ? 'black' : 'white'}; padding: 1rem 1.5rem; border-radius: 8px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3); z-index: 10000; transform: translateX(400px); transition: transform 0.3s ease; max-width: 300px;`;

    document.body.appendChild(notification);
    setTimeout(() => { notification.style.transform = 'translateX(0)'; }, 100);
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => { if (notification.parentNode) notification.parentNode.removeChild(notification); }, 300);
    }, 4000);

    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => { if (notification.parentNode) notification.parentNode.removeChild(notification); }, 300);
    });
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification-content { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
    .notification-close { background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer; padding: 0; line-height: 1; }
    .notification-close:hover { opacity: 0.8; }
    .animate-in { animation: slideInUp 0.6s ease forwards; }
    @keyframes slideInUp { from { opacity: 0; transform: translateY(30px);} to { opacity: 1; transform: translateY(0);} }
    .nav-menu a.active { color: #36BCF7; }
    .nav-menu a.active::after { width: 100%; }
`;

document.head.appendChild(notificationStyles);

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Initialize Skills Network (moved here to ensure container has dimensions)
    const skillsData = [
        { name: 'Python', type: 'lang', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
        { name: 'PyTorch', type: 'ai', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
        { name: 'TensorFlow', type: 'ai', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
        { name: 'Java', type: 'lang', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
        { name: 'C++', type: 'lang', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
        { name: 'TypeScript', type: 'lang', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
        { name: 'React', type: 'web', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'Node.js', type: 'web', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
        { name: 'HTML5', type: 'web', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
        { name: 'CSS3', type: 'web', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
        { name: 'Flutter', type: 'mobile', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
        { name: 'Kotlin', type: 'mobile', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg' },
        { name: 'Dart', type: 'mobile', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg' },
        { name: 'MySQL', type: 'db', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
        { name: 'MongoDB', type: 'db', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
        { name: 'Docker', type: 'ops', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
        { name: 'Git', type: 'ops', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
        { name: 'Linux', type: 'ops', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' }
    ];

    // Small delay to ensure layout is final
    setTimeout(() => {
        window.skillsNetworkInstance = new SkillsNetwork('skillsNetwork', skillsData);
    }, 100);
    const loadingStyles = document.createElement('style');
    loadingStyles.textContent = `
        body:not(.loaded) { opacity: 0; transition: opacity 0.5s ease; }
        body.loaded { opacity: 1; }
        .hero-left, .hero-right { opacity: 0; transform: translateY(30px); transition: all 0.8s ease; }
        body.loaded .hero-left { opacity: 1; transform: translateY(0); }
        body.loaded .hero-right { opacity: 1; transform: translateY(0); transition-delay: 0.3s; }
    `;
    document.head.appendChild(loadingStyles);

    // Safely render gallery (no impact if section absent)
    try { renderGallery(); } catch (_) { }

    // After gallery loads, equalize the last visual row so bottoms align
    setTimeout(() => {
        try {
            const grid = document.getElementById('galleryGrid');
            if (!grid) return;
            const cards = Array.from(grid.querySelectorAll('.gallery-card'));
            if (!cards.length) return;
            // determine cards in the last visual row by comparing top offsets
            const tops = cards.map(c => c.getBoundingClientRect().top);
            const maxTop = Math.max(...tops);
            const lastRow = cards.filter((c, i) => tops[i] >= maxTop - 2);
            const target = Math.min(...lastRow.map(c => c.querySelector('.gallery-image img')?.height || 0));
            lastRow.forEach(c => {
                const img = c.querySelector('.gallery-image img');
                const wrap = c.querySelector('.gallery-image');
                if (img && wrap && target > 0) {
                    wrap.style.maxHeight = target + 'px';
                    img.style.height = target + 'px';
                    img.style.objectFit = 'cover';
                }
            });
        } catch (_) { }
    }, 50);

    // Handle contact form submission
    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('email').value.trim();
            const mobile = document.getElementById('mobile').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!firstName || !lastName || !email || !message) {
                showNotification('Please fill all required fields.', 'error');
                return;
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            try {
                // Create JSON object instead of FormData
                const jsonPayload = {
                    access_key: '01606bbf-0c7e-40da-b88d-a99a934b8147',
                    name: `${firstName} ${lastName}`,
                    email: email,
                    message: message,
                    subject: 'New Portfolio Contact Message'
                };

                if (mobile) {
                    jsonPayload.mobile = mobile;
                }

                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(jsonPayload)
                });

                const data = await response.json();

                if (response.ok && data.success) {
                    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                    contactForm.reset();
                } else {
                    console.error('Web3Forms Error:', data);
                    throw new Error(data.message || 'Failed to send message');
                }

            } catch (error) {
                console.error('Error sending email:', error);
                // Show the actual error message if available
                showNotification(error.message || 'Failed to send message. Please try again.', 'error');
            } finally {
                // Reset button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
    // --- Achievements 3D & Magnetic Effects ---
    const cards = document.querySelectorAll('.achievement-card-3d');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calculate center
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calculate distance from center
            const deltaX = x - centerX;
            const deltaY = y - centerY;

            // Calculate rotation (max 8deg)
            const rotateX = (deltaY / centerY) * -8; // Invert Y for tilt
            const rotateY = (deltaX / centerX) * 8;

            // Calculate translation (move towards cursor slightly)
            const translateX = (deltaX / centerX) * 10;
            const translateY = (deltaY / centerY) * 10;

            // Apply transform to the inner card
            const inner = card.querySelector('.card-inner');
            if (inner) {
                inner.style.transform = `rotateX(${rotateX}deg) rotateY(${180 + rotateY}deg) translate3d(${translateX}px, ${translateY}px, 0)`;
                // Note: We add 180 to rotateY because the hover effect already flips it. 
                // Wait, the hover effect flips it to 180. If we are hovering, we want to see the back?
                // Actually, the requirement says "Cards flip 180 degrees on hover".
                // If we want the magnetic effect to work on BOTH sides, we need to know if it's flipped.
                // But CSS hover handles the flip. 
                // Conflict: CSS hover rotates Y to 180. JS overwrites transform.
                // Solution: We should apply the magnetic tilt to a wrapper OR handle the flip state in JS.
                // Simpler approach for "Flip on Hover":
                // If we are hovering, it IS flipped. So base rotation is 180.
                // But wait, the user wants "Magnetic Cursor Effect (within 150px radius)".
                // If it's hover, we are definitely within radius.
                // Let's assume the magnetic effect adds to the flip.

                // Correction: The CSS hover does `transform: rotateY(180deg)`.
                // If we set style directly, we override the CSS hover.
                // We need to conditionally apply the base rotation.
                // Since we are in 'mousemove' (hover), the card IS flipped (showing back).
                // So base is 180deg.

                inner.style.transform = `rotateX(${rotateX}deg) rotateY(${180 + rotateY}deg) translate3d(${translateX}px, ${translateY}px, 0)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            const inner = card.querySelector('.card-inner');
            if (inner) {
                // Clear inline style to let CSS take over (return to default state)
                inner.style.transform = '';
            }
        });
    });

    // --- Parallax Scroll Effect for Achievements ---
    // Move cards at different speeds based on column/position
    const masonryGrid = document.querySelector('.achievements-masonry');
    if (masonryGrid) {
        window.addEventListener('scroll', () => {
            if (window.innerWidth < 768) return; // Disable on mobile

            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;

            cards.forEach((card, index) => {
                const rect = card.getBoundingClientRect();

                // Only animate if in view (with buffer)
                if (rect.top < viewportHeight + 100 && rect.bottom > -100) {
                    // Determine speed based on index (simulating columns)
                    // 0, 3, 6 -> Col 1 (Fast)
                    // 1, 4, 7 -> Col 2 (Slow)
                    // 2, 5, 8 -> Col 3 (Medium)
                    let speed = 0;
                    if (index % 3 === 0) speed = -15; // Move up faster
                    else if (index % 3 === 1) speed = 0; // Normal
                    else speed = 15; // Move up slower (lag)

                    // Calculate offset based on scroll progress through viewport
                    // 0 when centered, +/- when above/below
                    const centerOffset = (viewportHeight / 2) - (rect.top + rect.height / 2);
                    const parallaxY = (centerOffset / viewportHeight) * speed;

                    card.style.transform = `translateY(${parallaxY}px)`;
                }
            });
        });
    }
});

// --- Navbar Text Roll Animation ---
function initNavAnimations() {
    const links = document.querySelectorAll('.nav-menu a');
    const STAGGER = 0.035; // Seconds

    links.forEach(link => {
        const text = link.textContent.trim();
        link.textContent = ''; // Clear existing text

        // Create Container
        const container = document.createElement('span');
        container.className = 'nav-roll-item';

        // Create Top and Bottom layers
        const topLayer = document.createElement('span');
        topLayer.className = 'nav-roll-text top';

        const bottomLayer = document.createElement('span');
        bottomLayer.className = 'nav-roll-text bottom';

        // Split text and apply delays
        const chars = text.split('');
        const centerIndex = (chars.length - 1) / 2;

        chars.forEach((char, i) => {
            // Calculate center-out delay
            const delay = STAGGER * Math.abs(i - centerIndex);

            // Create Top Char
            const spanTop = document.createElement('span');
            spanTop.className = 'char';
            spanTop.textContent = char === ' ' ? '\u00A0' : char; // Preserve spaces
            spanTop.style.transitionDelay = `${delay}s`;
            topLayer.appendChild(spanTop);

            // Create Bottom Char
            const spanBottom = document.createElement('span');
            spanBottom.className = 'char';
            spanBottom.textContent = char === ' ' ? '\u00A0' : char;
            spanBottom.style.transitionDelay = `${delay}s`;
            bottomLayer.appendChild(spanBottom);
        });

        container.appendChild(topLayer);
        container.appendChild(bottomLayer);
        link.appendChild(container);
    });
}

// Call animation init
document.addEventListener('DOMContentLoaded', initNavAnimations);

// --- Gallery (safe, self-contained) ---
function renderGallery() {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;

    const base = 'assets/images/Gallery/';
    // Known filenames (edit as needed). Non-existent images fail silently.
    let images = [
        '1738433550786.jpeg',
        '1752930700001.jpeg',
        'IMG-20250827-WA0004.jpg',
        'IMG-20250827-WA0005.jpg',
        'IMG-20250827-WA0008.jpg',
        'IMG-20250827-WA0009.jpg',
        'IMG-20250827-WA0010.jpg',
        'IMG-20250827-WA0011.jpg',
        'WhatsApp Image 2025-08-07 at 09.17.59_fe317955.jpg'
    ];

    // Move the last image to the front to place it on the left side
    if (images.length > 1) {
        const tail = images.pop();
        images.unshift(tail);
    }

    grid.innerHTML = images.map((name, idx) => galleryCard(base + name, idx)).join('');

    // Safe missing-image handling and tweaks
    const cards = grid.querySelectorAll('.gallery-card');
    cards.forEach((card, idx) => {
        const img = card.querySelector('img');
        if (!img) return;

        img.addEventListener('error', () => {
            card.insertAdjacentHTML('beforeend', '<div class="gallery-info">Image unavailable</div>');
        }, { once: true });

        // Specific tweaks matching earlier request
        if (idx === 6) {
            card.classList.add('less-zoom');
        }
        if (idx === 7) {
            const frame = card.querySelector('.gallery-image');
            if (frame) frame.classList.add('short');
        }
    });
}

function galleryCard(src, idx) {
    // Slightly reduce hover zoom for the first item of the third row (idx 6)
    const extraCard = idx === 6 ? 'less-zoom' : '';
    // Reduce frame height on the second item of the third row (idx 7)
    const extraImg = idx === 7 ? 'short' : '';

    // Graceful fallback removed to avoid inline attribute escaping issues
    const onerr = '';

    // Random frame style
    const frames = ['frame-soft', 'frame-pill', 'frame-cut', 'frame-chamfer'];
    const tilts = ['tilt-1', 'tilt-2', 'tilt-3', ''];
    const f = frames[Math.floor(Math.random() * frames.length)];
    const t = tilts[Math.floor(Math.random() * tilts.length)];

    return `
    <div class="gallery-card ${t} ${extraCard}">
        <div class="gallery-image ${f} ${extraImg}">
            <img src="${src}" alt="Gallery image" loading="lazy" ${onerr} />
        </div>
    </div>`;
}

/* ===== STICKY KINETIC NAVBAR LOGIC ===== */
document.addEventListener('DOMContentLoaded', () => {
    initStickyKineticNavbar();
});

function initStickyKineticNavbar() {
    // Check if elements exist to avoid errors
    const container = document.querySelector('.site-header-wrapper');
    if (!container) return;

    // --- 1. SETUP GSAP EASING ---
    const easeName = "kinetic-ease";
    let customEaseSupported = false;
    try {
        if (typeof CustomEase !== "undefined") {
            CustomEase.create(easeName, "0.65, 0.01, 0.05, 0.99");
            customEaseSupported = true;
            console.log('[Nav] CustomEase loaded successfully');
        } else {
            console.log('[Nav] CustomEase not available, using expo.out fallback');
        }
    } catch (e) {
        console.warn("[Nav] CustomEase failed:", e);
    }

    // --- 2. SELECT ELEMENTS ---
    const navWrap = document.querySelector('.nav-overlay-wrapper');
    const menuContent = document.querySelector('.menu-content');
    const overlay = document.querySelector('.overlay');
    const bgLayers = document.querySelectorAll('.backdrop-layer');
    const navLinks = document.querySelectorAll('.nav-link');
    const fadeTargets = document.querySelectorAll('[data-menu-fade]');

    // Toggle Buttons
    const menuButton = document.querySelector('.nav-close-btn');
    const menuButtonTexts = menuButton?.querySelectorAll('p');
    const menuButtonIcon = menuButton?.querySelector('.menu-button-icon');
    const toggleLabel = document.querySelector('.nav-toggle-label');

    // Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
            if (header.parentElement) header.parentElement.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
            if (header.parentElement) header.parentElement.classList.remove('scrolled');
        }
    });

    let isMenuOpen = false;

    // --- 3. BUILD TIMELINE ---
    const tl = gsap.timeline({
        paused: true,
        defaults: { ease: customEaseSupported ? easeName : "expo.out", duration: 0.7 },
        onReverseComplete: () => {
            gsap.set(navWrap, { display: 'none' });
            navWrap.setAttribute('data-nav', 'closed');
            if (menuButton) menuButton.classList.remove('menu-open');
            if (toggleLabel) toggleLabel.classList.remove('menu-open');
        }
    });

    // Sequence: show container → backdrop wipe → links stagger in
    tl.set(navWrap, { display: 'block', pointerEvents: 'auto' })

        // Button Text Swap
        .fromTo(menuButtonTexts, { yPercent: 0 }, { yPercent: -100, stagger: 0.1 }, "<")
        // Icon Rotation
        .fromTo(menuButtonIcon, { rotation: 0 }, { rotation: 315 }, "<")

        // Overlay Fade
        .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1 }, "<")

        // Backdrop Layers Slide In (Left to Right wipe)
        .fromTo(bgLayers, { xPercent: 101 }, { xPercent: 0, stagger: 0.12, duration: 0.575 }, "<")

        // Nav Links Stagger In
        .fromTo(navLinks,
            { yPercent: 140, rotation: 10 },
            { yPercent: 0, rotation: 0, stagger: 0.05 },
            "<+=0.35"
        );

    // Optional Fade Targets
    if (fadeTargets.length) {
        tl.fromTo(fadeTargets,
            { autoAlpha: 0, yPercent: 50 },
            { autoAlpha: 1, yPercent: 0, stagger: 0.04, clearProps: "all" },
            "<+=0.2"
        );
    }

    // --- 4. TOGGLE FUNCTION ---
    function toggleMenu() {
        if (!isMenuOpen) {
            // OPEN
            navWrap.setAttribute('data-nav', 'open');
            document.body.style.overflow = 'hidden';
            isMenuOpen = true;
            // Switch button/label to dark color for light menu background
            if (menuButton) menuButton.classList.add('menu-open');
            if (toggleLabel) toggleLabel.classList.add('menu-open');
            tl.play();

        } else {
            // CLOSE
            document.body.style.overflow = '';
            isMenuOpen = false;
            // Restore button/label to light color for dark page background
            if (menuButton) menuButton.classList.remove('menu-open');
            if (toggleLabel) toggleLabel.classList.remove('menu-open');
            tl.reverse();
        }
    }

    // --- 5. EVENT LISTENERS ---
    if (menuButton) menuButton.addEventListener('click', toggleMenu);
    if (toggleLabel) toggleLabel.addEventListener('click', toggleMenu);
    if (overlay) overlay.addEventListener('click', toggleMenu);

    // Close when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) toggleMenu();
        });
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) toggleMenu();
    });

    // --- 6. KINETIC SHAPE HOVER EFFECTS ---
    const menuItems = document.querySelectorAll('.menu-list-item[data-shape]');
    const shapesContainer = document.querySelector('.ambient-background-shapes');

    menuItems.forEach(item => {
        const shapeIndex = item.getAttribute('data-shape');
        const shape = shapesContainer?.querySelector(`.bg-shape-${shapeIndex}`);
        if (!shape) return;

        const shapeEls = shape.querySelectorAll('.shape-element');

        item.addEventListener('mouseenter', () => {
            // Deactivate others
            shapesContainer.querySelectorAll('.bg-shape').forEach(s => s.classList.remove('active'));
            shape.classList.add('active');

            // Animate In (Reference: scale 0.5->1, opacity 0->1, rotate -10->0)
            gsap.fromTo(shapeEls,
                { scale: 0.5, opacity: 0, rotation: -10 },
                { scale: 1, opacity: 1, rotation: 0, duration: 0.6, stagger: 0.08, ease: "back.out(1.7)", overwrite: "auto" }
            );
        });

        item.addEventListener('mouseleave', () => {
            // Animate Out
            gsap.to(shapeEls, {
                scale: 0.8, opacity: 0, duration: 0.3, ease: "power2.in",
                onComplete: () => {
                    shape.classList.remove('active');
                },
                overwrite: "auto"
            });
        });
    });

    console.log("Kinetic Navbar Initialized", { customEaseSupported });
}
