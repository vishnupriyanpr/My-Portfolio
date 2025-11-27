document.addEventListener('DOMContentLoaded', function () {
    // Initialize Skills Network
    const skillsData = [
        { name: 'Python', type: 'lang', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
        { name: 'PyTorch', type: 'ai', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
        { name: 'TensorFlow', type: 'ai', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
        { name: 'Java', type: 'lang', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
        { name: 'C++', type: 'lang', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
        { name: 'JavaScript', type: 'lang', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
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

    new SkillsNetwork('skillsNetwork', skillsData);

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

    // Smooth scrolling for navigation (only navbar/footer anchors)
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"], .footer-links a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
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
        window.addEventListener('scroll', () => {
            // Disable animation on mobile to prevent stuttering
            if (window.innerWidth < 768) {
                timelineBeam.style.opacity = '0'; // Hide beam on mobile
                return;
            }

            const rect = timelineWrapper.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Calculate scroll progress within the timeline section
            // Start slightly before the section enters (rect.top < viewportHeight)
            // End when the section leaves (rect.bottom > 0)

            if (rect.top < viewportHeight && rect.bottom > 0) {
                // Determine beam position relative to the track
                // We want the beam to follow the center of the viewport or just below the header
                const relativeY = Math.min(Math.max(0, (viewportHeight / 2) - rect.top), rect.height - 100);

                timelineBeam.style.top = `${relativeY}px`;
                timelineBeam.style.opacity = '1';
            } else {
                timelineBeam.style.opacity = '0';
            }
        });
    }
});

async function renderPinnedProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;

    const fallback = [
        { repo: 'Terminal-pal ', owner: 'vishnupriyanpr', link: 'https://github.com/vishnupriyanpr/terminal-pal', description: 'AI Terminal Pal: multi-AI terminal assistant with smart project analysis (Online + Offline LLMs powered).' },
        { repo: 'Oxocare ', owner: 'vishnupriyanpr', link: 'https://github.com/vishnupriyanpr/oxocare', description: 'MedDoc Scanner: OCR + secure storage with intuitive dashboard, and Global Medical DataBase (Android App - Kotlin).' },
        { repo: 'Verve ', owner: 'vishnupriyanpr', link: 'https://github.com/vishnupriyanpr/verve', description: 'AI-powered nutritional advisor for chronic disease management (Android App - Flutter).' },
        { repo: 'UltraCodeAI ', owner: 'vishnupriyanpr', link: 'https://github.com/vishnupriyanpr/ultracodeai', description: 'AI-powered IntelliJ plugin: context-aware prompts and refactors (Online + Offline LLMs powered).' },
        { repo: 'PrediChurn ', owner: 'vishnupriyanpr', link: 'https://github.com/vishnupriyanpr/PrediChurn', description: 'End-to-end churn prediction ML pipeline with feature engineering and tuning (Churn - Prediction).' },
        { repo: 'PharmaScan ', owner: 'vishnupriyanpr', link: 'https://github.com/vishnupriyanpr/PharmaScan', description: 'Medicine strip scanner powered by AI for quick identification (Android App - Kotlin).' },
        { repo: 'Vishnu-cli-npx ', owner: 'vishnupriyanpr', link: 'https://github.com/vishnupriyanpr/Vishnu-cli-npx', description: 'Personal, zero-install CLI card — run npx vishnupriyan to view profile, socials, and projects in your terminal.' },
        { repo: 'Cardiac-Care ', owner: 'vishnupriyanpr', link: 'https://github.com/vishnupriyanpr/Cardiac-Care', description: 'AI-powered heart health suite: ECG analysis, chatbot, diet planner, report summarizer, patient records, and ambulance booking.' },
    ];

    // Render fallback immediately so Projects never appears empty
    grid.innerHTML = fallback.map(r => projectCardHTML(r)).join('');
    // Bind click for the immediately rendered cards
    grid.querySelectorAll('.project-card').forEach(card => {
        const url = card.getAttribute('data-github');
        if (url) card.addEventListener('click', () => window.open(url, '_blank'));
    });

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
            // Merge with fallback to ensure at least six projects remain visible
            const requested = [
                { repo: 'Vishnu-cli-npx ', owner: 'vishnupriyanpr', link: 'https://github.com/vishnupriyanpr/Vishnu-cli-npx', description: 'Personal, zero-install CLI card — run npx vishnupriyan to view profile, socials, and projects in your terminal.' },
                { repo: 'Cardiac-Care ', owner: 'vishnupriyanpr', link: 'https://github.com/vishnupriyanpr/Cardiac-Care', description: 'AI-powered heart health suite: ECG analysis, chatbot, diet planner, report summarizer, patient records, and ambulance booking.' }
            ];
            const seen = new Set(repos.map(r => r.link));
            // Backfill from fallback until we have 6
            fallback.forEach(f => {
                if (repos.length < 6 && !seen.has(f.link)) {
                    repos.push(f);
                    seen.add(f.link);
                }
            });
            // Append the two requested projects as an extra row
            requested.forEach(p => { if (!seen.has(p.link)) repos.push(p); });
        }
    } catch (e) {
        // ignore and use fallback
    }

    if (!repos.length) return; // keep fallback content

    // Replace with merged live+fallback data
    grid.innerHTML = repos.map(r => projectCardHTML(r)).join('');

    grid.querySelectorAll('.project-card').forEach(card => {
        const url = card.getAttribute('data-github');
        if (url) card.addEventListener('click', () => window.open(url, '_blank'));

        // Spotlight effect logic
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

function projectCardHTML(r) {
    // Add logos for specific projects
    const isTerminalPal = r.repo.toLowerCase().includes('terminal-pal');
    const isUltraCodeAI = r.repo.toLowerCase().includes('ultracodeai');
    const isOxocare = r.repo.toLowerCase().includes('oxocare');
    const isPharmaScan = r.repo.toLowerCase().includes('pharmascan');
    const isVerve = r.repo.toLowerCase().includes('verve');
    const isPrediChurn = r.repo.toLowerCase().includes('predichurn');
    const isVishnuCLI = r.repo.toLowerCase().includes('vishnu-cli-npx');
    const isCardiacCare = r.repo.toLowerCase().includes('cardiac-care');
    let logos = '';

    if (isTerminalPal) {
        logos = `
            <div class="project-lang-badge python-badge"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" /></div>
            <div class="project-lang-badge ai-badge"><i class="fas fa-brain"></i></div>
        `;
    } else if (isUltraCodeAI) {
        logos = `
            <div class="project-lang-badge java-badge"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java" /></div>
            <div class="project-lang-badge ai-badge"><i class="fas fa-brain"></i></div>
        `;
    } else if (isOxocare) {
        logos = `
            <div class="project-lang-badge kotlin-badge"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" alt="Kotlin" /></div>
            <div class="project-lang-badge sql-badge"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" alt="SQL" /></div>
            <div class="project-lang-badge ocr-badge"><i class="fas fa-eye"></i></div>
        `;
    } else if (isPharmaScan) {
        logos = `
            <div class="project-lang-badge kotlin-badge"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" alt="Kotlin" /></div>
            <div class="project-lang-badge ai-badge"><i class="fas fa-brain"></i></div>
        `;
    } else if (isVerve) {
        logos = `
            <div class="project-lang-badge flutter-badge"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" alt="Flutter" /></div>
            <div class="project-lang-badge dart-badge"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" alt="Dart" /></div>
            <div class="project-lang-badge ai-badge"><i class="fas fa-brain"></i></div>
        `;
    } else if (isPrediChurn) {
        logos = `
            <div class="project-lang-badge python-badge"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" /></div>
            <div class="project-lang-badge pytorch-badge"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" alt="PyTorch" /></div>
            <div class="project-lang-badge ai-badge"><i class="fas fa-brain"></i></div>
        `;
    } else if (isCardiacCare) {
        logos = `
            <div class="project-lang-badge python-badge"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" /></div>
            <div class="project-lang-badge pytorch-badge"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" alt="PyTorch" /></div>
            <div class="project-lang-badge ai-badge"><i class="fas fa-brain"></i></div>
        `;
    } else if (isVishnuCLI) {
        logos = `
            <div class="project-lang-badge nodejs-badge"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" /></div>
            <div class="project-lang-badge npm-badge"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" alt="npm" /></div>
        `;
    }

    // Add special class for projects with 3 badges positioning
    const cardClass = (isVerve || isOxocare || isPrediChurn || isCardiacCare) ? 'project-card three-badges-project' : 'project-card';

    return `
    <div class="${cardClass}" data-github="${r.link}">
        <div class="project-header">
            <h3>${r.repo}</h3>
            ${logos}
        </div>
        <p>${r.description || ''}</p>
        <div class="project-badge"><i class="fab fa-github"></i><span>View project</span></div>
    </div>`;
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
