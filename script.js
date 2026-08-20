const orb = document.querySelector('.cursor-orb');
if (orb) window.addEventListener('pointermove', e => { orb.style.left = e.clientX + 'px'; orb.style.top = e.clientY + 'px'; });

const notes = document.querySelectorAll('.floating-note');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  notes.forEach((note, i) => {
    note.style.transform = `translateY(${Math.sin((y + i * 120) / 220) * 14}px) rotate(${i === 2 ? -8 : 0}deg)`;
  });
});

const services = document.querySelectorAll('.service');
services.forEach(service => {
  service.addEventListener('mouseenter', () => document.body.style.background = '#e9e4d9');
  service.addEventListener('mouseleave', () => document.body.style.background = '');
});
