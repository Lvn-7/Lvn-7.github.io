const menuButton = document.querySelector('.menu-button');
const navMenu = document.querySelector('.nav-menu');
const navLinks = Array.from(document.querySelectorAll('.nav-link'));

if (menuButton && navMenu) {
  menuButton.addEventListener('click', () => {
    const opening = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(opening));
    menuButton.setAttribute('aria-label', opening ? '关闭菜单' : '打开菜单');
    navMenu.classList.toggle('open', opening);
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', '打开菜单');
      navMenu.classList.remove('open');
    });
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px' }
);

document.querySelectorAll('.reveal').forEach((element) => {
  if (element.getBoundingClientRect().top > window.innerHeight * 0.88) {
    element.classList.add('reveal-pending');
  }
  revealObserver.observe(element);
});

const sections = document.querySelectorAll('.observed-section[data-nav]');
const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;
    const current = visible.target.getAttribute('data-nav');
    navLinks.forEach((link) => {
      const active = link.getAttribute('href') === '#' + current;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  },
  { threshold: [0.15, 0.35, 0.6], rootMargin: '-15% 0px -55%' }
);

sections.forEach((section) => sectionObserver.observe(section));

const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());
