/* ============================================
   A. K. AZAD, CPA, PLLC — APP JAVASCRIPT
   Pure static, no backend required
   ============================================ */

/* ---- Navbar scroll effect ---- */
const navbar = document.getElementById('navbar');
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
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ---- Active nav link on scroll ---- */
const sections  = document.querySelectorAll('section[id]');
const navItems  = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });
  navItems.forEach(a => {
    a.style.color = '';
    a.style.fontWeight = '';
    if (a.getAttribute('href') === '#' + current) {
      a.style.color = '#0a1628';
      a.style.fontWeight = '700';
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
    entries.forEach((entry, i) => {
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

  const count = 22;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
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

/* ---- Contact form handler (static, no backend) ---- */
function handleSubmit(e) {
  e.preventDefault();
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  const btn     = form.querySelector('button[type="submit"]');

  // Basic validation
  const name  = document.getElementById('fname').value.trim();
  const email = document.getElementById('femail').value.trim();
  if (!name || !email) return;

  // Simulate submission (no backend)
  btn.textContent = 'Sending...';
  btn.disabled    = true;

  setTimeout(() => {
    form.reset();
    btn.textContent = 'Send Message 📨';
    btn.disabled    = false;
    success.classList.add('show');
    setTimeout(() => success.classList.remove('show'), 5000);
  }, 1200);
}

/* ---- Industries section (dynamic injection) ---- */
const industries = [
  { icon: '🏗️', label: 'Construction' },
  { icon: '🛍️', label: 'Retail' },
  { icon: '👗', label: 'Fashion' },
  { icon: '🚛', label: 'Transportation' },
  { icon: '⚡', label: 'Energy' },
  { icon: '🏥', label: 'Healthcare' },
  { icon: '🍽️', label: 'Restaurants' },
  { icon: '💻', label: 'Technology' },
  { icon: '🏠', label: 'Real Estate' },
  { icon: '📚', label: 'Education' },
  { icon: '👤', label: 'Individuals' },
  { icon: '🏢', label: 'Small Business' },
];

function buildIndustriesSection() {
  // Insert before reviews section
  const reviewsSec = document.getElementById('reviews');
  if (!reviewsSec) return;

  const sec = document.createElement('section');
  sec.className = 'industries';
  sec.innerHTML = `
    <div class="container">
      <div class="section-header">
        <span class="section-tag">Industries We Serve</span>
        <h2 class="section-title">Expertise Across Every Industry</h2>
        <p class="section-sub">From construction to retail, we bring specialized tax knowledge to clients across all major industries in the Bronx and NYC.</p>
      </div>
      <div class="industries-grid">
        ${industries.map(ind => `
          <div class="industry-pill">
            <span class="pill-icon">${ind.icon}</span>
            ${ind.label}
          </div>
        `).join('')}
      </div>
    </div>
  `;
  reviewsSec.before(sec);
}
buildIndustriesSection();

/* ---- Credentials / About section enrichment ---- */
function enrichAboutSection() {
  const badges = document.querySelector('.about-badges');
  if (!badges) return;

  // Add CISA credential
  const cisaBadge = document.createElement('span');
  cisaBadge.className = 'badge';
  cisaBadge.textContent = '✓ CISA Certified';
  badges.appendChild(cisaBadge);

  const irsBadge = document.createElement('span');
  irsBadge.className = 'badge';
  irsBadge.textContent = '✓ IRS Authorized e-File';
  badges.appendChild(irsBadge);
}
enrichAboutSection();

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
  let current = 0;
  const increment = target / 60;
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
      const statNums = entry.target.querySelectorAll('.stat-num');
      statNums.forEach(el => {
        const text = el.textContent.trim();
        if (text.includes('4.9')) {
          el.innerHTML = '4.9<span class="stat-star">★</span>';
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
    ⚖️ &nbsp; Abul Kalam Azad, CPA · CISA · IRS Authorized e-File Provider &nbsp;·&nbsp; Serving the Bronx & NYC Since Day One &nbsp; ⚖️
  `;

  const style = document.createElement('style');
  style.textContent = `
    @keyframes shimmer {
      0% { background-position: 200% center; }
      100% { background-position: -200% center; }
    }
  `;
  document.head.appendChild(style);
  trust.before(banner);
}
addCredentialsBanner();

console.log('✅ A. K. Azad CPA website loaded successfully.');
