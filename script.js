// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Create dynamic particles
    createParticles();
    
    // Particle creation function
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        const isSmall = window.innerWidth <= 600;
        const particleCount = isSmall ? 140 : 220; // rich density on all screens
        
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
    // Smooth scrolling for navigation (only navbar/footer anchors)
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"], .footer-links a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to navigation based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-menu a');
    
    window.addEventListener('scroll', () => {
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
    });

    // Wire certification credential URLs
    const certificationUrls = {
        cert1: 'https://www.udemy.com/certificate/UC-c78f2ef5-7cfb-4f63-9078-9c42b25dc2e7',
        cert2: 'https://www.udemy.com/certificate/UC-e2fda013-13a5-4dd0-bba6-2b46f4261508/',
        cert3: 'https://www.sololearn.com/certificates/CC-WVFVQYXD',
        cert4: 'https://www.coursera.org/account/accomplishments/verify/QVOUHN8W8YYF'
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
    
    floatingHeart.addEventListener('click', function() {
        // Create a temporary input to copy the command
        const tempInput = document.createElement('input');
        tempInput.value = 'npx vishnupriyan';
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        
        // Show success message
        showNotification('Command copied to clipboard! 🚀', 'success');
        
        // Add click animation
        this.style.transform = 'scale(1.3) rotate(25deg)';
        setTimeout(() => {
            this.style.transform = 'scale(1) rotate(0deg)';
        }, 200);
    });

    // Copy to clipboard functionality for the contact section
    const copyBtn = document.querySelector('.copy-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const command = this.parentElement.querySelector('code').textContent;
            copyToClipboard(command);
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

    // Add typing effect to hero title
    const typingTarget = document.getElementById('typingText');
    if (typingTarget) {
        const lines = [
            'Competitive Programmer',
            'AI & ML Enthusiast',
            'Tech Explorer — chasing the next big innovation 🚀',
            'Open‑Source Contributor',
            'Car Guy — fueled by speed and curiosity 🏎️'
        ];
        let idx = 0;
        let char = 0;
        let deleting = false;
        const typeSpeed = () => (deleting ? 30 : 50);
        const pauseBetween = 1100;

        const tick = () => {
            const full = lines[idx];
            if (!deleting) {
                typingTarget.textContent = full.slice(0, char + 1);
                char++;
                if (char === full.length) {
                    deleting = true;
                    return setTimeout(tick, pauseBetween);
                }
            } else {
                typingTarget.textContent = full.slice(0, char - 1);
                char--;
                if (char === 0) {
                    deleting = false;
                    idx = (idx + 1) % lines.length;
                }
            }
            setTimeout(tick, typeSpeed());
        };
        setTimeout(tick, 400);
    }

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
});

async function renderPinnedProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;

    const fallback = [
        { repo: 'Terminal-pal 💻🤖', owner: 'vishnupriyanpr', link: 'https://github.com/vishnupriyanpr/terminal-pal', description: 'AI Terminal Pal: multi-AI terminal assistant with smart project analysis (Online + Offline LLMs powered).'},
        { repo: 'Oxocare ➕💻', owner: 'vishnupriyanpr', link: 'https://github.com/vishnupriyanpr/oxocare', description: 'MedDoc Scanner: OCR + secure storage with intuitive dashboard, and Global Medical DataBase (Android App - Kotlin).'},
        { repo: 'Verve 🍚🤖', owner: 'vishnupriyanpr', link: 'https://github.com/vishnupriyanpr/verve', description: 'AI-powered nutritional advisor for chronic disease management (Android App - Flutter).'},
        { repo: 'UltraCodeAI 💻🤖', owner: 'vishnupriyanpr', link: 'https://github.com/vishnupriyanpr/ultracodeai', description: 'AI-powered IntelliJ plugin: context-aware prompts and refactors (Online + Offline LLMs powered).'},
        { repo: 'PrediChurn 🧠🤖', owner: 'vishnupriyanpr', link: 'https://github.com/vishnupriyanpr/PrediChurn', description: 'End-to-end churn prediction ML pipeline with feature engineering and tuning (Churn - Prediction).'},
        { repo: 'PharmaScan 🧑‍⚕️🤖', owner: 'vishnupriyanpr', link: 'https://github.com/vishnupriyanpr/PharmaScan', description: 'Medicine strip scanner powered by AI for quick identification (Android App - Kotlin).' },
    ];

    let repos = [];
    try {
        const res = await fetch('https://gh-pinned-repos.egoist.dev/?username=vishnupriyanpr', { cache: 'no-store' });
        if (res.ok) {
            const data = await res.json();
            repos = (data || []).slice(0, 6).map(d => ({
                repo: d.repo,
                owner: d.owner,
                link: `https://github.com/${d.owner}/${d.repo}`,
                description: d.description || '',
                language: d.language || '',
                stars: d.stars || 0,
            }));
        }
    } catch (e) {
        // ignore and use fallback
    }

    if (!repos.length) repos = fallback;

    grid.innerHTML = repos.map(r => projectCardHTML(r)).join('');

    // Bind click for button and card
    grid.querySelectorAll('.project-card').forEach(card => {
        const url = card.getAttribute('data-github');
        card.addEventListener('click', () => window.open(url, '_blank'));
        const btn = card.querySelector('.view-btn');
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                window.open(url, '_blank');
            });
        }
    });
}

function projectCardHTML(r) {
    return `
    <div class="project-card" data-github="${r.link}">
        <div class="project-header">
            <h3>${r.repo}</h3>
        </div>
        <p>${r.description || ''}</p>
        <div class="project-badge"><i class="fab fa-github"></i><span>View project</span></div>
    </div>`;
}

// Copy to clipboard function
function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Copied to clipboard! 📋', 'success');
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
        position: fixed; top: 20px; right: 20px; background: ${type === 'success' ? '#36BCF7' : '#ff6b6b'}; color: white; padding: 1rem 1.5rem; border-radius: 8px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3); z-index: 10000; transform: translateX(400px); transition: transform 0.3s ease; max-width: 300px;`;
    
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
    try { renderGallery(); } catch (_) {}

    // Wire quick message popover
    const btn = document.getElementById('messageBtn');
    const pop = document.getElementById('messagePopover');
    if (btn && pop) {
        let open = false;
        const toggle = () => {
            open = !open;
            pop.hidden = !open;
        };
        btn.addEventListener('click', (e) => { e.preventDefault(); toggle(); });
        document.addEventListener('click', (e) => {
            if (!open) return;
            if (e.target === btn || pop.contains(e.target)) return;
            pop.hidden = true; open = false;
        });

        const send = document.getElementById('sendMsg');
        if (send) {
            send.addEventListener('click', () => {
                const name = (document.getElementById('msgName')||{}).value || '';
                const email = (document.getElementById('msgEmail')||{}).value || '';
                const body = (document.getElementById('msgBody')||{}).value || '';
                if (!name || !email || !body) { showNotification('Please fill all fields.', 'error'); return; }
                const subject = encodeURIComponent(`Message from ${name}`);
                const msg = encodeURIComponent(`${body}\n\nFrom: ${name} <${email}>`);
                const to = 'priyanv783@gmail.com';
                window.location.href = `mailto:${to}?subject=${subject}&body=${msg}`;
                // auto-collapse after send attempt
                pop.hidden = true; open = false;
            });
        }
    }
});

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
        'WhatsApp%20Image%202025-08-07%20at%2009.17.59_fe317955.jpg'
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
    const frames = ['frame-soft','frame-pill','frame-cut','frame-chamfer'];
    const tilts = ['tilt-1','tilt-2','tilt-3',''];
    const f = frames[Math.floor(Math.random()*frames.length)];
    const t = tilts[Math.floor(Math.random()*tilts.length)];

    return `
    <div class="gallery-card ${t} ${extraCard}">
        <div class="gallery-image ${f} ${extraImg}">
            <img src="${src}" alt="Gallery image" loading="lazy" ${onerr} />
        </div>
    </div>`;
}
