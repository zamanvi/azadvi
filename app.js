/* ============================================
   A. K. AZAD, CPA, PLLC — APP JAVASCRIPT
   ============================================ */

/* ---- Navbar scroll effect ---- */
const navbar   = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
    backToTop.classList.add('visible');
  } else {
    navbar.classList.remove('scrolled');
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ---- Hamburger menu ---- */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  const isOpen = navLinks.classList.contains('open');
  document.body.style.overflow = isOpen ? 'hidden' : '';
  hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ---- Active nav link on scroll ---- */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });
  navItems.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) {
      a.classList.add('active');
    }
  });
});

/* ---- Scroll reveal ---- */
const revealEls = document.querySelectorAll(
  '.service-card, .why-card, .review-card, .process-step, .about-card-main, .about-text, .trust-item, .industry-pill'
);

revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, parseInt(delay));
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach(el => revealObserver.observe(el));

/* ---- Hero particle animation ---- */
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const count = 22;
  for (let i = 0; i < count; i++) {
    const p    = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 5 + 2;
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      animation-duration: ${Math.random() * 18 + 12}s;
      animation-delay: ${Math.random() * 10}s;
      opacity: ${Math.random() * 0.5 + 0.1};
    `;
    container.appendChild(p);
  }
}
createParticles();

/* ---- Contact form — sends to Formspree ----
   Sign up free at https://formspree.io, create a form,
   replace YOUR_FORM_ID below with your actual form ID.
   ---- */
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form    = e.target;
  const success = document.getElementById('formSuccess');
  const btn     = form.querySelector('button[type="submit"]');

  const name  = document.getElementById('fname').value.trim();
  const email = document.getElementById('femail').value.trim();
  if (!name || !email) return;

  btn.textContent = 'Sending...';
  btn.disabled    = true;

  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form),
    });

    if (res.ok) {
      form.reset();
      success.classList.add('show');
      // Stays visible until user interacts again
    } else {
      alert('Something went wrong. Please call us at (917) 561-0271.');
    }
  } catch {
    alert('Network error. Please call us at (917) 561-0271.');
  } finally {
    btn.textContent = 'Send Message 📨';
    btn.disabled    = false;
  }
});

/* ---- Smooth anchor scrolling ---- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ---- Stats counter animation ---- */
function animateCounter(el, target, suffix = '') {
  let current      = 0;
  const increment  = target / 60;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = (Number.isInteger(target)
      ? Math.floor(current)
      : current.toFixed(1)) + suffix;
  }, 20);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statEls = entry.target.querySelectorAll('.stat');
      statEls.forEach(stat => {
        const numEl = stat.querySelector('.stat-num');
        if (!numEl) return;
        const text = numEl.textContent.trim();
        if (text.startsWith('4.9')) {
          animateCounter(numEl, 4.9, '');
          setTimeout(() => {
            numEl.innerHTML = numEl.textContent + '<span class="stat-star">★</span>';
          }, 1250);
        } else if (text.startsWith('36')) {
          animateCounter(numEl, 36, '+');
        } else if (text.startsWith('7')) {
          animateCounter(numEl, 7, '');
        } else if (text.startsWith('10')) {
          animateCounter(numEl, 10, '+');
        }
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

/* ---- Credentials banner under topbar ---- */
function addCredentialsBanner() {
  const trust = document.querySelector('.trust-bar');
  if (!trust) return;

  const banner = document.createElement('div');
  banner.style.cssText = `
    background: linear-gradient(90deg, #c9a84c, #e6c86e, #c9a84c);
    background-size: 200% auto;
    animation: shimmer 3s linear infinite;
    color: #0a1628;
    text-align: center;
    padding: 8px 24px;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.5px;
  `;
  banner.innerHTML = `
    ⚖️ &nbsp; Abul Kalam Azad, CPA · IRS Authorized e-File Provider &nbsp;·&nbsp; Serving the Bronx & NYC Since Day One &nbsp; ⚖️
  `;

  const style = document.createElement('style');
  style.textContent = `
    @keyframes shimmer {
      0%   { background-position: 200% center; }
      100% { background-position: -200% center; }
    }
  `;
  document.head.appendChild(style);
  trust.before(banner);
}
addCredentialsBanner();

console.log('✅ A. K. Azad CPA website loaded successfully.');
