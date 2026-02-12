/*
 * main.js — Rishabh Bhati Portfolio
 *
 * Handles:
 *   - Falling stars background
 *   - Navbar scroll behaviour
 *   - Mobile menu toggle
 *   - Typing effect on hero
 *   - Scroll-triggered reveal animations
 *   - Project filters (projects.html)
 *   - Blog search (blog.html)
 */

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        createStars();
        initNavbar();
        initMobileMenu();
        initTypingEffect();
        initScrollReveal();
        initProjectFilters();
        initBlogSearch();
    });


    /* -------------------------------------------------------
       Falling Stars
       Creates small dot elements inside #stars container.
       Each star gets random position, size, speed, and drift
       via CSS custom properties. CSS @keyframes handles the
       actual animation — this keeps things performant.
       ------------------------------------------------------- */

    function createStars() {
        var container = document.getElementById('stars');
        if (!container) return;

        var count = 60;

        for (var i = 0; i < count; i++) {
            var star = document.createElement('div');
            star.className = 'star';

            /* Randomise each star's appearance and timing */
            var size = (Math.random() * 2 + 0.5).toFixed(2);
            var left = (Math.random() * 100).toFixed(2);
            var duration = (Math.random() * 12 + 6).toFixed(2);
            var delay = (Math.random() * 15).toFixed(2);
            var drift = ((Math.random() - 0.5) * 40).toFixed(2);
            var brightness = (Math.random() * 0.35 + 0.1).toFixed(2);

            star.style.left = left + '%';
            star.style.setProperty('--size', size + 'px');
            star.style.setProperty('--fall-duration', duration + 's');
            star.style.setProperty('--delay', delay + 's');
            star.style.setProperty('--drift', drift + 'px');
            star.style.setProperty('--brightness', brightness);

            container.appendChild(star);
        }
    }


    /* -------------------------------------------------------
       Navbar
       Adds a blurred background and border on scroll.
       Also highlights the active nav link based on which
       section is currently in view.
       ------------------------------------------------------- */

    function initNavbar() {
        var nav = document.getElementById('nav');
        if (!nav) return;

        /* Only add scroll class on homepage (sub-pages have it by default) */
        var isHomepage = !nav.classList.contains('scrolled');

        if (isHomepage) {
            var handleScroll = function () {
                if (window.scrollY > 50) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
            };

            window.addEventListener('scroll', handleScroll, { passive: true });
            handleScroll();
        }

        /* Highlight active section in nav */
        var sections = document.querySelectorAll('section[id]');
        var links = document.querySelectorAll('.nav-menu a[href^="#"]');

        if (sections.length && links.length) {
            window.addEventListener('scroll', function () {
                var current = '';
                for (var i = 0; i < sections.length; i++) {
                    if (window.scrollY >= sections[i].offsetTop - 120) {
                        current = sections[i].getAttribute('id');
                    }
                }
                for (var j = 0; j < links.length; j++) {
                    links[j].classList.toggle(
                        'active',
                        links[j].getAttribute('href') === '#' + current
                    );
                }
            }, { passive: true });
        }
    }


    /* -------------------------------------------------------
       Mobile Menu
       Toggles the nav-menu on small screens.
       ------------------------------------------------------- */

    function initMobileMenu() {
        var toggle = document.getElementById('navToggle');
        var menu = document.getElementById('navMenu');
        if (!toggle || !menu) return;

        toggle.addEventListener('click', function () {
            toggle.classList.toggle('open');
            menu.classList.toggle('open');
        });

        /* Close menu when a link is tapped */
        var links = menu.querySelectorAll('a');
        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener('click', function () {
                toggle.classList.remove('open');
                menu.classList.remove('open');
            });
        }
    }


    /* -------------------------------------------------------
       Typing Effect
       Cycles through role strings on the hero.
       Types one character at a time, pauses, deletes, repeats.
       ------------------------------------------------------- */

    function initTypingEffect() {
        var el = document.getElementById('typed');
        if (!el) return;

        var roles = [
            'Data Analyst',
            'Dashboard Builder',
            'SQL Enthusiast',
            'MSc Data Science Student'
        ];

        var roleIdx = 0;
        var charIdx = 0;
        var deleting = false;
        var speed = 80;

        function tick() {
            var word = roles[roleIdx];

            if (deleting) {
                charIdx--;
                speed = 40;
            } else {
                charIdx++;
                speed = 80;
            }

            el.textContent = word.substring(0, charIdx);

            if (!deleting && charIdx === word.length) {
                speed = 2000; /* pause at full word */
                deleting = true;
            } else if (deleting && charIdx === 0) {
                deleting = false;
                roleIdx = (roleIdx + 1) % roles.length;
                speed = 400;
            }

            setTimeout(tick, speed);
        }

        tick();
    }


    /* -------------------------------------------------------
       Scroll Reveal
       Fades in elements with the .reveal class when they
       enter the viewport. Uses IntersectionObserver for
       performance; falls back to showing everything if
       the API isn't supported.
       ------------------------------------------------------- */

    function initScrollReveal() {
        var items = document.querySelectorAll('.reveal');
        if (!items.length) return;

        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function (entries) {
                for (var i = 0; i < entries.length; i++) {
                    if (entries[i].isIntersecting) {
                        entries[i].target.classList.add('visible');
                        observer.unobserve(entries[i].target);
                    }
                }
            }, { threshold: 0.1 });

            for (var i = 0; i < items.length; i++) {
                observer.observe(items[i]);
            }
        } else {
            for (var i = 0; i < items.length; i++) {
                items[i].classList.add('visible');
            }
        }
    }


    /* -------------------------------------------------------
       Project Filters (projects.html)
       Shows/hides project cards based on the data-category
       attribute. "all" shows everything.
       ------------------------------------------------------- */

    function initProjectFilters() {
        var buttons = document.querySelectorAll('.filter-btn');
        var cards = document.querySelectorAll('.project-card[data-category]');
        if (!buttons.length || !cards.length) return;

        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', (function (btn) {
                return function () {
                    /* Update active button */
                    for (var j = 0; j < buttons.length; j++) {
                        buttons[j].classList.remove('active');
                    }
                    btn.classList.add('active');

                    var filter = btn.getAttribute('data-filter');

                    for (var k = 0; k < cards.length; k++) {
                        var match = filter === 'all' ||
                            cards[k].getAttribute('data-category').indexOf(filter) > -1;

                        cards[k].style.display = match ? '' : 'none';

                        if (match) {
                            cards[k].style.opacity = '0';
                            cards[k].style.transform = 'translateY(10px)';
                            /* Trigger reflow, then animate in */
                            (function (card) {
                                setTimeout(function () {
                                    card.style.opacity = '1';
                                    card.style.transform = 'translateY(0)';
                                }, 30);
                            })(cards[k]);
                        }
                    }
                };
            })(buttons[i]));
        }
    }


    /* -------------------------------------------------------
       Blog Search (blog.html)
       Filters blog cards by matching the search query
       against the data-title attribute.
       ------------------------------------------------------- */

    function initBlogSearch() {
        var input = document.getElementById('blogSearch');
        var cards = document.querySelectorAll('.blog-card[data-title]');
        if (!input || !cards.length) return;

        input.addEventListener('input', function () {
            var query = input.value.toLowerCase().trim();

            for (var i = 0; i < cards.length; i++) {
                var title = cards[i].getAttribute('data-title').toLowerCase();
                cards[i].style.display = (query === '' || title.indexOf(query) > -1)
                    ? '' : 'none';
            }
        });
    }

})();
