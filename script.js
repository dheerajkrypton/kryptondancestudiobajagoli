// Side menu controls
const menuBtn = document.getElementById('menuBtn');
const closeBtn = document.getElementById('closeMenu');
const sideMenu = document.getElementById('sideMenu');

function openMenu() {
  if (!sideMenu) return;
  sideMenu.classList.add('open');
  sideMenu.setAttribute('aria-hidden', 'false');
}
function closeMenu() {
  if (!sideMenu) return;
  sideMenu.classList.remove('open');
  sideMenu.setAttribute('aria-hidden', 'true');
}

menuBtn && menuBtn.addEventListener('click', openMenu);
closeBtn && closeBtn.addEventListener('click', closeMenu);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

// Universal slider logic: each slider-container independent
document.querySelectorAll('.slider-container').forEach(container => {
  const slides = Array.from(container.querySelectorAll('.slide'));
  const prevBtn = container.querySelector('.left-arrow');
  const nextBtn = container.querySelector('.right-arrow');
  let currentIndex = 0;

  // find initial active if any
  const initial = slides.findIndex(s => s.classList.contains('active'));
  currentIndex = initial >= 0 ? initial : 0;

  function showSlide(index) {
    slides.forEach((s, i) => {
      // pause videos in non-active slides
      const vid = s.querySelector('video');
      if (vid) vid.pause();
      s.classList.toggle('active', i === index);
    });
  }

  function nextSlide () {
    if (slides.length <= 1) return;
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  function prevSlide () {
    if (slides.length <= 1) return;
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  }

  // hide arrows if only one slide
  if (slides.length <= 1) {
    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
  } else {
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  }

  // simple touch swipe for mobile
  let startX = null;
  container.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches.length === 1) startX = e.touches[0].clientX;
  }, {passive:true});

  container.addEventListener('touchend', (e) => {
    if (startX === null) return;
    const endX = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0].clientX : null;
    if (endX === null) { startX = null; return; }
    const diff = startX - endX;
    if (Math.abs(diff) > 40) { // threshold
      if (diff > 0) nextSlide(); else prevSlide();
    }
    startX = null;
  }, {passive:true});

  // initial render
  showSlide(currentIndex);
});

/* ===== AUTO BACKGROUND CHANGER ===== */

const bgImages = [
  "images/bg/bg1.jpg",
  "images/bg/bg2.jpg",
  "images/bg/bg3.jpg",
  "images/bg/bg4.jpg",
  "images/bg/bg5.jpg"
];

let bgIndex = 0;

function changeBackground() {
  document.body.style.backgroundImage = `url('${bgImages[bgIndex]}')`;
  bgIndex = (bgIndex + 1) % bgImages.length;
}

// initial load
changeBackground();

// change every 8 seconds
setInterval(changeBackground, 5000);
/* =========================
   AUTO AI BACKGROUND SLIDESHOW
========================= */

const aiBgImages = [
  "images/bg/bg1.jpg",
  "images/bg/bg2.jpg",
  "images/bg/bg3.jpg",
  "images/bg/bg4.jpg",
  "images/bg/bg5.jpg"
];

let aiIndex = 0;
const bgElem = document.querySelector(".dynamic-bg");

function rotateBackground() {
  bgElem.style.backgroundImage = `url('${aiBgImages[aiIndex]}')`;
  aiIndex = (aiIndex + 1) % aiBgImages.length;
}

// initial
rotateBackground();

// rotate every 8 seconds
setInterval(rotateBackground, 5000);

<script>
const track = document.querySelector(".reviews-track");
let index = 0;

setInterval(() => {
  index++;
  if (index > 0) index = 0; // only one iframe
  track.style.transform = `translateX(-${index * 100}%)`;
}, 5000);
</script>



