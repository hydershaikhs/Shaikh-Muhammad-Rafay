/**
 * Main Interactive Engine
 * Handles Scroll Reveals, Animated Counters, Lightbox, Dynamic CMS rendering, and Form UX.
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initScrollReveal();
  initStatCounters();
  initTestimonialsSlider();
  initPortfolioFiltersAndLightbox();
  initSkillsProgress();
  initContactForm();
  renderDynamicPageContent();

  // Listen to CMS updates
  window.addEventListener("portfolioDataUpdated", () => {
    renderDynamicPageContent();
    initStatCounters();
    initSkillsProgress();
  });
});

/* --- Navbar & Mobile Menu --- */
function initNavbar() {
  const navbar = document.querySelector(".navbar");
  const mobileToggle = document.querySelector(".mobile-toggle");
  const navLinks = document.querySelector(".nav-links");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
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

    // Close menu when clicking outside or on a link
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

/* --- Scroll Reveal Animations --- */
function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  });

  reveals.forEach(el => observer.observe(el));
}

/* --- Animated Stat Counters --- */
function initStatCounters() {
  const statNumbers = document.querySelectorAll(".stat-number[data-target]");
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute("data-target")) || 0;
        const isDecimal = target % 1 !== 0;
        const duration = 1600;
        const startTime = performance.now();

        function update(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
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
  }, { threshold: 0.5 });

  statNumbers.forEach(num => observer.observe(num));
}

/* --- Skills Progress Bars Fill Up --- */
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

/* --- Testimonials Slider --- */
function initTestimonialsSlider() {
  const cards = document.querySelectorAll(".testimonial-card");
  const dots = document.querySelectorAll(".slider-dot");
  const prevBtn = document.querySelector(".slider-btn-prev");
  const nextBtn = document.querySelector(".slider-btn-next");
  if (!cards.length) return;

  let currentIndex = 0;
  let autoplayTimer = null;

  function showSlide(index) {
    cards.forEach((card, i) => {
      card.classList.toggle("active", i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
    currentIndex = index;
  }

  function nextSlide() {
    let nextIndex = (currentIndex + 1) % cards.length;
    showSlide(nextIndex);
  }

  function prevSlide() {
    let prevIndex = (currentIndex - 1 + cards.length) % cards.length;
    showSlide(prevIndex);
  }

  nextBtn?.addEventListener("click", () => {
    nextSlide();
    resetAutoplay();
  });

  prevBtn?.addEventListener("click", () => {
    prevSlide();
    resetAutoplay();
  });

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      const idx = parseInt(dot.getAttribute("data-index"), 10);
      showSlide(idx);
      resetAutoplay();
    });
  });

  function startAutoplay() {
    autoplayTimer = setInterval(nextSlide, 5500);
  }

  function resetAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
  }

  startAutoplay();
}

/* --- Portfolio Filtering & Lightbox --- */
function initPortfolioFiltersAndLightbox() {
  const filterTabs = document.querySelectorAll(".filter-tab");
  const projectCards = document.querySelectorAll(".project-card");
  const lightbox = document.getElementById("portfolio-lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxDesc = document.getElementById("lightbox-desc");
  const lightboxTag = document.getElementById("lightbox-tag");
  const closeBtn = document.querySelector(".lightbox-close");

  // Filtering
  filterTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      filterTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const category = tab.getAttribute("data-filter");

      projectCards.forEach(card => {
        const cardCat = card.getAttribute("data-category");
        if (category === "all" || cardCat === category) {
          card.style.display = "flex";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 50);
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.95)";
          setTimeout(() => {
            card.style.display = "none";
          }, 250);
        }
      });
    });
  });

  // Lightbox
  if (lightbox) {
    document.addEventListener("click", (e) => {
      const card = e.target.closest(".project-card");
      if (card) {
        const title = card.getAttribute("data-title") || "";
        const desc = card.getAttribute("data-desc") || "";
        const tag = card.getAttribute("data-tag") || "";
        const img = card.querySelector("img")?.src || "";

        if (lightboxImg) lightboxImg.src = img;
        if (lightboxTitle) lightboxTitle.textContent = title;
        if (lightboxDesc) lightboxDesc.textContent = desc;
        if (lightboxTag) lightboxTag.textContent = tag;

        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    });

    const closeLightbox = () => {
      lightbox.classList.remove("active");
      document.body.style.overflow = "";
    };

    closeBtn?.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.classList.contains("active")) {
        closeLightbox();
      }
    });
  }
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
          Your message has been sent successfully. Abdul Rafay will reply to <em>${email}</em> promptly!
          <div style="margin-top: 0.75rem;">
            <a href="https://wa.me/923111267926?text=${encodeURIComponent('Hi Abdul Rafay, I just submitted the contact form regarding ' + subject)}" target="_blank" class="btn btn-secondary btn-sm" style="margin-top: 0.5rem; display: inline-flex;">
              <i class="fa-brands fa-whatsapp"></i> Also chat directly on WhatsApp
            </a>
          </div>
        `;
      }
      form.reset();
      if (submitBtn) {
        submitBtn.innerHTML = origText;
        submitBtn.disabled = false;
      }
    }, 1000);
  });
}

/* --- Render Dynamic CMS Content (Services, Projects, Awards) --- */
function renderDynamicPageContent() {
  if (!window.PortfolioData) return;
  const data = PortfolioData.get();

  // 1. Featured Work Grid on Home Page (Show first 3)
  const homeFeaturedContainer = document.getElementById("home-featured-grid");
  if (homeFeaturedContainer) {
    const featuredProjects = data.portfolio.slice(0, 3);
    homeFeaturedContainer.innerHTML = featuredProjects.map(proj => `
      <div class="project-card reveal" 
           data-category="${proj.category}" 
           data-title="${escapeHtml(proj.title)}" 
           data-desc="${escapeHtml(proj.description)}" 
           data-tag="${escapeHtml(proj.tag)}">
        <div class="project-thumb-wrap">
          <img src="${proj.image}" alt="${escapeHtml(proj.title)}" loading="lazy">
          <span class="project-overlay-badge">${escapeHtml(proj.tag)}</span>
        </div>
        <div class="project-body">
          <h3 class="project-title">${escapeHtml(proj.title)}</h3>
          <p class="project-desc">${escapeHtml(proj.description)}</p>
          <div class="project-link-cta">
            <span>Explore Details</span>
            <i class="fa-solid fa-arrow-right"></i>
          </div>
        </div>
      </div>
    `).join("");
  }

  // 2. Full Portfolio Grid on Portfolio Page
  const fullPortfolioContainer = document.getElementById("full-portfolio-grid");
  if (fullPortfolioContainer) {
    fullPortfolioContainer.innerHTML = data.portfolio.map(proj => `
      <div class="project-card reveal" 
           data-category="${proj.category}" 
           data-title="${escapeHtml(proj.title)}" 
           data-desc="${escapeHtml(proj.description)}" 
           data-tag="${escapeHtml(proj.tag)}">
        <div class="project-thumb-wrap">
          <img src="${proj.image}" alt="${escapeHtml(proj.title)}" loading="lazy">
          <span class="project-overlay-badge">${escapeHtml(proj.tag)}</span>
        </div>
        <div class="project-body">
          <h3 class="project-title">${escapeHtml(proj.title)}</h3>
          <p class="project-desc">${escapeHtml(proj.description)}</p>
          <div class="project-link-cta">
            <span>View Preview</span>
            <i class="fa-solid fa-up-right-and-down-left-from-center"></i>
          </div>
        </div>
      </div>
    `).join("");
  }

  // 3. Services Grid
  const servicesContainer = document.getElementById("dynamic-services-grid");
  if (servicesContainer) {
    servicesContainer.innerHTML = data.services.map(srv => `
      <div class="service-card reveal">
        <div class="service-icon-box">
          <i class="fa-solid ${srv.icon}"></i>
        </div>
        <h3 class="service-title">${escapeHtml(srv.title)}</h3>
        <p class="service-description">${escapeHtml(srv.description)}</p>
        <div class="service-pricing-badge">
          <span>Starting at:</span>
          <span class="service-price">${escapeHtml(srv.price)}</span>
        </div>
      </div>
    `).join("");
  }

  // 4. Awards Grid
  const awardsContainer = document.getElementById("dynamic-awards-grid");
  if (awardsContainer) {
    awardsContainer.innerHTML = data.achievements.map(ach => `
      <div class="award-card reveal">
        <div class="award-badge-icon">
          <i class="fa-solid fa-award"></i>
        </div>
        <span class="award-year">${escapeHtml(ach.year)}</span>
        <h3 class="award-title">${escapeHtml(ach.title)}</h3>
        <p class="award-organization"><i class="fa-solid fa-certificate"></i> ${escapeHtml(ach.awardedBy)}</p>
        <p class="award-desc">${escapeHtml(ach.description)}</p>
      </div>
    `).join("");
  }

  // 5. Milestones Timeline on About Page
  const timelineContainer = document.getElementById("dynamic-timeline-list");
  if (timelineContainer && data.milestones) {
    timelineContainer.innerHTML = data.milestones.map(m => `
      <div class="timeline-item reveal">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <div class="timeline-year">${escapeHtml(m.year)}</div>
          <h3 class="timeline-title">${escapeHtml(m.title)}</h3>
          <div class="timeline-institution">${escapeHtml(m.institution)}</div>
          <p class="timeline-desc">${escapeHtml(m.description)}</p>
        </div>
      </div>
    `).join("");
  }

  // 6. Skills Meter on About Page
  const skillsContainer = document.getElementById("dynamic-skills-list");
  if (skillsContainer && data.skills) {
    skillsContainer.innerHTML = data.skills.map(s => `
      <div class="skill-bar-card reveal">
        <div class="skill-info">
          <span>${escapeHtml(s.name)}</span>
          <span>${s.level}%</span>
        </div>
        <div class="skill-track">
          <div class="skill-fill" data-level="${s.level}"></div>
        </div>
      </div>
    `).join("");
  }

  initScrollReveal();
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
