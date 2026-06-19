(function () {
  'use strict';

  // ── Mobile nav toggle ──────────────────────────────────────────────
  const navToggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      mobileMenu.classList.toggle('open');
      animateHamburger(navToggle, !expanded);
    });

    // Close menu when a link is tapped
    mobileMenu.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('open');
        animateHamburger(navToggle, false);
      });
    });
  }

  function animateHamburger(btn, isOpen) {
    const bars = btn.querySelectorAll('.hamburger-bar');
    if (isOpen) {
      bars[0].style.transform = 'translateY(7px) rotate(45deg)';
      bars[1].style.opacity = '0';
      bars[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      bars[0].style.transform = '';
      bars[1].style.opacity = '';
      bars[2].style.transform = '';
    }
  }

  // ── Active nav link on scroll ──────────────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveLink() {
    let current = '';
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
      if (scrollY >= section.offsetTop) {
        current = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href && href === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  // ── Skill bar animation on scroll ─────────────────────────────────
  const skillFills = document.querySelectorAll('.skill-fill');
  const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.style.getPropertyValue('--fill') || '0%';
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  skillFills.forEach(fill => {
    const targetWidth = fill.style.getPropertyValue('--fill');
    fill.style.setProperty('--fill', targetWidth);
    fill.style.width = '0%';
    skillObserver.observe(fill);
  });

  // ── Reveal sections on scroll ──────────────────────────────────────
  const revealTargets = document.querySelectorAll(
    '.service-card, .project-card, .timeline-item, .stat-item'
  );

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = (i % 6) * 0.07 + 's';
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealTargets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    revealObserver.observe(el);
  });

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.revealed, .service-card, .project-card, .timeline-item, .stat-item').forEach(el => {
      el.style.opacity = '';
      el.style.transform = '';
    });
  });

  // Add revealed class styles via JS (avoids FOUC)
  const style = document.createElement('style');
  style.textContent = '.revealed { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);

  // ── Contact form ───────────────────────────────────────────────────
 const form = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');

if (form && successMsg) {
  form.addEventListener('submit', () => {
    successMsg.classList.add('visible');
  });
}

  // ── Header shadow on scroll ────────────────────────────────────────
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 10
      ? '0 4px 24px rgba(0,0,0,0.08)'
      : 'none';
  }, { passive: true });

})();
