  document.body.classList.add('js-enabled');
  const revealSections = document.querySelectorAll('section');
  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, {threshold:0.12});
  revealSections.forEach(section => sectionObserver.observe(section));

  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') document.body.classList.add('dark-mode');

  if (themeToggle) {
    const updateThemeToggle = () => {
      const isDark = document.body.classList.contains('dark-mode');
      themeToggle.querySelector('.theme-label').textContent = isDark ? 'Light' : 'Dark';
      themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      themeToggle.setAttribute('aria-pressed', String(isDark));
    };
    updateThemeToggle();
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
      updateThemeToggle();
    });
  }

  // mobile nav toggle
  const navToggle = document.getElementById('navtoggle');
  const navLinks = document.getElementById('navlinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  }
  document.querySelectorAll('.navlinks a').forEach(a=>{
    a.addEventListener('click', ()=>{
      const openNav = document.getElementById('navlinks');
      if (openNav) openNav.classList.remove('open');
    });
  });

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // generate selected work categories
  const categories = [
    {slug:'weddings', title:'Wedding Stories', subtitle:'Ceremony, emotion, and detail', hue1:'#E4D9C6', hue2:'#B79A6B'},
    {slug:'portraits', title:'Portraits', subtitle:'Character and quiet confidence', image:'Portraits/DSC03434.jpg', hue1:'#E8DCD0', hue2:'#C79E86'},
    {slug:'streets', title:'Street Life', subtitle:'People, movement, and place', hue1:'#DDD6C8', hue2:'#8E8C7C'},
    {slug:'travel', title:'Travel & Culture', subtitle:'Journeys and rituals', hue1:'#DAD2BE', hue2:'#A99B72'}
  ];

  const sheet = document.getElementById('sheet');
  if (sheet) {
    const portraitHighlights = [
      'Portraits/1764858444195.jpg', 'Portraits/DSC03434.jpg', 'Portraits/DSC05372.jpg',
      'Portraits/DSC_3688.jpg', 'Portraits/INFI7751.jpg', 'Portraits/f13315008.jpg'
    ];
    categories.forEach((p, i) => {
      const anchor = document.createElement('a');
      anchor.className = 'category-card';
      anchor.href = `gallery.html?cat=${p.slug}`;
      const highlight = p.slug === 'portraits'
        ? portraitHighlights[Math.floor(Math.random() * portraitHighlights.length)]
        : p.image;
      const imageStyle = highlight
        ? `background-image: linear-gradient(to top, rgba(23,23,26,0.72), rgba(23,23,26,0.08)), url('${highlight}');`
        : '';
      anchor.innerHTML = `
        <div class="category-card-image" style="--hue1:${p.hue1};--hue2:${p.hue2};${imageStyle}"></div>
        <div class="category-card-overlay">
          <div class="category-tag">${String(i+1).padStart(2, '0')}</div>
          <div class="category-copy">
            <h3>${p.title}</h3>
            <p>${p.subtitle}</p>
          </div>
        </div>
      `;
      sheet.appendChild(anchor);
    });
  }

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    // Open a prefilled Gmail draft for this static-site form.
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');
      const subject = `Portfolio enquiry from ${name}`;
      const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
      const gmailUrl = new URL('https://mail.google.com/mail/');
      gmailUrl.search = new URLSearchParams({
        view:'cm',
        fs:'1',
        to:'tamotsiddharth99@gmail.com',
        su:subject,
        body
      });
      window.open(gmailUrl.toString(), '_blank', 'noopener,noreferrer');
    });
  }
