/* ═══════════════════════════════════════════════════
   Rishabh Bhati — Portfolio Scripts
   ═══════════════════════════════════════════════════ */

(function () {
    'use strict';

    /* ── Falling Stars (Canvas) ───────────────────── */

    var canvas = document.getElementById('starfield');
    var ctx = canvas.getContext('2d');
    var stars = [];
    var shootingStars = [];
    var STAR_COUNT = 160;
    var SHOOTING_INTERVAL = 3000; // ms between shooting stars

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    // generate background twinkle-stars
    function createStars() {
        stars = [];
        for (var i = 0; i < STAR_COUNT; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 1.4 + 0.3,
                baseAlpha: Math.random() * 0.6 + 0.2,
                alpha: 0,
                twinkleSpeed: Math.random() * 0.02 + 0.005,
                twinkleDir: 1,
                drift: Math.random() * 0.15 + 0.02
            });
        }
    }
    createStars();

    // shooting star object
    function spawnShootingStar() {
        var startX = Math.random() * canvas.width * 0.8;
        var startY = Math.random() * canvas.height * 0.4;
        shootingStars.push({
            x: startX,
            y: startY,
            len: Math.random() * 60 + 40,
            speed: Math.random() * 6 + 4,
            alpha: 1,
            angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3
        });
    }

    setInterval(spawnShootingStar, SHOOTING_INTERVAL);

    function drawFrame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // draw & update twinkle-stars
        for (var i = 0; i < stars.length; i++) {
            var s = stars[i];
            // slowly fall
            s.y += s.drift;
            if (s.y > canvas.height + 4) {
                s.y = -4;
                s.x = Math.random() * canvas.width;
            }
            // twinkle
            s.alpha += s.twinkleSpeed * s.twinkleDir;
            if (s.alpha >= s.baseAlpha + 0.3) s.twinkleDir = -1;
            if (s.alpha <= s.baseAlpha - 0.2) s.twinkleDir = 1;
            s.alpha = Math.max(0.05, Math.min(1, s.alpha));

            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,255,255,' + s.alpha + ')';
            ctx.fill();
        }

        // draw shooting stars
        for (var j = shootingStars.length - 1; j >= 0; j--) {
            var ss = shootingStars[j];
            var tailX = ss.x - Math.cos(ss.angle) * ss.len;
            var tailY = ss.y - Math.sin(ss.angle) * ss.len;

            var grad = ctx.createLinearGradient(ss.x, ss.y, tailX, tailY);
            grad.addColorStop(0, 'rgba(255,255,255,' + ss.alpha + ')');
            grad.addColorStop(1, 'rgba(255,255,255,0)');

            ctx.beginPath();
            ctx.moveTo(ss.x, ss.y);
            ctx.lineTo(tailX, tailY);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // bright head
            ctx.beginPath();
            ctx.arc(ss.x, ss.y, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,255,255,' + ss.alpha + ')';
            ctx.fill();

            // move
            ss.x += Math.cos(ss.angle) * ss.speed;
            ss.y += Math.sin(ss.angle) * ss.speed;
            ss.alpha -= 0.008;

            // remove when off-screen or faded
            if (ss.alpha <= 0 || ss.x > canvas.width + 100 || ss.y > canvas.height + 100) {
                shootingStars.splice(j, 1);
            }
        }

        requestAnimationFrame(drawFrame);
    }
    drawFrame();


    /* ── Navbar scroll state ──────────────────────── */

    var navbar = document.getElementById('navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });


    /* ── Mobile nav toggle ────────────────────────── */

    var toggle = document.getElementById('navToggle');
    var links = document.getElementById('navLinks');

    toggle.addEventListener('click', function () {
        toggle.classList.toggle('active');
        links.classList.toggle('open');
    });

    // close mobile nav when a link is tapped
    var navAnchors = links.querySelectorAll('a');
    for (var k = 0; k < navAnchors.length; k++) {
        navAnchors[k].addEventListener('click', function () {
            toggle.classList.remove('active');
            links.classList.remove('open');
        });
    }


    /* ── Active nav highlight on scroll ───────────── */

    var sections = document.querySelectorAll('section[id]');

    function highlightNav() {
        var scrollPos = window.scrollY + 120;

        sections.forEach(function (sec) {
            var top = sec.offsetTop;
            var bottom = top + sec.offsetHeight;
            var id = sec.getAttribute('id');
            var link = document.querySelector('.nav-links a[href="#' + id + '"]');

            if (link) {
                if (scrollPos >= top && scrollPos < bottom) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNav);
    highlightNav();


    /* ── Scroll Reveal (Intersection Observer) ────── */

    var revealEls = document.querySelectorAll('[data-reveal]');

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

        revealEls.forEach(function (el) { observer.observe(el); });
    } else {
        // fallback: show everything
        revealEls.forEach(function (el) { el.classList.add('revealed'); });
    }

})();
