// ===============================
// PROJECT DATA / ===============================
const projectsData = [
    {
        title: "Student Affairs Merit System",
        description: "A web-based platform for CEU Manila that streamlines student activity tracking and automates merit point computation.",
        features: [
            "Centralized tracking of student activities",
            "Automated merit point calculation",
            "Personalized student merit dashboard",
            "Admin tools for activity and record management",
            "Secure role-based access control",
            "Automated email and system notifications",
            "Fully responsive interface built with Bootstrap"
        ],
        languages: [ "JavaScript", "HTML", "CSS", "Bootstrap", "MongoDB", "ReactJs", "NodeJs", ]
    },
    {
        title: "Human Food & Water Dispenser",
        description: "An automated robotics system designed to dispense food and water in a hygienic, efficient, and user-friendly manner. The project is intended for schools, offices, hospitals, and public spaces to improve accessibility, reduce waste, and promote healthy eating and hydration habits.",
        features: [
            "Automated food and water dispensing system",
            "Touchless detection using ultrasonic sensors",
            "Servo motor–controlled dispensing mechanism",
            "Hygienic and safe operation for public use",
            "Efficient design that minimizes food and water waste",
            "Suitable for schools, offices, hospitals, and public areas"
        ],
        languages: ["Arduino (C/C++)"]
    },
    {
        title: "PowerHub E-Commerce Platform",
        description: "PowerHub is an e-commerce platform. It allows users to browse and purchase technology-related products such as PCs, mouse, and other accessories. Users can add items to the cart, view their total purchases, and complete transactions, while admins can manage products by adding, deleting, or updating prices.",
        features: [
            "Browse and purchase technology-related products",
            "Add items to cart and view total purchases",
            "Admin panel for managing products (add, delete, update prices)",
            "User-friendly interface for smooth shopping experience",
            "Built entirely using MS Access"
        ],
        languages: ["MS Access"]
    },
    {
        title: "Power Bites Online Store",
        description: "An online store designed for fitness enthusiasts, offering high-protein, low-carb snacks to support workouts and active lifestyles.",
        features: [
            "Browse and purchase high-protein, low-carb fitness snacks",
            "Responsive design for desktop and mobile devices",
            "User-friendly product catalog and shopping interface",
            "Secure and streamlined checkout process",
            "Modern and interactive UI for a smooth user experience"
        ],
        languages: ["HTML", "CSS", "JavaScript"]
    }
];

// ===============================
// UTILITY FUNCTIONS
// ===============================
function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

function createRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    ripple.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        position: absolute;
        border-radius: 50%;
        background: rgba(102,126,234,0.3);
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `@keyframes ripple { to { transform: scale(4); opacity: 0; } }`;
document.head.appendChild(rippleStyle);

// ===============================
// MOBILE MENU
// ===============================
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');
mobileMenu.addEventListener('click', () => navMenu.classList.toggle('active'));
document.querySelectorAll('#nav-menu a').forEach(link => link.addEventListener('click', () => navMenu.classList.remove('active')));

// ===============================
// NAVBAR SCROLL & ACTIVE LINK
// ===============================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 100);
    let current = '';
    document.querySelectorAll('section').forEach(section => {
        if (window.scrollY >= section.offsetTop - 200) current = section.id;
    });
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
});

// ===============================
// CV POPUP
// ===============================
const cvLink = document.getElementById('cv-link');
const cvPopup = document.querySelector('.cv-popup');
cvLink.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    cvPopup.classList.toggle('active');
});
document.addEventListener('click', e => {
    if (!e.target.closest('.cv-dropdown')) cvPopup.classList.remove('active');
});

const canvas = document.getElementById('star-canvas');
const ctx = canvas.getContext('2d');
let stars = [];

// Define a palette of star colors
const starColors = ['#FFD700', '#FF69B4', '#7FFFD4', '#FFA500', '#ADFF2F', '#00BFFF'];

function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = Array.from({ length: 120 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        color: starColors[Math.floor(Math.random() * starColors.length)] // assign random color
    }));
}

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    stars.forEach((star, i) => {
        // Draw the star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color; // use the assigned color
        ctx.fill();
        ctx.closePath();

        // Move the star
        star.x += star.vx;
        star.y += star.vy;

        // Bounce off edges
        if (star.x < 0 || star.x > canvas.width) star.vx *= -1;
        if (star.y < 0 || star.y > canvas.height) star.vy *= -1;

        // Draw connecting lines
        for (let j = i + 1; j < stars.length; j++) {
            const other = stars[j];
            const dx = star.x - other.x;
            const dy = star.y - other.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                ctx.beginPath();
                ctx.moveTo(star.x, star.y);
                ctx.lineTo(other.x, other.y);
                ctx.strokeStyle = `rgba(255,255,255,${1 - dist / 120})`; // keep lines white and subtle
                ctx.stroke();
                ctx.closePath();
            }
        }
    });

    requestAnimationFrame(animateStars);
}

window.addEventListener('resize', () => initCanvas());
initCanvas();
animateStars();



/**
 * Project Carousel and Modal Manager
 * Handles smooth carousel navigation and detailed project modals
 * @version 2.0.0
 */

class ProjectCarousel {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    this.track = this.container?.querySelector('.projects-track');
    this.projects = this.container?.querySelectorAll('.project-card');
    this.prevBtn = this.container?.querySelector('.carousel-button.prev, .carousel-btn.prev');
    this.nextBtn = this.container?.querySelector('.carousel-button.next, .carousel-btn.next');
    this.viewport = this.container?.querySelector('.carousel-viewport');
    
    this.currentIndex = 0;
    this.isAnimating = false;
    
    if (!this.container || !this.track || !this.projects.length) {
      console.warn('ProjectCarousel: Required elements not found');
      return;
    }
    
    this.init();
  }
  
  init() {
    // Force each project card to take full width
    this.setProjectCardWidths();
    this.setupEventListeners();
    this.updateCarousel(false);
    this.updateButtonStates();
  }
  
  setProjectCardWidths() {
    // Ensure each project card takes exactly 100% of container width
    if (!this.projects) return;
    
    this.projects.forEach(project => {
      project.style.minWidth = '100%';
      project.style.maxWidth = '100%';
      project.style.flexShrink = '0';
    });
  }
  
  setupEventListeners() {
    // Button navigation
    this.prevBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.navigate('prev');
    });
    
    this.nextBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.navigate('next');
    });
    
    // Click zones for viewport navigation
    if (this.viewport) {
      this.viewport.addEventListener('click', (e) => {
        const rect = this.viewport.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const viewportWidth = rect.width;
        
        // Left half = previous, right half = next
        if (clickX < viewportWidth / 2) {
          this.navigate('prev');
        } else {
          this.navigate('next');
        }
      });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!this.isInView()) return;
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.navigate('prev');
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        this.navigate('next');
      }
    });
    
    // Resize handler with debounce
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => this.updateCarousel(false), 150);
    });
    
    // Touch/swipe support
    this.setupTouchEvents();
  }
  
  setupTouchEvents() {
    if (!this.viewport) return;
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    this.viewport.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    this.viewport.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe(touchStartX, touchEndX);
    }, { passive: true });
  }
  
  handleSwipe(startX, endX) {
    const threshold = 50; // Minimum swipe distance
    const diff = startX - endX;
    
    if (Math.abs(diff) < threshold) return;
    
    if (diff > 0) {
      // Swiped left - go next
      this.navigate('next');
    } else {
      // Swiped right - go prev
      this.navigate('prev');
    }
  }
  
  isInView() {
    if (!this.container) return false;
    const rect = this.container.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }
  
  getSlideWidth() {
    // Each project card takes full container width
    return this.container.offsetWidth;
  }
  
  getMaxIndex() {
    // Maximum index = number of projects - 1
    return Math.max(0, this.projects.length - 1);
  }
  
  getTotalProjects() {
    return this.projects.length;
  }
  
  navigate(direction) {
    if (this.isAnimating) return;
    
    const maxIndex = this.getMaxIndex();
    let newIndex = this.currentIndex;
    
    if (direction === 'next') {
      newIndex = Math.min(this.currentIndex + 1, maxIndex);
    } else if (direction === 'prev') {
      newIndex = Math.max(this.currentIndex - 1, 0);
    }
    
    if (newIndex === this.currentIndex) return;
    
    this.currentIndex = newIndex;
    this.updateCarousel(true);
    this.updateButtonStates();
  }
  
  goToSlide(index) {
    if (this.isAnimating) return;
    
    const maxIndex = this.getMaxIndex();
    const newIndex = Math.max(0, Math.min(index, maxIndex));
    
    if (newIndex === this.currentIndex) return;
    
    this.currentIndex = newIndex;
    this.updateCarousel(true);
    this.updateButtonStates();
  }
  
  updateCarousel(animate = true) {
    if (!this.track) return;
    
    // Calculate exact translation for ONE project per slide
    const slideWidth = this.getSlideWidth();
    const translateX = -this.currentIndex * slideWidth;
    
    this.track.style.transition = animate 
      ? 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' 
      : 'none';
    this.track.style.transform = `translate3d(${translateX}px, 0, 0)`;
    
    // Update ARIA attributes for accessibility
    this.projects.forEach((project, index) => {
      if (index === this.currentIndex) {
        project.setAttribute('aria-hidden', 'false');
      } else {
        project.setAttribute('aria-hidden', 'true');
      }
    });
    
    if (animate) {
      this.isAnimating = true;
      setTimeout(() => {
        this.isAnimating = false;
      }, 600);
    }
  }
  
  updateButtonStates() {
    const maxIndex = this.getMaxIndex();
    
    if (this.prevBtn) {
      this.prevBtn.disabled = this.currentIndex === 0;
      this.prevBtn.style.opacity = this.currentIndex === 0 ? '0.3' : '1';
      this.prevBtn.style.cursor = this.currentIndex === 0 ? 'not-allowed' : 'pointer';
    }
    
    if (this.nextBtn) {
      this.nextBtn.disabled = this.currentIndex >= maxIndex;
      this.nextBtn.style.opacity = this.currentIndex >= maxIndex ? '0.3' : '1';
      this.nextBtn.style.cursor = this.currentIndex >= maxIndex ? 'not-allowed' : 'pointer';
    }
  }
}


class ProjectModal {
  constructor(modalSelector, projectsData) {
    this.modal = document.getElementById(modalSelector);
    this.projectsData = projectsData;
    
    if (!this.modal) {
      console.warn('ProjectModal: Modal element not found');
      return;
    }
    
    this.modalContent = this.modal.querySelector('.modal-content');
    this.titleElement = document.getElementById('modalTitle');
    this.descriptionElement = document.getElementById('modalDescription');
    this.featuresElement = document.getElementById('modalFeatures');
    this.tagsElement = document.getElementById('modalTags');
    
    this.animationTimers = [];
    
    this.init();
  }
  
  init() {
    this.setupEventListeners();
    this.setupTriggers();
  }
  
  setupEventListeners() {
    // Close on backdrop click
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });
    
    // Close button
    const closeBtn = this.modal.querySelector('.modal-close, .close-btn');
    closeBtn?.addEventListener('click', () => this.close());
  }
  
  setupTriggers() {
    const triggerSelectors = [
      '.details-btn',
      '.details-arrow',
      '.view-details-btn',
      '[data-action="view-details"]'
    ];
    
    document.querySelectorAll(triggerSelectors.join(',')).forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const card = button.closest('.project-card');
        if (!card) return;
        
        const projects = document.querySelectorAll('.project-card');
        const index = Array.from(projects).indexOf(card);
        
        if (typeof createRipple === 'function') {
          createRipple(e, button);
          setTimeout(() => this.open(index), 150);
        } else {
          this.open(index);
        }
      });
      
      button.style.cursor = 'pointer';
    });
  }
  
  open(index) {
    const project = this.projectsData?.[index];
    if (!project) {
      console.warn(`ProjectModal: No project data found for index ${index}`);
      return;
    }
    
    this.clearAnimationTimers();
    this.populateContent(project);
    this.show();
  }
  
  populateContent(project) {
    // Set title and description
    if (this.titleElement) {
      this.titleElement.textContent = project.title || 'Untitled Project';
    }
    
    if (this.descriptionElement) {
      this.descriptionElement.textContent = project.description || '';
    }
    
    // Populate features with staggered animation
    if (this.featuresElement && Array.isArray(project.features)) {
      this.featuresElement.innerHTML = '';
      
      project.features.forEach((feature, i) => {
        const li = document.createElement('li');
        li.textContent = feature;
        li.style.opacity = '0';
        li.style.transform = 'translateX(-20px)';
        this.featuresElement.appendChild(li);
        
        const timer = setTimeout(() => {
          li.style.transition = 'all 0.4s ease';
          li.style.opacity = '1';
          li.style.transform = 'translateX(0)';
        }, 100 + i * 80);
        
        this.animationTimers.push(timer);
      });
    }
    
    // Populate tags/languages with staggered animation
    if (this.tagsElement && Array.isArray(project.languages)) {
      this.tagsElement.innerHTML = '';
      
      project.languages.forEach((lang, i) => {
        const span = document.createElement('span');
        span.textContent = lang;
        span.style.opacity = '0';
        span.style.transform = 'scale(0.8)';
        this.tagsElement.appendChild(span);
        
        const timer = setTimeout(() => {
          span.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
          span.style.opacity = '1';
          span.style.transform = 'scale(1)';
        }, 300 + i * 60);
        
        this.animationTimers.push(timer);
      });
    }
  }
  
  show() {
    this.modal.style.display = 'flex';
    void this.modal.offsetWidth; // Force reflow
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');
  }
  
  close() {
    if (!this.isOpen()) return;
    
    this.clearAnimationTimers();
    
    if (this.modalContent) {
      this.modalContent.style.animation = 'modalSlideOut 0.3s ease forwards';
    }
    
    this.modal.classList.remove('active');
    
    setTimeout(() => {
      this.modal.style.display = 'none';
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
      
      if (this.modalContent) {
        this.modalContent.style.animation = '';
      }
    }, 300);
  }
  
  isOpen() {
    return this.modal.classList.contains('active');
  }
  
  clearAnimationTimers() {
    this.animationTimers.forEach(timer => clearTimeout(timer));
    this.animationTimers = [];
  }
}


// ===============================
// INITIALIZATION
// ===============================

let projectCarousel;
let projectModal;

function initializeProjectComponents() {
  // Initialize carousel - checks for both .projects-carousel and .projects-container
  const carouselContainer = document.querySelector('.projects-carousel') || 
                           document.querySelector('.projects-container');
  
  if (carouselContainer) {
    projectCarousel = new ProjectCarousel(
      carouselContainer.classList.contains('projects-carousel') 
        ? '.projects-carousel' 
        : '.projects-container'
    );
    
    console.log('✓ Project Carousel initialized');
  }
  
  // Initialize modal (assuming projectsData is globally available)
  if (typeof projectsData !== 'undefined') {
    projectModal = new ProjectModal('projectModal', projectsData);
    console.log('✓ Project Modal initialized');
  } else {
    console.warn('projectsData not found. Modal functionality may be limited.');
  }
  
  // Initialize smooth scroll if function exists
  if (typeof smoothScroll === 'function') {
    smoothScroll();
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeProjectComponents);
} else {
  initializeProjectComponents();
}

// Export for external use if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ProjectCarousel, ProjectModal };
}

const summaryLink = document.getElementById("summary-link");
  const summaryPopup = document.getElementById("summary-popup");
  const summaryClose = document.getElementById("summary-close");

  // Show popup
  summaryLink.addEventListener("click", (e) => {
    e.preventDefault();
    summaryPopup.style.display = "flex";
  });

  // Close popup
  summaryClose.addEventListener("click", () => {
    summaryPopup.style.display = "none";
  });

  // Close when clicking outside content
  window.addEventListener("click", (e) => {
    if (e.target === summaryPopup) {
      summaryPopup.style.display = "none";
    }
  });

  const skillItems = document.querySelectorAll('#skillsList li');

skillItems.forEach(item => {
  item.addEventListener('click', function () {
    const isActive = this.classList.contains('active');

    // Close other items
    skillItems.forEach(otherItem => {
      if (otherItem !== this) {
        otherItem.classList.remove('active');
        otherItem.querySelector('.skill-bar').style.width = '0';
      }
    });

    // Toggle current
    if (isActive) {
      this.classList.remove('active');
      this.querySelector('.skill-bar').style.width = '0';
    } else {
      this.classList.add('active');
      const percent = this.getAttribute('data-percent');
      const bar = this.querySelector('.skill-bar');

      setTimeout(() => {
        bar.style.width = percent + '%';
      }, 50);
    }
  });
});


