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

        // Physics params
        this.repulsion = 800;
        this.springLength = 200;
        this.springStrength = 0.05;
        this.damping = 0.9;
        this.centerPull = 0.002;

        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());

        // Force a resize after a short delay to handle mobile layout shifts
        setTimeout(() => this.resize(), 500);

        // Create Nodes
        this.skills.forEach(skill => {
            this.nodes.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
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

        this.addInteraction();
        this.startOrganicMovement();
        this.animate();
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
            this.height = rect.height || parent.offsetHeight || (this.isMobile ? 300 : 500);
        } else {
            this.width = window.innerWidth;
            this.height = this.isMobile ? 300 : 500;
        }

        // Safety check: ensure visible height on mobile
        if (this.isMobile && this.height < 100) {
            this.height = 300;
        }

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
                if (distSq === 0) continue;

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
                this.ctx.strokeStyle = 'rgba(54, 188, 247, 0.15)';
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
            if (node.img && node.img.complete) {
                const size = node.radius * 1.2;
                this.ctx.drawImage(node.img, node.x - size / 2, node.y - size / 2, size, size);
            }
        });
    }

    animate() {
        this.updatePhysics();
        this.draw();
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
