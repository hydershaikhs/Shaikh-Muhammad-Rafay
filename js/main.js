/**
 * Shaikh Muhammad Rafay - Single-Page Portfolio Interactions
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initActiveNavOnScroll();
  initStatCounters();
  initSkillsProgress();
  initProjectLightbox();
  initContactForm();
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

/* --- Active Nav Link on Scroll --- */
function initActiveNavOnScroll() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let currentId = "";
    const scrollPos = window.scrollY + 130;

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

/* --- Stat Counters Animation --- */
function initStatCounters() {
  const statNumbers = document.querySelectorAll(".stat-number[data-target]");
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute("data-target")) || 0;
        const isDecimal = target % 1 !== 0;
        const duration = 1500;
        const startTime = performance.now();

        function update(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const currentVal = easeProgress * target;

          el.textContent = isDecimal ? currentVal.toFixed(1) : Math.floor(currentVal);

          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            el.textContent = isDecimal ? target.toFixed(1) : target;
          }
        }

        requestAnimationFrame(update);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.4 });

  statNumbers.forEach(num => observer.observe(num));
}

/* --- Skills Progress Fill --- */
function initSkillsProgress() {
  const skillFills = document.querySelectorAll(".skill-fill[data-level]");
  if (!skillFills.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const level = bar.getAttribute("data-level") || "0";
        bar.style.width = level + "%";
        obs.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  skillFills.forEach(bar => observer.observe(bar));
}

/* --- Project Lightbox --- */
function initProjectLightbox() {
  const lightbox = document.getElementById("portfolio-lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxDesc = document.getElementById("lightbox-desc");
  const lightboxTag = document.getElementById("lightbox-tag");
  const closeBtn = document.querySelector(".lightbox-close");
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach(card => {
    card.addEventListener("click", () => {
      const title = card.getAttribute("data-title") || "";
      const desc = card.getAttribute("data-desc") || "";
      const tag = card.getAttribute("data-tag") || "";
      const img = card.querySelector("img")?.src || "";

      if (lightboxImg) lightboxImg.src = img;
      if (lightboxTitle) lightboxTitle.textContent = title;
      if (lightboxDesc) lightboxDesc.textContent = desc;
      if (lightboxTag) lightboxTag.textContent = tag;

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
  const form = document.getElementById("contact-form");
  const feedback = document.getElementById("form-feedback");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.querySelector("#sender-name")?.value.trim() || "";
    const email = form.querySelector("#sender-email")?.value.trim() || "";
    const subject = form.querySelector("#project-type")?.value || "Inquiry";
    const message = form.querySelector("#sender-message")?.value.trim() || "";

    const submitBtn = form.querySelector("button[type='submit']");
    const origText = submitBtn ? submitBtn.innerHTML : "Send Message";

    if (submitBtn) {
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending message...';
      submitBtn.disabled = true;
    }

    setTimeout(() => {
      if (feedback) {
        feedback.style.display = "block";
        feedback.innerHTML = `
          <strong><i class="fa-solid fa-circle-check"></i> Thank you, ${name}!</strong><br>
          Your project inquiry has been received. Shaikh Muhammad Rafay will reply to <em>${email}</em> promptly!
        `;
      }
      form.reset();
      if (submitBtn) {
        submitBtn.innerHTML = origText;
        submitBtn.disabled = false;
      }
    }, 900);
  });
}
