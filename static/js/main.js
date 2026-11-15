/**
 * LINAR INSURANCE — CINEMATIC INTERACTIVE SCRIPT (main.js)
 * Modern Vanilla JS with IntersectionObserver, Parallax, and Smooth Navigation
 */

'use strict';

document.addEventListener('DOMContentLoaded', function () {

  /* ------------------------------------------------------------------------
     1. SCROLL REVEAL ENGINE (IntersectionObserver)
     ------------------------------------------------------------------------ */
  const scrollElements = document.querySelectorAll('[data-scroll]');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const delay = entry.target.getAttribute('data-scroll-delay');
            if (delay) {
              setTimeout(() => {
                entry.target.classList.add('revealed');
              }, parseInt(delay, 10));
            } else {
              entry.target.classList.add('revealed');
            }
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    scrollElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver not supported
    scrollElements.forEach(el => el.classList.add('revealed'));
  }

  /* ------------------------------------------------------------------------
     2. NAVBAR SCROLL EFFECT & ACTIVE SECTION TRACKING
     ------------------------------------------------------------------------ */
  const navbarWrapper = document.querySelector('.linar-navbar-wrapper');
  const navLinks = document.querySelectorAll('.linar-nav-link');
  const sections = document.querySelectorAll('section[id]');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  window.addEventListener('scroll', function () {
    const scrollY = window.scrollY;

    // Navbar background blur/darken
    if (navbarWrapper) {
      if (scrollY > 50) {
        navbarWrapper.classList.add('scrolled');
      } else {
        navbarWrapper.classList.remove('scrolled');
      }
    }

    // Scroll-to-top button visibility
    if (scrollTopBtn) {
      if (scrollY > 350) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }

    // Active Section Tracking
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href && (href === `#${currentSectionId}` || href === `/#${currentSectionId}`)) {
        link.classList.add('active');
      }
    });

    // Parallax depth layering on decorative shapes
    const coralBlob = document.querySelector('.hero-organic-coral-shape');
    if (coralBlob && scrollY < window.innerHeight) {
      coralBlob.style.transform = `translateY(${scrollY * 0.15}px)`;
    }

    const diffGlow = document.querySelector('.diff-luminous-glow');
    if (diffGlow) {
      const diffSection = document.getElementById('the-linar-difference');
      if (diffSection) {
        const offset = (scrollY - diffSection.offsetTop) * 0.1;
        diffGlow.style.transform = `translate(-50%, calc(-50% + ${offset}px))`;
      }
    }
  });

  /* ------------------------------------------------------------------------
     3. SMOOTH SCROLLING FOR INTERNAL ANCHORS
     ------------------------------------------------------------------------ */
  document.querySelectorAll('a[href^="#"], a[href^="/#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const rawHref = this.getAttribute('href');
      const targetId = rawHref.replace('/#', '#');

      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - 90;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Close mobile menu if open
          const mobileMenu = document.getElementById('mobileMenu');
          if (mobileMenu && mobileMenu.classList.contains('show')) {
            const bsCollapse = bootstrap.Collapse.getInstance(mobileMenu);
            if (bsCollapse) bsCollapse.hide();
          }
        }
      }
    });
  });

  /* ------------------------------------------------------------------------
     4. SCROLL TO TOP ACTION
     ------------------------------------------------------------------------ */
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ------------------------------------------------------------------------
     5. HERO ENTRANCE CINEMATIC ANIMATION
     ------------------------------------------------------------------------ */
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroCta = document.querySelector('.hero-cta-group');
  const heroVisual = document.querySelector('.hero-visual-frame');

  if (heroTitle) {
    heroTitle.style.opacity = '0';
    heroTitle.style.transform = 'translateY(25px)';
    heroTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

    setTimeout(() => {
      heroTitle.style.opacity = '1';
      heroTitle.style.transform = 'translateY(0)';
    }, 150);
  }

  if (heroSubtitle) {
    heroSubtitle.style.opacity = '0';
    heroSubtitle.style.transform = 'translateY(20px)';
    heroSubtitle.style.transition = 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s';

    setTimeout(() => {
      heroSubtitle.style.opacity = '1';
      heroSubtitle.style.transform = 'translateY(0)';
    }, 200);
  }

  if (heroCta) {
    heroCta.style.opacity = '0';
    heroCta.style.transform = 'translateY(20px)';
    heroCta.style.transition = 'opacity 0.8s ease 0.35s, transform 0.8s ease 0.35s';

    setTimeout(() => {
      heroCta.style.opacity = '1';
      heroCta.style.transform = 'translateY(0)';
    }, 250);
  }

  if (heroVisual) {
    heroVisual.style.opacity = '0';
    heroVisual.style.transform = 'scale(0.92)';
    heroVisual.style.transition = 'opacity 1s ease 0.3s, transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s';

    setTimeout(() => {
      heroVisual.style.opacity = '1';
      heroVisual.style.transform = 'scale(1)';
    }, 300);
  }

});
