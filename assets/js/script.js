/* ========================
   VALIDAÇÃO DO FORMULÁRIO
======================== */
const form = document.querySelector('.contato-form');

if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const assunto = document.getElementById('assunto').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    document.querySelectorAll('.erro').forEach(el => el.remove());

    let valido = true;

    if (nome === '') {
      mostrarErro('nome', 'Por favor, informe seu nome.');
      valido = false;
    }

    if (email === '' || !email.includes('@')) {
      mostrarErro('email', 'Informe um e-mail válido.');
      valido = false;
    }

    if (assunto === '') {
      mostrarErro('assunto', 'Informe o assunto.');
      valido = false;
    }

    if (mensagem === '') {
      mostrarErro('mensagem', 'Escreva sua mensagem.');
      valido = false;
    }

    if (valido) mostrarSucesso();
  });
}

function mostrarErro(campoId, mensagem) {
  const campo = document.getElementById(campoId);
  const erro = document.createElement('span');
  erro.className = 'erro';
  erro.textContent = mensagem;
  erro.style.color = '#f87171';
  erro.style.fontSize = '0.8rem';
  campo.parentNode.insertBefore(erro, campo.nextSibling);
}

function mostrarSucesso() {
  const form = document.querySelector('.contato-form');
  form.innerHTML = `
    <div style="text-align:center; padding: 2rem;">
      <h3 style="color: var(--accent-light); margin-bottom: 1rem;">Mensagem enviada! ✓</h3>
      <p style="color: var(--text-secondary);">Entrarei em contato em breve.</p>
    </div>
  `;
}

/* ========================
   ANIMAÇÃO HERO
======================== */
const textos = [
  'Software Engineer',
  'Backend Developer',
  'Data Analyst',
  'Java Developer'
];

let textoIndex = 0;
let charIndex = 0;
let deletando = false;
const elementoCargo = document.querySelector('.cargo');

function digitar() {
  if (!elementoCargo) return;

  const textoAtual = textos[textoIndex];

  if (!deletando) {
    elementoCargo.innerHTML = textoAtual.substring(0, charIndex + 1) + '<span class="cursor">|</span>';
    charIndex++;

    if (charIndex === textoAtual.length) {
      deletando = true;
      setTimeout(digitar, 1500);
      return;
    }
  } else {
    elementoCargo.innerHTML = textoAtual.substring(0, charIndex - 1) + '<span class="cursor">|</span>';
    charIndex--;

    if (charIndex === 0) {
      deletando = false;
      textoIndex = (textoIndex + 1) % textos.length;
    }
  }

  setTimeout(digitar, deletando ? 60 : 100);
}

digitar();

/* ========================
   PARTÍCULAS
======================== */
const canvas = document.getElementById('particulas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particulas = [];
  const total = 60;

  for (let i = 0; i < total; i++) {
    particulas.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      alpha: Math.random() * 0.5 + 0.1
    });
  }

  function desenharParticulas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particulas.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(124, 58, 237, ${p.alpha})`;
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });
    requestAnimationFrame(desenharParticulas);
  }

  desenharParticulas();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}
/* ========================
   HEADER SCROLL
======================== */
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.style.padding = '0.5rem 2rem';
    header.style.boxShadow = '0 4px 30px rgba(124, 58, 237, 0.15)';
  } else {
    header.style.padding = '0.75rem 2rem';
    header.style.boxShadow = 'none';
  }
});
/* ========================
   DARK / LIGHT MODE
======================== */
const themeToggle = document.getElementById('themeToggle');

if (themeToggle) {
  const salvo = localStorage.getItem('tema');
  if (salvo === 'light') {
    document.body.classList.add('light');
    themeToggle.textContent = '☀️';
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const isLight = document.body.classList.contains('light');
    themeToggle.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('tema', isLight ? 'light' : 'dark');
  });
}