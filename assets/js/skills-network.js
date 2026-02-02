class SkillsNetwork {
    constructor(canvasId, skills) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.skills = skills;
        this.nodes = [];
        this.connections = [];
        this.activeNode = null;
        this.hoverNode = null;
        this.isVisible = true; // Track visibility for performance

        // Physics params
        this.repulsion = 800;
        this.springLength = 200;
        this.springStrength = 0.05;
        this.damping = 0.9;
        this.centerPull = 0.002;

        this.init();
    }

    init() {
        // Use ResizeObserver for robust size tracking
        const parent = this.canvas.parentElement;
        if (parent) {
            const resizeObserver = new ResizeObserver(() => this.resize());
            resizeObserver.observe(parent);
        } else {
            window.addEventListener('resize', () => this.resize());
        }

        // Initial resize with retries
        this.attemptInit(0);

        // Create Nodes
        this.skills.forEach(skill => {
            this.nodes.push({
                x: Math.random() * this.width || Math.random() * 500, // Fallback if width is 0
                y: Math.random() * this.height || Math.random() * 500,
                vx: 0,
                vy: 0,
                radius: this.isMobile ? 30 : 40, // Bigger icons
                label: skill.name,
                icon: skill.icon,
                type: skill.type,
                img: null
            });
        });

        // Load Images
        this.nodes.forEach(node => {
            if (node.icon) {
                const img = new Image();
                img.crossOrigin = "Anonymous"; // Try to prevent CORS issues
                img.onload = () => { node.loaded = true; };
                img.onerror = () => { node.loaded = false; node.error = true; };
                img.src = node.icon;
                node.img = img;
            }
        });

        // Create Connections
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const a = this.nodes[i];
                const b = this.nodes[j];
                if (a.type === b.type || Math.random() < 0.15) {
                    this.connections.push({ a, b });
                }
            }
        }

        // Setup events
        this.addInteraction();
        this.startOrganicMovement();
<<<<<<< HEAD
        this.setupVisibilityObserver(); // Performance: pause when not in view
=======
>>>>>>> 63238509e3370dc5e7804df6ea71addf1712fae9

        // Start loop
        this.animate();
    }

<<<<<<< HEAD
    // IntersectionObserver to pause animation when canvas is not visible
    setupVisibilityObserver() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    this.isVisible = entry.isIntersecting;
                });
            },
            { threshold: 0.1 } // 10% visible = active
        );
        observer.observe(this.canvas);
    }

=======
>>>>>>> 63238509e3370dc5e7804df6ea71addf1712fae9
    attemptInit(attempt) {
        const success = this.resize();
        if (!success && attempt < 50) { // Retry for ~10 seconds
            // If dimensions are 0, try again shortly
            setTimeout(() => this.attemptInit(attempt + 1), 200);
        } else if (success) {
            // Re-run setup if needed when dimensions finally arrive
            this.nodes.forEach(node => {
                // re-distribute if they were clumped at 0,0
                if (node.x === 0 && node.y === 0) {
                    node.x = Math.random() * this.width;
                    node.y = Math.random() * this.height;
                }
            });
        }
    }

    startOrganicMovement() {
        setInterval(() => {
            if (!this.activeNode && !this.hoverNode) {
                this.disturb();
            }
        }, 4000); // Disturb every 4 seconds
    }

    disturb() {
        // Apply a random "wind" force to all nodes
        const angle = Math.random() * Math.PI * 2;
        const force = 2 + Math.random() * 3;
        const fx = Math.cos(angle) * force;
        const fy = Math.sin(angle) * force;

        this.nodes.forEach(node => {
            // Add some randomness per node so they don't move in perfect unison
            node.vx += fx + (Math.random() - 0.5);
            node.vy += fy + (Math.random() - 0.5);
        });
    }

    resize() {
        this.isMobile = window.innerWidth < 768;

        const parent = this.canvas.parentElement;
        if (parent) {
            const rect = parent.getBoundingClientRect();
            this.width = rect.width || parent.offsetWidth || window.innerWidth;
            // Force minimum height if parent reports 0 or small value
            const minHeight = this.isMobile ? 300 : 500;
            this.height = Math.max(rect.height || parent.offsetHeight || 0, minHeight);
        } else {
            this.width = window.innerWidth;
            this.height = this.isMobile ? 300 : 500;
        }

        // Safety check: ensure visible height on mobile
        if (this.isMobile && this.height < 100) {
            this.height = 300;
        }

        // If still 0 (hidden), abort update but return false
        if (this.width === 0 || this.height === 0) return false;

        this.canvas.width = this.width;
        this.canvas.height = this.height;

        if (this.isMobile) {
            this.repulsion = 600;
            this.springLength = 150;
            this.centerPull = 0.005;
            this.nodes.forEach(node => { node.radius = 30; });
        } else {
            this.repulsion = 1000;
            this.springLength = 300;
            this.centerPull = 0.002;
            this.nodes.forEach(node => { node.radius = 40; });
        }

        return true;
    }

    updatePhysics() {
        // 1. Repulsion
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const a = this.nodes[i];
                const b = this.nodes[j];
                const dx = b.x - a.x;
                const dy = b.y - a.y;
                const distSq = dx * dx + dy * dy;
                if (distSq === 0) {
                    // Safety: if nodes are exactly on top of each other (e.g. 0 init size), push them apart randomly
                    const angle = Math.random() * Math.PI * 2;
                    const force = 1;
                    a.vx -= Math.cos(angle) * force;
                    a.vy -= Math.sin(angle) * force;
                    b.vx += Math.cos(angle) * force;
                    b.vy += Math.sin(angle) * force;
                    continue;
                }

                const dist = Math.sqrt(distSq);
                const force = this.repulsion * 10 / distSq;

                const fx = (dx / dist) * force;
                const fy = (dy / dist) * force;

                a.vx -= fx;
                a.vy -= fy;
                b.vx += fx;
                b.vy += fy;
            }
        }

        // 2. Springs
        this.connections.forEach(conn => {
            const a = conn.a;
            const b = conn.b;
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const force = (dist - this.springLength) * this.springStrength;

            const fx = (dx / dist) * force;
            const fy = (dy / dist) * force;

            a.vx += fx;
            a.vy += fy;
            b.vx -= fx;
            b.vy -= fy;
        });

        // 3. Center Pull
        const cx = this.width / 2;
        const cy = this.height / 2;

        this.nodes.forEach(node => {
            if (node === this.activeNode) return;

            node.vx += (cx - node.x) * this.centerPull;
            node.vy += (cy - node.y) * this.centerPull;

            node.vx *= this.damping;
            node.vy *= this.damping;

            node.x += node.vx;
            node.y += node.vy;

            // Boundaries
            const margin = node.radius;
            if (node.x < margin) node.x = margin;
            if (node.x > this.width - margin) node.x = this.width - margin;
            if (node.y < margin) node.y = margin;
            if (node.y > this.height - margin) node.y = this.height - margin;
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Draw Connections
        this.ctx.lineWidth = 1;
        this.connections.forEach(conn => {
            const isHovered = this.hoverNode && (conn.a === this.hoverNode || conn.b === this.hoverNode);

            this.ctx.beginPath();
            this.ctx.moveTo(conn.a.x, conn.a.y);
            this.ctx.lineTo(conn.b.x, conn.b.y);

            if (isHovered) {
                this.ctx.strokeStyle = 'rgba(54, 188, 247, 0.6)';
                this.ctx.lineWidth = 2;
            } else {
                this.ctx.strokeStyle = 'rgba(54, 188, 247, 0.35)';
                this.ctx.lineWidth = 1;
            }
            this.ctx.stroke();
        });

        // Draw Nodes
        this.nodes.forEach(node => {
            // Glow
            if (node === this.hoverNode || node === this.activeNode) {
                this.ctx.beginPath();
                this.ctx.arc(node.x, node.y, node.radius + 5, 0, Math.PI * 2);
                this.ctx.fillStyle = 'rgba(54, 188, 247, 0.3)';
                this.ctx.fill();
            }

            // Background
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = '#1a1a1a';
            this.ctx.fill();
            this.ctx.strokeStyle = 'rgba(54, 188, 247, 0.5)';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();

            // Icon
            if (node.img && node.loaded && node.img.naturalWidth > 0) {
                const size = node.radius * 1.2;
                this.ctx.drawImage(node.img, node.x - size / 2, node.y - size / 2, size, size);
            } else {
                // Fallback: draw first letter of label if image is loading or failed or missing
                this.ctx.fillStyle = 'rgba(54, 188, 247, 0.8)';
                this.ctx.font = `${node.radius * 0.8}px Arial`;
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.fillText(node.label.charAt(0), node.x, node.y);
            }
        });
    }

    animate() {
<<<<<<< HEAD
        // Performance: Skip updates when canvas not visible or tab hidden
        if (!this.isVisible || document.hidden) {
            requestAnimationFrame(() => this.animate());
            return;
        }

        // Self-healing: if dimensions are invalid, try running resize
        if (this.width === 0 || this.height === 0) {
            this.resize();
        }

=======
        // Self-healing: if dimensions are invalid, try running resize
        if (this.width === 0 || this.height === 0) {
            this.resize();
        }

>>>>>>> 63238509e3370dc5e7804df6ea71addf1712fae9
        // If still invalid, just loop wait
        if (this.width > 0 && this.height > 0) {
            this.updatePhysics();
            this.draw();
        }

        requestAnimationFrame(() => this.animate());
    }

    addInteraction() {
        const getMousePos = (e) => {
            const rect = this.canvas.getBoundingClientRect();
            return {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        };

        const getNodeAt = (x, y) => {
            return this.nodes.find(node => {
                const dx = node.x - x;
                const dy = node.y - y;
                return Math.sqrt(dx * dx + dy * dy) < node.radius + 10;
            });
        };

        this.canvas.addEventListener('mousedown', (e) => {
            const pos = getMousePos(e);
            this.activeNode = getNodeAt(pos.x, pos.y);
        });

        this.canvas.addEventListener('mousemove', (e) => {
            const pos = getMousePos(e);
            this.hoverNode = getNodeAt(pos.x, pos.y);
            this.canvas.style.cursor = this.hoverNode ? 'pointer' : 'default';

            if (this.activeNode) {
                this.activeNode.x = pos.x;
                this.activeNode.y = pos.y;
                this.activeNode.vx = 0;
                this.activeNode.vy = 0;
            }
        });

        window.addEventListener('mouseup', () => {
            this.activeNode = null;
        });
    }
}

window.SkillsNetwork = SkillsNetwork;
