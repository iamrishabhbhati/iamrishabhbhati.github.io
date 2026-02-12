/*
 * main.js — Rishabh Bhati Portfolio
 * Modern ES6+ implementation
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    new CanvasBackground();
    new Navbar();
    new MobileMenu();
    new TypingEffect();
    new ScrollReveal();
    new ProjectFilters();
    new BlogSearch();
});

/* -------------------------------------------------------
   Canvas Background
   Floating particles with constellation effect (lines).
   Premium, subtle, and lightweight.
   ------------------------------------------------------- */
class CanvasBackground {
    constructor() {
        this.canvas = document.getElementById('canvas-bg');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.count = 60; // Number of particles
        this.connectionDist = 140; // Max distance to draw lines

        // Resize observer for responsive canvas
        this.resize();
        window.addEventListener('resize', () => this.resize());

        // Create particles
        this.initParticles();

        // Start loop
        this.animate();
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    initParticles() {
        this.particles = [];
        for (let i = 0; i < this.count; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: (Math.random() - 0.5) * 0.4, // ultra slow velocity
                vy: (Math.random() - 0.5) * 0.4,
                size: Math.random() * 1.5 + 0.5,
                alpha: Math.random() * 0.5 + 0.1,
                // Pulse capability
                pulseSpeed: 0.02,
                growing: Math.random() > 0.5
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Update and draw particles
        this.particles.forEach((p, index) => {
            // Movement
            p.x += p.vx;
            p.y += p.vy;

            // Wrap around edges
            if (p.x < 0) p.x = this.width;
            if (p.x > this.width) p.x = 0;
            if (p.y < 0) p.y = this.height;
            if (p.y > this.height) p.y = 0;

            // Pulse alpha for "twinkle"
            if (p.growing) {
                p.alpha += p.pulseSpeed;
                if (p.alpha >= 0.8) p.growing = false;
            } else {
                p.alpha -= p.pulseSpeed;
                if (p.alpha <= 0.1) p.growing = true;
            }

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
            this.ctx.fill();

            // Draw connections
            for (let j = index + 1; j < this.particles.length; j++) {
                const p2 = this.particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < this.connectionDist) {
                    // Opacity based on distance
                    const opacity = 1 - (dist / this.connectionDist);
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.15})`; // Very subtle lines
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            }
        });

        requestAnimationFrame(() => this.animate());
    }
}


/* -------------------------------------------------------
   Navbar
   ------------------------------------------------------- */
class Navbar {
    constructor() {
        this.nav = document.getElementById('nav');
        if (!this.nav) return;

        this.isHomepage = !this.nav.classList.contains('scrolled');
        this.sections = document.querySelectorAll('section[id]');
        this.links = document.querySelectorAll('.nav-menu a[href^="#"]');

        if (this.isHomepage) {
            window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
            this.handleScroll(); // Init check
        }

        if (this.sections.length && this.links.length) {
            window.addEventListener('scroll', () => this.highlightLink(), { passive: true });
        }
    }

    handleScroll() {
        if (window.scrollY > 50) {
            this.nav.classList.add('scrolled');
        } else {
            this.nav.classList.remove('scrolled');
        }
    }

    highlightLink() {
        let current = '';
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 120) {
                current = section.getAttribute('id');
            }
        });

        this.links.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    }
}


/* -------------------------------------------------------
   Mobile Menu
   ------------------------------------------------------- */
class MobileMenu {
    constructor() {
        this.toggle = document.getElementById('navToggle');
        this.menu = document.getElementById('navMenu');
        if (!this.toggle || !this.menu) return;

        this.toggle.addEventListener('click', () => {
            this.toggle.classList.toggle('open');
            this.menu.classList.toggle('open');
        });

        this.menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                this.toggle.classList.remove('open');
                this.menu.classList.remove('open');
            });
        });
    }
}


/* -------------------------------------------------------
   Typing Effect
   ------------------------------------------------------- */
class TypingEffect {
    constructor() {
        this.el = document.getElementById('typed');
        if (!this.el) return;

        this.roles = [
            'Data Analyst',
            'Dashboard Builder',
            'SQL Enthusiast',
            'MSc Data Science Student'
        ];
        this.roleIdx = 0;
        this.charIdx = 0;
        this.deleting = false;
        this.speed = 80;

        this.tick();
    }

    tick() {
        const word = this.roles[this.roleIdx];

        if (this.deleting) {
            this.charIdx--;
            this.speed = 40;
        } else {
            this.charIdx++;
            this.speed = 80;
        }

        this.el.textContent = word.substring(0, this.charIdx);

        if (!this.deleting && this.charIdx === word.length) {
            this.speed = 2000;
            this.deleting = true;
        } else if (this.deleting && this.charIdx === 0) {
            this.deleting = false;
            this.roleIdx = (this.roleIdx + 1) % this.roles.length;
            this.speed = 400;
        }

        setTimeout(() => this.tick(), this.speed);
    }
}


/* -------------------------------------------------------
   Scroll Reveal
   ------------------------------------------------------- */
class ScrollReveal {
    constructor() {
        this.items = document.querySelectorAll('.reveal');
        if (!this.items.length) return;

        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        this.observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            this.items.forEach(item => this.observer.observe(item));
        } else {
            // Fallback
            this.items.forEach(item => item.classList.add('visible'));
        }
    }
}


/* -------------------------------------------------------
   Project Filters
   ------------------------------------------------------- */
class ProjectFilters {
    constructor() {
        this.buttons = document.querySelectorAll('.filter-btn');
        this.cards = document.querySelectorAll('.project-card[data-category]');
        if (!this.buttons.length || !this.cards.length) return;

        this.buttons.forEach(btn => {
            btn.addEventListener('click', () => this.filter(btn));
        });
    }

    filter(btn) {
        this.buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        this.cards.forEach(card => {
            const match = filter === 'all' || card.getAttribute('data-category').includes(filter);

            if (match) {
                card.style.display = '';
                // Small fade-in animation
                card.style.opacity = '0';
                card.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 30);
            } else {
                card.style.display = 'none';
            }
        });
    }
}


/* -------------------------------------------------------
   Blog Search
   ------------------------------------------------------- */
class BlogSearch {
    constructor() {
        this.input = document.getElementById('blogSearch');
        this.cards = document.querySelectorAll('.blog-card[data-title]');
        if (!this.input || !this.cards.length) return;

        this.input.addEventListener('input', () => this.search());
    }

    search() {
        const query = this.input.value.toLowerCase().trim();

        this.cards.forEach(card => {
            const title = card.getAttribute('data-title').toLowerCase();
            card.style.display = (query === '' || title.includes(query)) ? '' : 'none';
        });
    }
}
