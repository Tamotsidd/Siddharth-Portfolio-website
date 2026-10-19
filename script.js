const header = document.querySelector(".site-header");
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
const navLinks = [...document.querySelectorAll(".main-nav a")];
const glow = document.querySelector(".cursor-glow");
const emailLink = document.querySelector("[data-desktop-href]");
const mobileUserAgent = /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
  (/Macintosh/i.test(navigator.userAgent) && navigator.maxTouchPoints > 1);
const isMobileDevice = navigator.userAgentData?.mobile ?? mobileUserAgent;

if (emailLink && !isMobileDevice) {
  emailLink.href = emailLink.dataset.desktopHref;
  emailLink.target = "_blank";
  emailLink.rel = "noopener noreferrer";
}

toggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
navLinks.forEach(link => link.addEventListener("click", () => nav.classList.remove("open")));

window.addEventListener("scroll", () => header.classList.toggle("scrolled", window.scrollY > 30));

if (window.matchMedia("(pointer:fine)").matches) {
  window.addEventListener("pointermove", e => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  });
} else glow.remove();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    entry.target.classList.toggle("visible", entry.isIntersecting);
  });
}, {threshold: .12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const filters = document.querySelectorAll(".filter[data-filter]");
const cards = document.querySelectorAll(".photo-card");
filters.forEach(btn => btn.addEventListener("click", () => {
  filters.forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  const filter = btn.dataset.filter;
  cards.forEach(card => {
    const show = filter === "all" || card.dataset.category === filter;
    card.style.display = show ? "" : "none";
  });
}));

const galleryGrids = document.querySelectorAll("[data-gallery]");
if (galleryGrids.length) {
  const imageLightbox = document.createElement("dialog");
  imageLightbox.className = "image-lightbox";
  imageLightbox.setAttribute("aria-label", "Image preview");

  const closeButton = document.createElement("button");
  closeButton.className = "image-lightbox-close";
  closeButton.type = "button";
  closeButton.setAttribute("aria-label", "Close image preview");
  closeButton.textContent = "×";

  const previousButton = document.createElement("button");
  previousButton.className = "image-lightbox-nav image-lightbox-previous";
  previousButton.type = "button";
  previousButton.setAttribute("aria-label", "Previous photo");
  previousButton.textContent = "←";

  const previewImage = document.createElement("img");
  previewImage.className = "image-lightbox-image";
  previewImage.alt = "";

  const caption = document.createElement("p");
  caption.className = "image-lightbox-caption";
  caption.setAttribute("aria-live", "polite");

  const nextButton = document.createElement("button");
  nextButton.className = "image-lightbox-nav image-lightbox-next";
  nextButton.type = "button";
  nextButton.setAttribute("aria-label", "Next photo");
  nextButton.textContent = "→";

  imageLightbox.append(closeButton, previousButton, previewImage, caption, nextButton);
  document.body.append(imageLightbox);

  let activeGallery = [];
  let activeIndex = 0;

  const showImage = index => {
    activeIndex = (index + activeGallery.length) % activeGallery.length;
    const card = activeGallery[activeIndex];
    const image = card.querySelector("img");
    const category = card.querySelector("figcaption")?.textContent.trim() || "";
    previewImage.src = image.currentSrc || image.src;
    previewImage.alt = image.alt;
    caption.textContent = `${String(activeIndex + 1).padStart(2, "0")}. ${category}`;
    const hasMultipleImages = activeGallery.length > 1;
    previousButton.hidden = !hasMultipleImages;
    nextButton.hidden = !hasMultipleImages;
  };

  const openImage = card => {
    const gallery = card.closest("[data-gallery]");
    activeGallery = [...gallery.querySelectorAll(".photo-card, .design-card")];
    showImage(activeGallery.indexOf(card));
    document.body.classList.add("lightbox-open");
    imageLightbox.showModal();
    closeButton.focus();
  };

  galleryGrids.forEach(gallery => {
    gallery.addEventListener("click", event => {
      const card = event.target.closest(".photo-card, .design-card");
      if (card) openImage(card);
    });
    gallery.addEventListener("keydown", event => {
      const card = event.target.closest(".photo-card, .design-card");
      if (card && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        openImage(card);
      }
    });
  });

  closeButton.addEventListener("click", () => imageLightbox.close());
  previousButton.addEventListener("click", () => showImage(activeIndex - 1));
  nextButton.addEventListener("click", () => showImage(activeIndex + 1));
  imageLightbox.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft" && activeGallery.length > 1) {
      event.preventDefault();
      showImage(activeIndex - 1);
    } else if (event.key === "ArrowRight" && activeGallery.length > 1) {
      event.preventDefault();
      showImage(activeIndex + 1);
    } else if (event.key === "Escape") {
      event.preventDefault();
      imageLightbox.close();
    }
  });
  imageLightbox.addEventListener("click", event => {
    if (event.target === imageLightbox) imageLightbox.close();
  });
  imageLightbox.addEventListener("close", () => {
    document.body.classList.remove("lightbox-open");
  });
}

document.querySelector("#year").textContent = new Date().getFullYear();
