/* ═══════════════════════════════════════
   JobX360 — Main JS  (js/main.js)
═══════════════════════════════════════ */

/* ── 1. NAV scroll + hamburger ── */
const header   = document.getElementById('header');
const hbg      = document.getElementById('hbg');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

function toggleNav() {
  hbg.classList.toggle('open');
  navLinks.classList.toggle('open');
}
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    hbg.classList.remove('open');
    navLinks.classList.remove('open');
  })
);

/* ── 2. Active nav link ── */
const sections  = document.querySelectorAll('section[id]');
const anchors   = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) cur = s.id; });
  anchors.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${cur}` ? 'var(--teal)' : '';
  });
}, { passive: true });

/* ── 3. Scroll animations ── */
const obs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('in'), (i % 4) * 100);
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.10 });
document.querySelectorAll('.aos').forEach(el => obs.observe(el));

/* ── 4. Save job ── */
function saveJob(btn) {
  btn.textContent = '♥';
  btn.style.borderColor = '#e07b2a';
  btn.style.color       = '#e07b2a';
  btn.style.background  = '#fff0e6';
  showToast('Saved to your job list! 🔖', 'orange');
}

/* ── 5. Apply job ── */
function applyJob(btn, title) {
  btn.textContent      = '✓ Applied!';
  btn.style.background = '#e0f7f6';
  btn.style.color      = '#135f5b';
  btn.disabled         = true;
  showToast(`Applied to "${title}" successfully!`, 'teal');
  setTimeout(() => {
    btn.textContent      = 'Apply Now';
    btn.style.background = '';
    btn.style.color      = '';
    btn.disabled         = false;
  }, 4000);
}

/* ── 6. Contact form ── */
function submitForm(e) {
  e.preventDefault();
  const fn  = document.getElementById('fn').value.trim();
  const ln  = document.getElementById('ln').value.trim();
  const em  = document.getElementById('em').value.trim();
  const ph  = document.getElementById('ph').value.trim();
  const ut  = document.getElementById('ut').value;
  const msg = document.getElementById('msg').value.trim();
  const btn = document.getElementById('submitBtn');

  if (!fn || !ln || !em || !msg) { showToast('Please fill all required fields.', 'orange'); return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) { showToast('Please enter a valid email.', 'orange'); return; }

  btn.textContent = 'Sending…';
  btn.disabled = true;

  emailjs.send(
    'service_p4av2kv',
    'template_lf98tdj',
    {
      from_name:  fn + ' ' + ln,
      from_email: em,
      phone:      ph || 'Not provided',
      user_type:  ut,
      message:    msg
    },
    '4RZF-gih5VZLr0bz5'
  ).then(() => {
    btn.textContent      = '✓ Message Sent!';
    btn.style.background = 'linear-gradient(135deg,#34d399,#059669)';
    showToast("Thank you! We'll respond within 2 business hours.", 'teal');
    setTimeout(() => {
      btn.textContent      = 'Send Message ✉️';
      btn.style.background = '';
      btn.disabled         = false;
      document.getElementById('cForm').reset();
    }, 4000);
  }).catch((error) => {
    btn.textContent = 'Send Message ✉️';
    btn.disabled    = false;
    showToast('Failed to send. Please try again.', 'orange');
    console.error('EmailJS error:', error);
  });
}

/* ── 7. Toast notifications ── */
function showToast(msg, type = 'teal') {
  const c = {
    teal:   { bg: '#e0f7f6', border: '#1a7f7a', color: '#135f5b' },
    orange: { bg: '#fff0e6', border: '#e07b2a', color: '#a85a1a' },
  }[type] || { bg: '#e0f7f6', border: '#1a7f7a', color: '#135f5b' };

  if (!document.getElementById('_tkf')) {
    const s = document.createElement('style'); s.id = '_tkf';
    s.textContent = '@keyframes tIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}} @keyframes tOut{from{opacity:1}to{opacity:0;transform:translateY(10px)}}';
    document.head.appendChild(s);
  }
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.style.cssText = `display:flex;position:fixed;bottom:32px;right:32px;z-index:9999;background:${c.bg};border:1.5px solid ${c.border};color:${c.color};padding:14px 22px;border-radius:12px;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:600;box-shadow:0 8px 30px rgba(0,0,0,.1);animation:tIn .3s ease both;max-width:380px`;
  clearTimeout(t._tid);
  t._tid = setTimeout(() => {
    t.style.animation = 'tOut .3s ease forwards';
    setTimeout(() => { t.style.display = 'none'; }, 320);
  }, 3500);
}
