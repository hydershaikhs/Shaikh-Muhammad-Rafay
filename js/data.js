/**
 * Data store and CMS synchronization for Abdul Rafay Shaikh's Portfolio
 * Supports localStorage persistence, dynamic theming, and real-time live preview.
 */

const DEFAULT_SITE_DATA = {
  theme: "charcoal-orange",
  admin: {
    username: "admin",
    password: "Admin@123"
  },
  profile: {
    name: "Abdul Rafay Shaikh",
    preferredName: "Shaikh Muhammad Rafay",
    title: "Computer Science Educator | Grade 9 Specialist & Video Editor",
    tagline: "Empowering young minds through computing fundamentals & crafting cinematic video stories.",
    bio: "Dedicated and tech-savvy Computer Science educator and BS–IT student (2nd Year, Department of Information Technology, GCUH) with a strong command of computing fundamentals, ICT tools, and Adobe Premiere Pro video editing.",
    location: "Hyderabad, Sindh, Pakistan",
    email: "shaikhabdulrafay815@gmail.com",
    phone: "+92 311 1267926",
    whatsapp: "+923111267926",
    availability: "Full-time | Part-time | Contract",
    education: "Bachelor of Science in Information Technology (BS–IT) – In Progress, 2nd Year, GCUH",
    profileImage: "assets/profile.svg",
    social: {
      github: "https://github.com/hydershaikhs",
      youtube: "https://youtube.com/@rafayshaikh",
      instagram: "https://instagram.com/rafay_editz",
      linkedin: "https://linkedin.com/in/abdul-rafay-shaikh"
    }
  },
  stats: [
    { label: "Videos Edited & Produced", value: 80, suffix: "+" },
    { label: "Students & Peers Mentored", value: 120, suffix: "+" },
    { label: "Years Teaching & Tech Practice", value: 2, suffix: "+" },
    { label: "Student & Client Rating", value: 4.9, suffix: " / 5.0" }
  ],
  services: [
    {
      id: "srv-1",
      icon: "fa-chalkboard-user",
      title: "Grade 9 Computer Science Mastery",
      description: "Structured curriculum delivery covering hardware, software, number systems, networking, and board-exam revision strategies with past paper practice.",
      price: "$25 / mo",
      period: "Monthly or Per Topic"
    },
    {
      id: "srv-2",
      icon: "fa-video",
      title: "Adobe Premiere Pro Video Editing",
      description: "Fast-paced YouTube video editing, educational lecture edits, transitions, sound sync, pacing, and viral short-form reels for Instagram & TikTok.",
      price: "$45 / video",
      period: "Starting rate"
    },
    {
      id: "srv-3",
      icon: "fa-code",
      title: "Programming Logic & Flowcharts",
      description: "Step-by-step introduction to computational thinking, algorithms, dry runs, flowcharts, and introductory coding exercises tailored for secondary school students.",
      price: "$20 / session",
      period: "Hourly / Session"
    },
    {
      id: "srv-4",
      icon: "fa-laptop-code",
      title: "ICT & Digital Literacy (MS Office & Zoom)",
      description: "Comprehensive hands-on coaching in MS Word, Excel spreadsheets, PowerPoint presentations, and collaborative Google Classroom workflows.",
      price: "$35 / course",
      period: "Complete Module"
    }
  ],
  portfolio: [
    {
      id: "proj-1",
      category: "cs-education",
      categoryLabel: "CS & Educational Content",
      title: "Grade 9 Number Systems Interactive Lesson",
      description: "Comprehensive visual explainer converting Binary, Octal, Decimal and Hexadecimal systems with real-world computer memory examples.",
      image: "assets/proj-numbers.svg",
      tag: "Grade 9 Curriculum"
    },
    {
      id: "proj-2",
      category: "video-editing",
      categoryLabel: "Video Editing & Reels",
      title: "Tech Explainer Showcase Reel (Premiere Pro)",
      description: "High-retention vertical short reel featuring motion typography, dynamic zoom cuts, sound design and color grading produced in Adobe Premiere Pro.",
      image: "assets/proj-reel.svg",
      tag: "Premiere Pro 4K"
    },
    {
      id: "proj-3",
      category: "cs-education",
      categoryLabel: "CS & Educational Content",
      title: "Computer Networks & Cyber Safety Workshop",
      description: "Interactive lecture slides and student activity packet exploring LAN/WAN topologies, IP addressing, and digital footprint safety.",
      image: "assets/proj-network.svg",
      tag: "Networking & Security"
    },
    {
      id: "proj-4",
      category: "video-editing",
      categoryLabel: "Video Editing & Reels",
      title: "Educational YouTube Long-Form Masterclass",
      description: "Full YouTube lecture edit featuring split-screen graphics, animated lower thirds, noise-cleaned audio, and cinematic pacing.",
      image: "assets/proj-youtube.svg",
      tag: "Long-Form YouTube"
    },
    {
      id: "proj-5",
      category: "it-study",
      categoryLabel: "IT Projects & Notes",
      title: "Database Fundamentals & MS Excel Tracker",
      description: "Structured student mark sheet and grade calculation database model with automated Excel formulas, charts, and conditional formatting.",
      image: "assets/proj-db.svg",
      tag: "Databases & Excel"
    },
    {
      id: "proj-6",
      category: "it-study",
      categoryLabel: "IT Projects & Notes",
      title: "Operating Systems & Memory Hierarchy Guide",
      description: "Illustrated study cheat-sheet breaking down OS process scheduling, cache levels, and storage architecture for board exam candidates.",
      image: "assets/proj-os.svg",
      tag: "Study Cheat Sheet"
    }
  ],
  skills: [
    { name: "Grade 9 Computer Science Curriculum", level: 96 },
    { name: "Adobe Premiere Pro (Video Editing & Color)", level: 85 },
    { name: "Programming Logic, Algorithms & Flowcharts", level: 88 },
    { name: "ICT Delivery (Google Classroom, Zoom, MS Office)", level: 94 },
    { name: "Databases & MS Excel Data Modeling", level: 86 },
    { name: "Computer Networking & Cyber Safety", level: 82 }
  ],
  milestones: [
    {
      year: "2023 - Present",
      title: "BS–IT Scholar (2nd Year)",
      institution: "Government College University, Hyderabad (GCUH)",
      description: "Pursuing Bachelor of Science in Information Technology with deep focus on computing foundations, networking, software concepts, and digital systems."
    },
    {
      year: "2024",
      title: "Self-Directed Teaching Practice & Lesson Design",
      institution: "Hyderabad Academic Circles",
      description: "Designed curriculum-aligned lesson plans, question banks, and visual revision guides for Matriculation / Grade 9 Computer Science students."
    },
    {
      year: "2024 - 2025",
      title: "Adobe Premiere Pro Creative Portfolio",
      institution: "Freelance & YouTube Creators",
      description: "Edited 80+ videos including engaging micro-lectures, high-energy reels, and tech tutorials with custom sound design and smooth visual flow."
    },
    {
      year: "2025 - 2026",
      title: "ICT-Integrated Online Classroom Leadership",
      institution: "Virtual Tutoring & Mentorship",
      description: "Successfully transitioned teaching to hybrid formats via Google Classroom & Zoom, boosting student engagement and mock exam pass rates."
    }
  ],
  achievements: [
    {
      id: "ach-1",
      title: "Outstanding Academic Performance in IT Fundamentals",
      year: "2024",
      awardedBy: "Department of IT, GCUH Hyderabad",
      description: "Recognized for consistent excellence in computing coursework, laboratory assignments, and structured algorithmic problem solving."
    },
    {
      id: "ach-2",
      title: "Excellence in Digital Instructional Design",
      year: "2024",
      awardedBy: "Peer Educator Circle, Hyderabad",
      description: "Awarded for authoring simplified visual notes on binary arithmetic and networking that helped 100+ students grasp complex concepts."
    },
    {
      id: "ach-3",
      title: "Featured Video Editor Milestone (Premiere Pro)",
      year: "2025",
      awardedBy: "Sindh Tech Creators Community",
      description: "Celebrated for producing top-rated educational content and reels with cinematic color balance and crisp sound mastering."
    }
  ],
  testimonials: [
    {
      quote: "Sir Abdul Rafay simplified binary arithmetic and flowcharts for me. I went from being confused about Grade 9 CS to securing an A+ in my school mid-term exams!",
      author: "Hassan Ali",
      role: "Grade 9 Computer Science Student"
    },
    {
      quote: "Rafay's video editing in Premiere Pro is sharp, cinematic, and retains viewer attention. His pacing on my YouTube tech explainers doubled our average watch duration.",
      author: "Zubair Ahmed",
      role: "Tech Content Creator & Client"
    },
    {
      quote: "A dedicated educator who truly cares about student fundamentals. His lesson plans on MS Office and networking are exceptionally well-structured and practical.",
      author: "Tariq Mahmood",
      role: "Senior Academic Coordinator"
    }
  ],
  brands: [
    "GCUH IT Dept",
    "Adobe Premiere Pro",
    "Google Classroom",
    "Microsoft 365",
    "Zoom Education",
    "Sindh Board CS",
    "YouTube Creators Hub"
  ]
};

const STORAGE_KEY = "shaikh_rafay_portfolio_cms_v1";

const PortfolioData = {
  get: function() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn("Error reading localStorage, using defaults", e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_SITE_DATA));
  },

  save: function(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      window.dispatchEvent(new CustomEvent("portfolioDataUpdated", { detail: data }));
      return true;
    } catch (e) {
      console.error("Error saving to localStorage", e);
      return false;
    }
  },

  reset: function() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SITE_DATA));
      window.dispatchEvent(new CustomEvent("portfolioDataUpdated", { detail: DEFAULT_SITE_DATA }));
      return true;
    } catch (e) {
      return false;
    }
  },

  getTheme: function() {
    const data = this.get();
    return data.theme || "charcoal-orange";
  },

  setTheme: function(themeName) {
    const data = this.get();
    data.theme = themeName;
    this.save(data);
    this.applyTheme(themeName);
  },

  applyTheme: function(themeName) {
    const currentTheme = themeName || this.getTheme();
    document.documentElement.setAttribute("data-theme", currentTheme);
  },

  hydrateDOM: function() {
    const data = this.get();
    this.applyTheme(data.theme);

    // Profile Hydration
    document.querySelectorAll("[data-cms='profile.name']").forEach(el => el.textContent = data.profile.name);
    document.querySelectorAll("[data-cms='profile.preferredName']").forEach(el => el.textContent = data.profile.preferredName);
    document.querySelectorAll("[data-cms='profile.title']").forEach(el => el.textContent = data.profile.title);
    document.querySelectorAll("[data-cms='profile.tagline']").forEach(el => el.textContent = data.profile.tagline);
    document.querySelectorAll("[data-cms='profile.bio']").forEach(el => el.textContent = data.profile.bio);
    document.querySelectorAll("[data-cms='profile.location']").forEach(el => el.textContent = data.profile.location);
    document.querySelectorAll("[data-cms='profile.email']").forEach(el => {
      el.textContent = data.profile.email;
      if (el.tagName === "A") el.href = `mailto:${data.profile.email}`;
    });
    document.querySelectorAll("[data-cms='profile.phone']").forEach(el => {
      el.textContent = data.profile.phone;
      if (el.tagName === "A") el.href = `tel:${data.profile.phone.replace(/\\s+/g, '')}`;
    });
    document.querySelectorAll("[data-cms='profile.whatsapp']").forEach(el => {
      el.textContent = data.profile.phone;
      if (el.tagName === "A") el.href = `https://wa.me/${data.profile.whatsapp.replace(/[^0-9]/g, '')}`;
    });
    document.querySelectorAll("[data-cms='profile.image']").forEach(el => {
      if (el.tagName === "IMG") el.src = data.profile.profileImage;
    });

    // Social Links
    if (data.profile.social) {
      document.querySelectorAll("[data-cms='social.github']").forEach(el => el.href = data.profile.social.github);
      document.querySelectorAll("[data-cms='social.youtube']").forEach(el => el.href = data.profile.social.youtube);
      document.querySelectorAll("[data-cms='social.instagram']").forEach(el => el.href = data.profile.social.instagram);
      document.querySelectorAll("[data-cms='social.linkedin']").forEach(el => el.href = data.profile.social.linkedin);
    }
  }
};

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
  PortfolioData.hydrateDOM();
});

window.addEventListener("storage", (e) => {
  if (e.key === STORAGE_KEY) {
    PortfolioData.hydrateDOM();
  }
});

window.PortfolioData = PortfolioData;
