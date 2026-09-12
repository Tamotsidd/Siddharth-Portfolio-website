(() => {
const galleryData = {
  weddings: {
    title: 'Wedding Stories',
    description: 'Celebrations, bridal portraits, family energy, and the small moments between ceremonies.',
    images: [
      { src: 'Wedding/1764598425293.jpg', title: 'Celebration' },
      { src: 'Wedding/1764598425334.jpg', title: 'Bridal Portrait' },
      { src: 'Wedding/1764598425363.jpg', title: 'The Bride' },
      { src: 'Wedding/20250226_170714.jpg', title: 'Golden Hour' },
      { src: 'Wedding/DSC_1762.jpg', title: 'Wedding Portrait' },
      { src: 'Wedding/DSC_1964.jpg', title: 'Bridal Details' },
      { src: 'Wedding/DSC_2054.jpg', title: 'Wedding Guests' },
      { src: 'Wedding/DSC_8751.jpg', title: 'Traditional Portrait' },
      { src: 'Wedding/f13331904.jpg', title: 'A Quiet Moment' },
      { src: 'Wedding/MIS08768.jpg', title: 'Reception Lights' },
      { src: 'Wedding/MIS08925.jpg', title: 'Ceremony Portrait' }
    ]
  },
  portraits: {
    title: 'Portraits',
    description: 'A collection of faces, performances, culture, and quiet character.',
    images: [
      { src: 'Portraits/1764858444195.jpg', title: 'Portrait 01' },
      { src: 'Portraits/1764858444645.jpg', title: 'Portrait 02' },
      { src: 'Portraits/1764858444747.jpg', title: 'Portrait 03' },
      { src: 'Portraits/DSC03434.jpg', title: 'Portrait 04' },
      { src: 'Portraits/DSC03520.jpg', title: 'Portrait 05' },
      { src: 'Portraits/DSC05372.jpg', title: 'Portrait 06' },
      { src: 'Portraits/DSC_0141.jpg', title: 'Portrait 07' },
      { src: 'Portraits/DSC_3688.jpg', title: 'Portrait 08' },
      { src: 'Portraits/DSC_8751.jpg', title: 'Portrait 09' },
      { src: 'Portraits/DSC_9260.jpg', title: 'Portrait 10' },
      { src: 'Portraits/DSC_9318.jpg', title: 'Portrait 11' },
      { src: 'Portraits/DSC_9551.jpg', title: 'Portrait 12' },
      { src: 'Portraits/f10462272.png', title: 'Portrait 13' },
      { src: 'Portraits/f10752224.jpg', title: 'Portrait 14' },
      { src: 'Portraits/f13314784.jpg', title: 'Portrait 15' },
      { src: 'Portraits/f13315008.jpg', title: 'Portrait 16' },
      { src: 'Portraits/f13315232.jpg', title: 'Portrait 17' },
      { src: 'Portraits/f13315520.jpg', title: 'Portrait 18' },
      { src: 'Portraits/f13316480.png', title: 'Portrait 19' },
      { src: 'Portraits/INFI7751.jpg', title: 'Portrait 20' },
      { src: 'Portraits/INFI7756.jpg', title: 'Portrait 21' },
      { src: 'Portraits/INFI7800.jpg', title: 'Portrait 22' },
      { src: 'Portraits/INFI7801.jpg', title: 'Portrait 23' }
    ]
  },
  streets: {
    title: 'Street Life',
    description: 'Everyday gestures, quiet places, and the human rhythm found beyond the main road.',
    images: [
      { src: 'Street/1742660300343.jpg', title: 'Artist at Work' },
      { src: 'Street/DSC03515.jpg', title: 'Cloud Country' },
      { src: 'Street/DSC03678-HDR.jpg', title: 'The Stone Marker' },
      { src: 'Street/DSC03693.jpg', title: 'A Quiet Afternoon' }
    ]
  },
  travel: {
    title: 'Travel & Culture',
    description: 'A visual record of Jatra: masks, movement, ritual, and the energy of the street.',
    images: [
      { src: 'Jatra/1753786902832.jpg', title: 'The Masked Performer' },
      { src: 'Jatra/DSC09408.jpg', title: 'Ritual in Motion' },
      { src: 'Jatra/DSC09410.jpg', title: 'Night Procession' },
      { src: 'Jatra/DSC09412.jpg', title: 'Mask and Movement' },
      { src: 'Jatra/DSC09413.jpg', title: 'Between the Drums' },
      { src: 'Jatra/Picsart_25-08-18_19-39-04-542.jpg', title: 'Jatra Crowd' },
      { src: 'Jatra/Picsart_25-08-19_07-59-48-812.png', title: 'Festival Memory' }
    ]
  }
};

const params = new URLSearchParams(window.location.search);
const category = params.get('cat') || 'weddings';
const gallery = galleryData[category] || galleryData.weddings;

const galleryTitle = document.getElementById('galleryTitle');
const galleryDescription = document.getElementById('galleryDescription');
const galleryGrid = document.getElementById('galleryGrid');

if (galleryTitle) galleryTitle.textContent = gallery.title;
if (galleryDescription) galleryDescription.textContent = gallery.description;
if (galleryGrid && category === 'portraits') galleryGrid.classList.add('portrait-grid');

if (galleryGrid) {
  galleryGrid.innerHTML = gallery.images.map((image, index) => `
    <article class="gallery-item" aria-label="${image.title}" tabindex="0" data-index="${index}">
      <img src="${image.src}" alt="${image.title}" loading="lazy">
      <div class="caption">${index + 1}. ${image.title}</div>
    </article>
  `).join('');
}

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
let activeImageIndex = 0;

const showImage = (index) => {
  activeImageIndex = (index + gallery.images.length) % gallery.images.length;
  const image = gallery.images[activeImageIndex];
  lightboxImage.src = image.src;
  lightboxImage.alt = image.title;
  lightboxCaption.textContent = `${activeImageIndex + 1}. ${image.title}`;
};

const closeLightbox = () => {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lightbox-open');
};

if (lightbox && galleryGrid) {
  galleryGrid.addEventListener('click', (event) => {
    const item = event.target.closest('.gallery-item');
    if (!item) return;
    showImage(Number(item.dataset.index));
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
  });

  galleryGrid.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    event.target.click();
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', () => showImage(activeImageIndex - 1));
  lightboxNext.addEventListener('click', () => showImage(activeImageIndex + 1));
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (event) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') showImage(activeImageIndex - 1);
    if (event.key === 'ArrowRight') showImage(activeImageIndex + 1);
  });
}

const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') document.body.classList.add('dark-mode');

const updateThemeToggle = () => {
  const isDark = document.body.classList.contains('dark-mode');
  if (!themeToggle) return;
  themeToggle.querySelector('.theme-label').textContent = isDark ? 'Light' : 'Dark';
  themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  themeToggle.setAttribute('aria-pressed', String(isDark));
};

if (themeToggle) {
  updateThemeToggle();
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    updateThemeToggle();
  });
}

const navToggle = document.getElementById('navtoggle');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const navlinks = document.getElementById('navlinks');
    if (navlinks) navlinks.classList.toggle('open');
  });
}
})();
