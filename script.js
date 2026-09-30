/* ---------- Content data (edit here) ---------- */
const skills = [
  { title: 'Programming', icon: 'bi-code-slash', items: [['C', 70, 'Intermediate'], ['Java', 70, 'Intermediate'], ['Python', 75, 'Intermediate']] },
  { title: 'Web Development', icon: 'bi-globe2', items: [['HTML', 80, 'Advanced'], ['CSS', 70, 'Intermediate'], ['JavaScript', 60, 'Intermediate'], ['Bootstrap', 70, 'Intermediate'], ['Django', 60, 'Intermediate']] },
  { title: 'Database', icon: 'bi-database', items: [['MySQL', 70, 'Intermediate']] },
  { title: 'Other', icon: 'bi-stars', items: [['Data Structures and Algorithms', 65, 'Intermediate'], ['Database Management', 70, 'Intermediate'], ['Data Science', 45, 'Learning'], ['Artificial Intelligence / Machine Learning', 45, 'Learning']] }
];

const projects = [
  { title: 'Self-Balancing Robot', icon: 'bi-robot', link: '#', desc: 'A robotic system designed to maintain its balance using sensors, control logic and motors.', tech: ['Arduino', 'IMU Sensor', 'PID Control', 'Motors', 'C/C++'] },
  { title: 'Object Detection Machine', icon: 'bi-camera-video', link: '#', desc: 'A project focused on detecting and identifying objects using computer vision techniques.', tech: ['Python', 'Computer Vision', 'OpenCV', 'NumPy'] },
  { title: 'Database Management System', icon: 'bi-hdd-stack', link: '#', desc: 'A database-based system for managing and maintaining structured records efficiently.', tech: ['MySQL', 'SQL', 'DBMS Concepts'] },
  { title: 'Course Management Website', icon: 'bi-journal-bookmark', link: '#', desc: 'A Django-based course management system containing programs, courses, modules, materials, batches, sessions, assessments, certificates and reports.', tech: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Django', 'MySQL'] }
];

const certs = [
  { name: 'Programming in Java', org: 'NPTEL', link: '#' },
  { name: 'Programming in C', org: 'NPTEL', link: '#' },
  { name: 'Soft Skills', org: 'Coursera', link: '#' },
  { name: 'Soft Skills', org: 'TCS iON', link: '#' }
];

const learning = [
  ['Programming', 'bi-terminal'], ['Web Development', 'bi-window-stack'], ['Database Management', 'bi-database'],
  ['Data Structures and Algorithms', 'bi-diagram-3'], ['Artificial Intelligence and Machine Learning', 'bi-cpu'],
  ['Data Science', 'bi-bar-chart-line'], ['Computer Networks', 'bi-hdd-network']
];

/* ---------- Render sections ---------- */
const $ = (s) => document.querySelector(s);
const tags = (arr) => arr.map((t) => `<span class="tag">${t}</span>`).join('');

$('#skillsGrid').innerHTML = skills.map((g) => `
  <div class="col-md-6"><div class="skill-card">
    <h3><i class="bi ${g.icon}"></i>${g.title}</h3>
    ${g.items.map(([n, v, l]) => `
      <div class="skill-row">
        <div class="skill-meta"><span>${n}</span><small>${l}</small></div>
        <div class="progress" role="progressbar" aria-label="${n} proficiency" aria-valuenow="${v}" aria-valuemin="0" aria-valuemax="100"><div class="progress-bar" data-level="${v}"></div></div>
      </div>`).join('')}
  </div></div>`).join('');

$('#projectsGrid').innerHTML = projects.map((p) => `
  <div class="col-md-6"><article class="project-card">
    <!-- Replace .img-ph with: <img src="images/project-name.jpg" alt="${p.title}" class="w-100"> -->
    <div class="img-ph" role="img" aria-label="${p.title} image placeholder"><i class="bi ${p.icon}"></i></div>
    <div class="card-body-x">
      <h3>${p.title}</h3><p>${p.desc}</p>
      <div class="tags">${tags(p.tech)}</div>
      <a href="${p.link}" class="btn btn-accent align-self-start">View Project</a>
    </div></article></div>`).join('');

$('#certsGrid').innerHTML = certs.map((c) => `
  <div class="col-sm-6 col-lg-3"><article class="cert-card">
    <!-- Replace .img-ph with: <img src="images/certificate.jpg" alt="${c.name} certificate" class="w-100"> -->
    <div class="img-ph cert" role="img" aria-label="Certificate image placeholder"><i class="bi bi-award"></i><small>Certificate image</small></div>
    <div class="card-body-x">
      <h3>${c.name}</h3><p class="org">${c.org}</p><p class="year">Year: 20XX</p>
      <a href="${c.link}" class="btn btn-outline-accent btn-sm align-self-start mt-auto">View Certificate</a>
    </div></article></div>`).join('');

$('#learnGrid').innerHTML = learning.map(([n, i]) => `
  <div class="col-sm-6 col-lg-4"><div class="learn-card"><i class="bi ${i}"></i><h3>${n}</h3></div></div>`).join('');

/* ---------- Typing animation ---------- */
const words = ['Computer Engineering Student', 'Programmer', 'Web Developer', 'Technology Enthusiast'];
const typed = $('#typed');
if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
  typed.textContent = words[0];
} else {
  let w = 0, c = 0, del = false;
  (function tick() {
    const word = words[w];
    typed.textContent = word.slice(0, c);
    if (!del && c === word.length) { del = true; return setTimeout(tick, 1400); }
    if (del && c === 0) { del = false; w = (w + 1) % words.length; }
    c += del ? -1 : 1;
    setTimeout(tick, del ? 40 : 80);
  })();
}

/* ---------- Skill bars animate when visible ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.style.width = e.target.dataset.level + '%'; io.unobserve(e.target); }
  });
}, { threshold: 0.4 });
document.querySelectorAll('.progress-bar').forEach((b) => io.observe(b));

/* ---------- Dark mode (saved in localStorage) ---------- */
const root = document.documentElement, toggle = $('#themeToggle');
function applyTheme(t) {
  root.setAttribute('data-bs-theme', t);
  toggle.innerHTML = t === 'dark' ? '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-stars-fill"></i>';
  toggle.setAttribute('aria-label', t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
}
let saved = 'light';
try { saved = localStorage.getItem('theme') || 'light'; } catch (e) {}
applyTheme(saved);
toggle.addEventListener('click', () => {
  const next = root.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try { localStorage.setItem('theme', next); } catch (e) {}
});

/* ---------- Close mobile menu after clicking a link ---------- */
document.querySelectorAll('#menu .nav-link').forEach((l) => l.addEventListener('click', () => {
  const m = document.getElementById('menu');
  if (m.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(m).hide();
}));

/* ---------- Back to top ---------- */
const toTop = $('#toTop');
addEventListener('scroll', () => toTop.classList.toggle('show', scrollY > 500), { passive: true });
toTop.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

/* ---------- Contact form: validates, then opens the visitor's email app ---------- */
$('#contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const f = e.target;
  if (!f.checkValidity()) { f.classList.add('was-validated'); return; }
  const body = `Name: ${$('#cName').value}\nEmail: ${$('#cEmail').value}\n\n${$('#cMessage').value}`;
  location.href = `mailto:prem.tarange59@gmail.com?subject=${encodeURIComponent($('#cSubject').value)}&body=${encodeURIComponent(body)}`;
  $('#formNote').textContent = 'Opening your email app with the message ready to send.';
  f.reset(); f.classList.remove('was-validated');
});
