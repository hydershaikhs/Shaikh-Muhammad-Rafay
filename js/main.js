/**
 * Abdul Rafay Shaikh - Single-Page Portfolio Interactions
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initActiveNavOnScroll();
  initProjectLightbox();
  initContactForm();
  initStatCounters();
});

/* --- Navbar Scroll & Mobile Menu --- */
function initNavbar() {
  const navbar = document.querySelector(".navbar");
  const mobileToggle = document.querySelector(".mobile-toggle");
  const navLinks = document.querySelector(".nav-links");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      navbar?.classList.add("scrolled");
    } else {
      navbar?.classList.remove("scrolled");
    }
  });

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      const icon = mobileToggle.querySelector("i");
      if (icon) {
        if (navLinks.classList.contains("active")) {
          icon.classList.remove("fa-bars");
          icon.classList.add("fa-xmark");
        } else {
          icon.classList.remove("fa-xmark");
          icon.classList.add("fa-bars");
        }
      }
    });

    // Close menu when clicking on any anchor
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        const icon = mobileToggle.querySelector("i");
        if (icon) {
          icon.classList.remove("fa-xmark");
          icon.classList.add("fa-bars");
        }
      });
    });
  }
}

/* --- Active Nav Item on Scroll --- */
function initActiveNavOnScroll() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let currentId = "";
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentId}`) {
        link.classList.add("active");
      }
    });
  });
}

/* --- Lightbox for Featured Projects --- */
function initProjectLightbox() {
  const lightbox = document.getElementById("project-lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxBrand = document.getElementById("lightbox-brand");
  const closeBtn = document.querySelector(".lightbox-close");
  const projectCards = document.querySelectorAll(".project-item-card");

  projectCards.forEach(card => {
    card.addEventListener("click", () => {
      const title = card.getAttribute("data-title");
      const brand = card.getAttribute("data-brand");
      const img = card.querySelector("img")?.src;

      if (lightboxImg) lightboxImg.src = img || "";
      if (lightboxTitle) lightboxTitle.textContent = title || "";
      if (lightboxBrand) lightboxBrand.textContent = brand || "";

      lightbox?.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  const closeLightbox = () => {
    lightbox?.classList.remove("active");
    document.body.style.overflow = "";
  };

  closeBtn?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox?.classList.contains("active")) {
      closeLightbox();
    }
  });
}

/* --- Contact Form Handling --- */
function initContactForm() {
  const form = document.getElementById("portfolio-contact-form");
  const alert = document.getElementById("form-alert");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.querySelector("#user-name")?.value.trim() || "";
    const email = form.querySelector("#user-email")?.value.trim() || "";
    const message = form.querySelector("#user-message")?.value.trim() || "";
    const btn = form.querySelector("button[type='submit']");
    const orig = btn ? btn.innerHTML : "Send Message";

    if (btn) {
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
      btn.disabled = true;
    }

    setTimeout(() => {
      if (alert) {
        alert.style.display = "block";
        alert.innerHTML = `
          <strong><i class="fa-solid fa-circle-check"></i> Thank you, ${name}!</strong><br>
          Your message has been sent successfully. I will reach out to <em>${email}</em> promptly!
          <div style="margin-top: 0.5rem;">
            <a href="https://wa.me/923111267926?text=${encodeURIComponent('Hi Abdul Rafay, I just sent you a message: ' + message)}" target="_blank" class="btn btn-outline btn-sm" style="margin-top: 0.35rem; display: inline-flex;">
              <i class="fa-brands fa-whatsapp"></i> Also chat on WhatsApp
            </a>
          </div>
        `;
      }
      form.reset();
      if (btn) {
        btn.innerHTML = orig;
        btn.disabled = false;
      }
    }, 900);
  });
}

/* --- Stat Counters Animation --- */
function initStatCounters() {
  const statNumbers = document.querySelectorAll(".stat-cell-value[data-target]");
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute("data-target"), 10) || 0;
        const suffix = el.getAttribute("data-suffix") || "";
        const duration = 1400;
        const startTime = performance.now();

        function update(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(easeProgress * target);

          el.textContent = current + suffix;

          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            el.textContent = target + suffix;
          }
        }

        requestAnimationFrame(update);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.4 });

  statNumbers.forEach(num => observer.observe(num));
}
