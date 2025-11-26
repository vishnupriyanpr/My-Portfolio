class TagCloud {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.items = Array.from(this.container.getElementsByClassName('tag-item'));
        this.radius = options.radius || 250;
        this.depth = options.depth || 250;
        this.size = options.size || 250;
        this.mouseX = 0;
        this.mouseY = 0;
        this.active = false;

        // Initial rotation speed
        this.baseSpeed = 0.005;
        this.vx = this.baseSpeed;
        this.vy = this.baseSpeed;

        this.init();
    }

    init() {
        this.positionTags();
        this.animate();
        this.addEventListeners();
    }

    positionTags() {
        const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

        this.items.forEach((item, i) => {
            const y = 1 - (i / (this.items.length - 1)) * 2; // y goes from 1 to -1
            const radiusAtY = Math.sqrt(1 - y * y); // Radius at y
            const theta = phi * i; // Golden angle increment

            const x = Math.cos(theta) * radiusAtY;
            const z = Math.sin(theta) * radiusAtY;

            // Store 3D coordinates
            item.x = x * this.radius;
            item.y = y * this.radius;
            item.z = z * this.radius;
        });
    }

    rotate(angleX, angleY) {
        const sinX = Math.sin(angleX);
        const cosX = Math.cos(angleX);
        const sinY = Math.sin(angleY);
        const cosY = Math.cos(angleY);

        this.items.forEach(item => {
            // Rotate around Y axis
            const x1 = item.x * cosY - item.z * sinY;
            const z1 = item.z * cosY + item.x * sinY;

            // Rotate around X axis
            const y1 = item.y * cosX - z1 * sinX;
            const z2 = z1 * cosX + item.y * sinX;

            item.x = x1;
            item.y = y1;
            item.z = z2;
        });
    }

    update() {
        // Apply rotation based on velocity
        this.rotate(this.vy, this.vx);

        // Apply friction to return to base speed if not interacting
        if (!this.active) {
            this.vx = this.vx * 0.98 + this.baseSpeed * 0.02;
            this.vy = this.vy * 0.98 + this.baseSpeed * 0.02;
        }

        this.items.forEach(item => {
            // Perspective projection
            const scale = this.depth / (this.depth - item.z);
            const alpha = (item.z + this.radius) / (2 * this.radius);

            // Apply transform
            const translateX = item.x + this.size; // Center in container (assuming 600x600 container, center is 300,300 but we use relative positioning)
            const translateY = item.y + this.size;

            // Actually, let's center it based on container size
            // The container is 600x600, so center is 300,300. 
            // item.x/y are centered around 0,0.

            const x = item.x + this.container.offsetWidth / 2 - item.offsetWidth / 2;
            const y = item.y + this.container.offsetHeight / 2 - item.offsetHeight / 2;

            item.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
            item.style.opacity = Math.max(0.2, alpha);
            item.style.zIndex = Math.floor(scale * 100);
            item.style.filter = `blur(${(1 - scale) * 2}px)`;
        });
    }

    animate() {
        this.update();
        requestAnimationFrame(() => this.animate());
    }

    addEventListeners() {
        const container = this.container.parentElement; // Use parent for larger hit area

        container.addEventListener('mousemove', (e) => {
            this.active = true;
            const rect = this.container.getBoundingClientRect();

            // Calculate mouse position relative to center of container
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const dx = e.clientX - centerX;
            const dy = e.clientY - centerY;

            // Update velocity based on mouse position
            this.vx = dx * 0.0001;
            this.vy = dy * 0.0001;
        });

        container.addEventListener('mouseleave', () => {
            this.active = false;
        });

        // Touch support
        container.addEventListener('touchmove', (e) => {
            this.active = true;
            const rect = this.container.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const dx = e.touches[0].clientX - centerX;
            const dy = e.touches[0].clientY - centerY;

            this.vx = dx * 0.0001;
            this.vy = dy * 0.0001;
        }, { passive: true });

        container.addEventListener('touchend', () => {
            this.active = false;
        });
    }
}

// Export if using modules, or just attach to window
window.TagCloud = TagCloud;
