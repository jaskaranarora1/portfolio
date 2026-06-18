// ── NAVBAR ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});
// ── THEME TOGGLE ──
const themeBtn = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  document.body.classList.add('light');
  themeBtn.textContent = '☀️';
}
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  themeBtn.textContent = isLight ? '☀️' : '🌙';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  // update open menu background if visible
  const links = document.querySelector('.nav-links');
  if (menuOpen) {
    links.style.background = isLight ? 'rgba(240,244,255,0.98)' : 'rgba(10,15,30,0.98)';
    links.style.borderBottom = isLight ? '1px solid rgba(0,0,0,0.1)' : '1px solid var(--border)';
  }
});// ── TYPING EFFECT ──
const phrases = [
  'IT Security Enthusiast',
  'Full-Stack Developer',
  'Network Technician',
  'M.Sc. @ TU Ilmenau',
  'Berlin Based 🇩🇪'
];
let phraseIndex = 0, charIndex = 0, isDeleting = false;
const typedEl = document.getElementById('typed-text');
function type() {
  const current = phrases[phraseIndex];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex--);
    if (charIndex < 0) { isDeleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; setTimeout(type, 400); return; }
    setTimeout(type, 45);
  } else {
    typedEl.textContent = current.substring(0, charIndex++);
    if (charIndex > current.length) { isDeleting = true; setTimeout(type, 1800); return; }
    setTimeout(type, 75);
  }
}
type();

// ── INJECT STYLES ──
const style = document.createElement('style');
style.textContent = `
  .reveal { opacity: 0; transform: translateY(40px); transition: none; }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  .reveal-left { opacity: 0; transform: translateX(-50px); transition: none; }
  .reveal-left.visible { opacity: 1; transform: translateX(0); }
  .reveal-right { opacity: 0; transform: translateX(50px); transition: none; }
  .reveal-right.visible { opacity: 1; transform: translateX(0); }
  .reveal-zoom { opacity: 0; transform: scale(0.82); transition: none; }
  .reveal-zoom.visible { opacity: 1; transform: scale(1); }
  .reveal-flip { opacity: 0; transform: rotateY(40deg) translateY(20px); transition: none; }
  .reveal-flip.visible { opacity: 1; transform: rotateY(0deg) translateY(0); }

  #particle-canvas { position:fixed; top:0; left:0; width:100%; height:100%; pointer-events:none; z-index:0; opacity:0.35; }

  .section-flash { position:absolute; inset:0; pointer-events:none; z-index:1;
    background: linear-gradient(135deg, rgba(0,212,255,0.04), rgba(108,61,232,0.04));
    opacity:0; transition: opacity 0.6s; }
  .section.in-view .section-flash { opacity:1; }

  .skill-tags span { transition: transform 0.2s, background 0.2s, box-shadow 0.2s; cursor:default; }
  .skill-tags span:hover { transform:translateY(-3px) scale(1.08); background:rgba(0,212,255,0.18); box-shadow:0 4px 12px rgba(0,212,255,0.2); }

  @keyframes dotPulse {
    0%   { box-shadow: 0 0 0 0 rgba(0,212,255,0.5); }
    70%  { box-shadow: 0 0 0 8px rgba(0,212,255,0); }
    100% { box-shadow: 0 0 0 0 rgba(0,212,255,0); }
  }
  .timeline-dot.active { animation: dotPulse 1.2s ease-out; }

  .cursor-glow { position:fixed; pointer-events:none; z-index:9999;
    width:300px; height:300px; border-radius:50%;
    background: radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%);
    transform: translate(-50%,-50%); transition: opacity 0.3s; }
`;
document.head.appendChild(style);

// ── PARTICLES ──
const canvas = document.createElement('canvas');
canvas.id = 'particle-canvas';
document.body.prepend(canvas);
const ctx = canvas.getContext('2d');
function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const particles = Array.from({ length: 60 }, () => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
  vx: (Math.random() - 0.5) * 0.4,
  vy: (Math.random() - 0.5) * 0.4,
  r: Math.random() * 1.5 + 0.5,
  alpha: Math.random() * 0.5 + 0.2
}));

let mouseX = -999, mouseY = -999;
window.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    const dx = p.x - mouseX, dy = p.y - mouseY;
    const dist = Math.sqrt(dx*dx + dy*dy);
    if (dist < 120) { p.vx += (dx/dist)*0.15; p.vy += (dy/dist)*0.15; }
    p.vx *= 0.98; p.vy *= 0.98;
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    ctx.fillStyle = `rgba(0,212,255,${p.alpha})`;
    ctx.fill();
  });
  for (let i = 0; i < particles.length; i++) {
    for (let j = i+1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const d = Math.sqrt(dx*dx + dy*dy);
      if (d < 100) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(0,212,255,${0.08*(1-d/100)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(drawParticles);
}
drawParticles();

// ── CURSOR GLOW ──
const cursorGlow = document.createElement('div');
cursorGlow.className = 'cursor-glow';
document.body.appendChild(cursorGlow);
window.addEventListener('mousemove', e => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top  = e.clientY + 'px';
});

// ── STORE ORIGINAL STAT VALUES IMMEDIATELY ──
// Must happen before any count-up runs, so values are always the real numbers
const statData = [];
document.querySelectorAll('.stat-num').forEach(el => {
  const raw = el.textContent.trim();
  const num = parseInt(raw.replace(/\D/g, ''));
  const suffix = raw.replace(/[0-9]/g, '');
  statData.push({ el, num, suffix });
  // show full value immediately so it never looks broken
  el.textContent = num + suffix;
});

// ── ASSIGN REVEAL CLASSES ──
document.querySelectorAll('.skill-card').forEach(el => { el.classList.remove('reveal'); el.classList.add('reveal-zoom'); });
document.querySelectorAll('.timeline-card').forEach((el, i) => { el.classList.remove('reveal'); el.classList.add(i % 2 === 0 ? 'reveal-left' : 'reveal-right'); });
document.querySelectorAll('.edu-card').forEach(el => { el.classList.remove('reveal'); el.classList.add('reveal-flip'); });
document.querySelectorAll('.project-card').forEach(el => { el.classList.remove('reveal'); el.classList.add('reveal-zoom'); });
document.querySelectorAll('.contact-card').forEach((el, i) => { el.classList.remove('reveal'); el.classList.add(i % 2 === 0 ? 'reveal-left' : 'reveal-right'); });

// ── SCROLL REVEAL — replays every scroll ──
const allRevealClasses = ['.reveal', '.reveal-left', '.reveal-right', '.reveal-zoom', '.reveal-flip'];
const allRevealEls = document.querySelectorAll(allRevealClasses.join(','));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const el = entry.target;
    if (entry.isIntersecting) {
      const siblings = [...el.parentElement.children].filter(c =>
        allRevealClasses.some(cls => c.classList.contains(cls.slice(1)))
      );
      const idx = siblings.indexOf(el);
      setTimeout(() => {
        el.style.transition = 'opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)';
        el.classList.add('visible');
        // pulse timeline dot
        const dot = el.closest('.timeline-item')?.querySelector('.timeline-dot');
        if (dot) { dot.classList.add('active'); setTimeout(() => dot.classList.remove('active'), 1200); }
      }, idx * 90);
    } else {
      el.style.transition = 'none';
      el.classList.remove('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

allRevealEls.forEach(el => observer.observe(el));

// ── SECTION FLASH ──
document.querySelectorAll('.section').forEach(sec => {
  const flash = document.createElement('div');
  flash.className = 'section-flash';
  sec.style.position = 'relative';
  sec.appendChild(flash);
  const secObs = new IntersectionObserver(([entry]) => {
    sec.classList.toggle('in-view', entry.isIntersecting);
  }, { threshold: 0.2 });
  secObs.observe(sec);
});

// ── COUNT-UP — uses stored values, replays cleanly every scroll ──
function runCountUp() {
  statData.forEach(({ el, num, suffix }) => {
    let start = null;
    const duration = 300;
    // cancel any running animation on this element
    el._rafId && cancelAnimationFrame(el._rafId);
    const step = timestamp => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = progress;
      el.textContent = Math.floor(eased * num) + suffix;
      if (progress < 1) {
        el._rafId = requestAnimationFrame(step);
      } else {
        el.textContent = num + suffix; // ensure exact final value
      }
    };
    el._rafId = requestAnimationFrame(step);
  });
}

let countCooldown = false;
const statsEl = document.querySelector('.about-stats');
if (statsEl) {
  const statsObs = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !countCooldown) {
      countCooldown = true;
      runCountUp();
      setTimeout(() => { countCooldown = false; }, 1000);
    }
    // reset to 0 when scrolled away so count-up feels fresh next time
    if (!entry.isIntersecting) {
      statData.forEach(({ el, suffix }) => { el.textContent = '0' + suffix; });
      countCooldown = false;
    }
  }, { threshold: 0.05 });
  statsObs.observe(statsEl);
}

// ── ACTIVE NAV ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const navObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${entry.target.id}` ? 'var(--cyan)' : '';
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => navObs.observe(s));

// ── HAMBURGER ──
const hamburger = document.getElementById('hamburger');
let menuOpen = false;
hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  const links = document.querySelector('.nav-links');
  const isLight = document.body.classList.contains('light');
links.style.cssText = menuOpen
  ? `display:flex;flex-direction:column;gap:1rem;position:absolute;top:60px;left:0;right:0;background:${isLight ? 'rgba(240,244,255,0.98)' : 'rgba(10,15,30,0.98)'};padding:1.5rem 2rem;border-bottom:1px solid ${isLight ? 'rgba(0,0,0,0.1)' : 'var(--border)'};z-index:99;`
  : '';
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => { menuOpen = false; document.querySelector('.nav-links').style.cssText = ''; });
});

// ── CARD TILT ──
document.querySelectorAll('.project-card, .contact-card, .skill-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 8;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -8;
    card.style.transform = `translateY(-4px) rotateX(${y}deg) rotateY(${x}deg)`;
    card.style.transition = 'transform 0.1s';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s cubic-bezier(0.22,1,0.36,1)';
  });
});

// ── REDUCED MOTION ──
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  allRevealEls.forEach(el => { el.style.transition = 'none'; el.classList.add('visible'); });
  statData.forEach(({ el, num, suffix }) => { el.textContent = num + suffix; });
}