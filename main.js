(() => {
  const root = document.documentElement;
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById('y').textContent = new Date().getFullYear();

  // The journey: vertical scroll moves the photo track sideways.
  const journey = document.querySelector('.journey');
  const track = journey.querySelector('.track');
  const bar = journey.querySelector('.progress i');
  if (calm) {
    journey.classList.add('static');
  } else {
    let dist = 0;
    const measure = () => {
      dist = Math.max(0, track.scrollWidth - innerWidth);
      journey.style.height = `calc(100svh + ${dist}px)`;
      move();
    };
    const move = () => {
      const p = dist ? Math.min(1, Math.max(0, -journey.getBoundingClientRect().top / dist)) : 0;
      track.style.transform = `translate3d(${-p * dist}px,0,0)`;
      bar.style.transform = `scaleX(${p})`;
    };
    let queued = false;
    addEventListener('scroll', () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => { queued = false; move(); });
    }, { passive: true });
    addEventListener('resize', measure);
    addEventListener('load', measure);
    track.querySelectorAll('img').forEach((img) => img.addEventListener('load', measure));
    measure();
  }

  if (calm || !('IntersectionObserver' in window)) return;
  root.classList.add('js');

  // Fade things up as they enter, and count the numbers up once.
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    e.target.querySelectorAll('[data-count]').forEach(count);
    io.unobserve(e.target);
  }), { rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  function count(el) {
    const to = +el.dataset.count;
    const t0 = performance.now();
    const step = (t) => {
      const k = Math.min(1, (t - t0) / 1400);
      el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  // Hero: the portrait and the name drift apart with the pointer.
  const hero = document.querySelector('.hero');
  const portrait = hero.querySelector('.portrait');
  const words = hero.querySelectorAll('.word');
  if (matchMedia('(pointer: fine)').matches) {
    hero.addEventListener('pointermove', (e) => {
      const x = e.clientX / innerWidth - 0.5;
      const y = e.clientY / innerHeight - 0.5;
      portrait.style.transform = `translate3d(${x * 26}px,${y * 20}px,0)`;
      words.forEach((w) => { w.style.transform = `translate3d(${x * -18}px,${y * -10}px,0)`; });
    });
  }
})();
